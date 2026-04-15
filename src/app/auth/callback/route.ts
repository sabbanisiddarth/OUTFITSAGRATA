import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { checkAndUpdateDevice, getDeviceId, DEVICE_ID_COOKIE_NAME } from "@/lib/device-limit";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet: any[]) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              );
            } catch {
              // The `setAll` method was called from a Server Component.
              // This can be ignored if you have middleware refreshing sessions.
            }
          },
        },
      }
    );

    const { data: { user }, error: sessionError } = await supabase.auth.exchangeCodeForSession(code);

    if (!sessionError && user) {
      let deviceId = getDeviceId(cookieStore);
      let newDeviceGenerated = false;
      
      if (!deviceId) {
        deviceId = crypto.randomUUID();
        newDeviceGenerated = true;
      }

      const deviceCheck = await checkAndUpdateDevice(supabase, user.id, deviceId);
      
      const forwardedHost = request.headers.get("x-forwarded-host");
      const isLocalEnv = process.env.NODE_ENV === "development";
      let redirectUrl: string;

      if (isLocalEnv) {
        redirectUrl = `${origin}${next}`;
      } else if (forwardedHost) {
        redirectUrl = `https://${forwardedHost}${next}`;
      } else {
        redirectUrl = `${origin}${next}`;
      }

      if (!deviceCheck.success) {
        // Sign out if limit reached
        await supabase.auth.signOut();
        const errorUrl = new URL(`${origin}/signin`);
        errorUrl.searchParams.set("error", deviceCheck.error || "Device limit reached.");
        return NextResponse.redirect(errorUrl);
      }

      const response = NextResponse.redirect(redirectUrl);
      
      if (newDeviceGenerated) {
        response.cookies.set(DEVICE_ID_COOKIE_NAME, deviceId, {
          path: "/",
          maxAge: 60 * 60 * 24 * 365,
          sameSite: "lax",
        });
      }
      
      return response;
    }
  }

  // Return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/signin`);
}
