import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(url, key);

async function syncOrders() {
  const filePath = path.join(process.cwd(), "data", "orders.json");
  if (!fs.existsSync(filePath)) {
    console.log("No data/orders.json file found.");
    return;
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const orders = JSON.parse(raw);
  console.log(`Found ${orders.length} orders in data/orders.json. Syncing to Supabase...`);

  let successCount = 0;
  let failCount = 0;

  for (const order of orders) {
    const cleanPhone = (order.customer?.phone || "").replace(/\D/g, "").slice(-10);
    const row = {
      id: order.id,
      created_at: order.createdAt,
      updated_at: order.updatedAt,
      order_status: order.orderStatus,
      customer_phone: cleanPhone,
      customer_name: order.customer?.fullName,
      customer_email: order.customer?.email,
      customer_city: order.customer?.city,
      customer_state: order.customer?.state,
      customer_pincode: order.customer?.pincode,
      customer: order.customer,
      items: order.items,
      pricing: order.pricing,
      payment: order.payment,
      fulfillment: order.fulfillment,
      cancellation: order.cancellation || null,
      refund: order.refund || null,
      idempotency_key: order.idempotencyKey || null,
      processed_webhook_events: order.processedWebhookEvents || [],
      raw_order: order,
    };

    const { error } = await supabase.from("promec_orders").upsert(row, { onConflict: "id" });
    if (error) {
      console.error(`Failed to sync order ${order.id}:`, error.message);
      failCount++;
    } else {
      console.log(`Synced order ${order.id} successfully.`);
      successCount++;
    }
  }

  console.log(`\nSync Summary: ${successCount} succeeded, ${failCount} failed.`);
}

syncOrders();
