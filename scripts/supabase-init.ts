import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";

// Load environment variables
dotenv.config({ path: ".env.local" });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

async function setup() {
  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
    console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
    console.log("\nTo fix the Auth redirect and Device limit issues autonomously, please add:");
    console.log("SUPABASE_SERVICE_ROLE_KEY=your_service_role_key");
    console.log("to your .env.local file.\n");
    process.exit(1);
  }

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

  console.log("1. Creating 'user_devices' table...");
  const sql = `
    create table if not exists public.user_devices (
      id uuid default gen_random_uuid() primary key,
      user_id uuid references auth.users(id) on delete cascade not null,
      device_id text not null,
      last_login timestamp with time zone default now(),
      unique(user_id, device_id)
    );

    -- Enable RLS
    alter table public.user_devices enable row level security;

    -- Policies (idempotent checks)
    do $$
    begin
      if not exists (select 1 from pg_policies where policyname = 'Users can view their own devices') then
        create policy "Users can view their own devices" on public.user_devices for select using (auth.uid() = user_id);
      end if;
      if not exists (select 1 from pg_policies where policyname = 'Users can insert their own devices') then
        create policy "Users can insert their own devices" on public.user_devices for insert with check (auth.uid() = user_id);
      end if;
      if not exists (select 1 from pg_policies where policyname = 'Users can update their own devices') then
        create policy "Users can update their own devices" on public.user_devices for update using (auth.uid() = user_id);
      end if;
    end
    $$;
  `;

  // Supabase doesn't have a direct "run sql" in the standard JS client for security.
  // We would normally use the Management API or a direct Postgres connection.
  // For this script, we'll suggest using the Supabase Dashboard SQL Editor if Service Role can't execute RAW SQL.
  // However, some projects enable SQL execution via RPC.
  
  console.log("\nSQL Script for Supabase SQL Editor:");
  console.log("-----------------------------------");
  console.log(sql);
  console.log("-----------------------------------");

  console.log("\n2. Updating Auth Redirect Settings...");
  console.log("As an AI, I cannot directly access your Supabase dashboard UI.");
  console.log("Please ensure the following are set in Authentication -> URL Configuration:");
  console.log("- Site URL: https://outfitsagrata.vercel.app");
  console.log("- Redirect URLs: https://outfitsagrata.vercel.app/**");

  console.log("\nSetup script prepared. Once you run the SQL above, the device limit logic will be active!");
}

setup().catch(console.error);
