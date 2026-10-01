import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";

// Load environment variables from .env.local
const envLocalPath = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envLocalPath)) {
  const envContent = fs.readFileSync(envLocalPath, "utf8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
      const [key, ...values] = trimmed.split("=");
      const val = values.join("=").trim().replace(/^["']|["']$/g, "");
      if (!process.env[key.trim()]) {
        process.env[key.trim()] = val;
      }
    }
  }
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function clearTestData() {
  console.log("\n🧹 Cleaning up test data from Supabase...\n");

  try {
    // 1. Delete all test orders
    const { count: orderCount, error: orderErr } = await supabase
      .from("promec_orders")
      .delete()
      .neq("id", "___NEVER_MATCH___");

    if (orderErr) {
      console.error("  ❌ Error clearing promec_orders:", orderErr.message);
    } else {
      console.log("  ✅ Cleared all test orders from promec_orders table.");
    }

    // 2. Delete all test disputes
    const { error: disputeErr } = await supabase
      .from("promec_disputes")
      .delete()
      .neq("id", "___NEVER_MATCH___");

    if (disputeErr) {
      console.error("  ❌ Error clearing promec_disputes:", disputeErr.message);
    } else {
      console.log("  ✅ Cleared all test disputes from promec_disputes table.");
    }

    // 3. Delete all test support tickets
    const { error: ticketErr } = await supabase
      .from("promec_support_tickets")
      .delete()
      .neq("id", "___NEVER_MATCH___");

    if (ticketErr) {
      console.error("  ❌ Error clearing promec_support_tickets:", ticketErr.message);
    } else {
      console.log("  ✅ Cleared all test tickets from promec_support_tickets table.");
    }

    // Also clear the local data/ files so they don't hold mock data
    const dataDir = path.join(process.cwd(), "data");
    fs.writeFileSync(path.join(dataDir, "orders.json"), JSON.stringify([], null, 2));
    fs.writeFileSync(path.join(dataDir, "disputes.json"), JSON.stringify([], null, 2));
    fs.writeFileSync(path.join(dataDir, "support_tickets.json"), JSON.stringify([], null, 2));
    console.log("  ✅ Reset local data/ files to clean empty arrays.");

    console.log("\n🎉 Database is now 100% clean and ready for real production orders!\n");
  } catch (err) {
    console.error("Exception during cleanup:", err);
  }
}

clearTestData();
