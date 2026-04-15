import { SupabaseClient } from "@supabase/supabase-js";

const DEVICE_ID_KEY = "agrata_device_id";

/**
 * Gets the persistent device ID from cookies, or creates one if it doesn't exist.
 * This works in both client and server (if cookie is passed).
 */
export function getDeviceId(cookieStore?: any): string {
  // If in client-side
  if (typeof window !== "undefined") {
    const match = document.cookie.match(new RegExp('(^| )' + DEVICE_ID_KEY + '=([^;]+)'));
    if (match) return match[2];
    
    const newId = crypto.randomUUID?.() || Math.random().toString(36).substring(2) + Date.now().toString(36);
    document.cookie = `${DEVICE_ID_KEY}=${newId}; path=/; max-age=${60*60*24*365}; SameSite=Lax`;
    return newId;
  }
  
  // If in server-side (Next.js cookies)
  if (cookieStore && typeof cookieStore.get === 'function') {
    const cookie = cookieStore.get(DEVICE_ID_KEY);
    return cookie?.value || "";
  }

  return "";
}

export const DEVICE_ID_COOKIE_NAME = DEVICE_ID_KEY;

/**
 * Checks and updates the device registration for a user.
 * If the user has >= 3 devices and this is a new device, it returns an error.
 * Otherwise, it registers/updates the device and returns success.
 */
export async function checkAndUpdateDevice(
  supabase: SupabaseClient,
  userId: string,
  deviceId?: string
): Promise<{ success: boolean; error?: string }> {
  const finalDeviceId = deviceId || getDeviceId();
  if (!finalDeviceId) return { success: false, error: "Device identification failed." };

  // 1. Check if this device is already registered for this user
  const { data: existingDevice, error: fetchError } = await supabase
    .from("user_devices")
    .select("*")
    .eq("user_id", userId)
    .eq("device_id", finalDeviceId)
    .single();

  if (fetchError && fetchError.code !== "PGRST116") { // PGRST116 is "no rows found"
    console.error("Error fetching device:", fetchError);
    return { success: false, error: "Failed to verify device status." };
  }

  if (existingDevice) {
    // Already registered, just update the last_login timestamp
    const { error: updateError } = await supabase
      .from("user_devices")
      .update({ last_login: new Date().toISOString() })
      .eq("id", existingDevice.id);

    if (updateError) {
      console.error("Error updating device:", updateError);
    }
    return { success: true };
  }

  // 2. If not registered, check how many devices the user has
  const { data: devices, error: countError } = await supabase
    .from("user_devices")
    .select("id, last_login")
    .eq("user_id", userId)
    .order("last_login", { ascending: true });

  if (countError) {
    console.error("Error counting devices:", countError);
    return { success: false, error: "Failed to check device limit." };
  }

  if (devices && devices.length >= 3) {
    // Option: Automatically remove the oldest device
    const oldestDevice = devices[0];
    const { error: deleteError } = await supabase
      .from("user_devices")
      .delete()
      .eq("id", oldestDevice.id);

    if (deleteError) {
      console.error("Error removing oldest device:", deleteError);
      return { success: false, error: "Device limit reached (3). Failed to rotate devices." };
    }
    
    // Fall through to register the new device
  }

  // 3. Register the new device
  const { error: insertError } = await supabase
    .from("user_devices")
    .insert({
      user_id: userId,
      device_id: finalDeviceId,
      last_login: new Date().toISOString()
    });

  if (insertError) {
    console.error("Error registering new device:", insertError);
    return { success: false, error: "Failed to register this device." };
  }

  return { success: true };
}
