import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";

// Load environment variables from .env.local if present
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

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("\n❌ Supabase credentials missing!");
  console.error("Please add the following to your .env.local file:");
  console.error("  NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co");
  console.error("  SUPABASE_SERVICE_ROLE_KEY=your-service-role-or-anon-key\n");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function migrate() {
  console.log("\n🚀 Starting data migration to Supabase...\n");
  const dataDir = path.join(process.cwd(), "data");

  // 1. Migrate Orders
  const ordersPath = path.join(dataDir, "orders.json");
  if (fs.existsSync(ordersPath)) {
    try {
      const ordersRaw = fs.readFileSync(ordersPath, "utf8");
      const orders = JSON.parse(ordersRaw);
      console.log(`📦 Found ${orders.length} orders in data/orders.json. Uploading...`);

      const rows = orders.map((order) => {
        const cleanPhone = (order.customer?.phone || "").replace(/\D/g, "").slice(-10);
        return {
          id: order.id,
          created_at: order.createdAt,
          updated_at: order.updatedAt || order.createdAt,
          order_status: order.orderStatus,
          customer_phone: cleanPhone,
          customer_name: order.customer?.fullName || null,
          customer_email: order.customer?.email || null,
          customer_city: order.customer?.city || null,
          customer_state: order.customer?.state || null,
          customer_pincode: order.customer?.pincode || null,
          customer: order.customer || {},
          items: order.items || [],
          pricing: order.pricing || {},
          payment: order.payment || {},
          fulfillment: order.fulfillment || {},
          cancellation: order.cancellation || null,
          refund: order.refund || null,
          idempotency_key: order.idempotencyKey || null,
          processed_webhook_events: order.processedWebhookEvents || [],
          raw_order: order,
        };
      });

      // Upsert in batches of 50
      const BATCH_SIZE = 50;
      let orderSuccessCount = 0;
      for (let i = 0; i < rows.length; i += BATCH_SIZE) {
        const batch = rows.slice(i, i + BATCH_SIZE);
        const { error } = await supabase
          .from("promec_orders")
          .upsert(batch, { onConflict: "id" });

        if (error) {
          console.error(`  ⚠️ Batch ${i / BATCH_SIZE + 1} error:`, error.message);
        } else {
          orderSuccessCount += batch.length;
        }
      }
      console.log(`✅ Orders migrated: ${orderSuccessCount}/${orders.length}`);
    } catch (err) {
      console.error("  ❌ Failed migrating orders:", err.message);
    }
  }

  // 2. Migrate Disputes
  const disputesPath = path.join(dataDir, "disputes.json");
  if (fs.existsSync(disputesPath)) {
    try {
      const disputesRaw = fs.readFileSync(disputesPath, "utf8");
      const disputes = JSON.parse(disputesRaw);
      console.log(`\n🛡️ Found ${disputes.length} disputes in data/disputes.json. Uploading...`);

      const rows = disputes.map((d) => {
        const cleanPhone = (d.customer?.phone || "").replace(/\D/g, "").slice(-10);
        return {
          id: d.id,
          created_at: d.createdAt,
          updated_at: d.updatedAt || d.createdAt,
          order_id: d.orderId,
          customer_phone: cleanPhone,
          customer_name: d.customer?.fullName || null,
          type: d.type,
          reason: d.reason,
          reason_label: d.reasonLabel,
          description: d.description || null,
          preferred_resolution: d.preferredResolution || null,
          status: d.status,
          customer: d.customer || {},
          item_details: d.itemDetails || {},
          media_urls: d.mediaUrls || [],
          timeline: d.timeline || [],
          resolution_notes: d.resolutionNotes || null,
          assigned_to: d.assignedTo || null,
          replacement_waybill: d.replacementWaybill || null,
          raw_dispute: d,
        };
      });

      const { error } = await supabase
        .from("promec_disputes")
        .upsert(rows, { onConflict: "id" });

      if (error) {
        console.error("  ⚠️ Error migrating disputes:", error.message);
      } else {
        console.log(`✅ Disputes migrated: ${rows.length}/${disputes.length}`);
      }
    } catch (err) {
      console.error("  ❌ Failed migrating disputes:", err.message);
    }
  }

  // 3. Migrate Support Tickets
  const ticketsPath = path.join(dataDir, "support_tickets.json");
  if (fs.existsSync(ticketsPath)) {
    try {
      const ticketsRaw = fs.readFileSync(ticketsPath, "utf8");
      const tickets = JSON.parse(ticketsRaw);
      console.log(`\n🎧 Found ${tickets.length} tickets in data/support_tickets.json. Uploading...`);

      const rows = tickets.map((t) => {
        const cleanPhone = (t.customerPhone || "").replace(/\D/g, "").slice(-10);
        return {
          id: t.id,
          created_at: t.createdAt,
          updated_at: t.updatedAt || t.createdAt,
          customer_phone: cleanPhone,
          customer_name: t.customerName,
          customer_email: t.customerEmail || null,
          order_id: t.orderId || null,
          category: t.category,
          category_label: t.categoryLabel,
          subject: t.subject,
          priority: t.priority,
          status: t.status,
          callback_requested: Boolean(t.callbackRequested),
          preferred_callback_time: t.preferredCallbackTime || null,
          messages: t.messages || [],
          raw_ticket: t,
        };
      });

      const { error } = await supabase
        .from("promec_support_tickets")
        .upsert(rows, { onConflict: "id" });

      if (error) {
        console.error("  ⚠️ Error migrating tickets:", error.message);
      } else {
        console.log(`✅ Support tickets migrated: ${rows.length}/${tickets.length}`);
      }
    } catch (err) {
      console.error("  ❌ Failed migrating tickets:", err.message);
    }
  }

  console.log("\n🎉 Migration finished! All data is now live on Supabase.\n");
}

migrate();
