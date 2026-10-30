import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(url, key);

function readJsonFile(fileName) {
  const filePath = path.join(process.cwd(), "data", fileName);
  if (!fs.existsSync(filePath)) return [];
  try {
    const raw = fs.readFileSync(filePath, "utf-8").trim();
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error(`Error reading ${fileName}:`, e.message);
    return [];
  }
}

async function syncAll() {
  console.log("=========================================");
  console.log("SYNCING ALL DATA TO SUPABASE");
  console.log("=========================================\n");

  // 1. ORDERS
  const ordersList = [
    ...readJsonFile("orders.json"),
    ...readJsonFile("orders.json.bak"),
  ];
  const uniqueOrders = new Map();
  for (const o of ordersList) {
    if (o && o.id) uniqueOrders.set(o.id, o);
  }

  console.log(`[Orders] Found ${uniqueOrders.size} unique orders.`);
  let ordersSuccess = 0;
  for (const order of uniqueOrders.values()) {
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
      console.error(`Failed order ${order.id}:`, error.message);
    } else {
      ordersSuccess++;
    }
  }
  console.log(`[Orders] Synced ${ordersSuccess} / ${uniqueOrders.size} successfully.\n`);

  // 2. DISPUTES
  const disputesList = [
    ...readJsonFile("disputes.json"),
    ...readJsonFile("disputes.json.bak"),
  ];
  const uniqueDisputes = new Map();
  for (const d of disputesList) {
    if (d && d.id) uniqueDisputes.set(d.id, d);
  }

  console.log(`[Disputes] Found ${uniqueDisputes.size} unique disputes.`);
  let disputesSuccess = 0;
  for (const dispute of uniqueDisputes.values()) {
    const cleanPhone = (dispute.customer?.phone || "").replace(/\D/g, "").slice(-10);
    const row = {
      id: dispute.id,
      created_at: dispute.createdAt,
      updated_at: dispute.updatedAt,
      order_id: dispute.orderId,
      customer_phone: cleanPhone,
      customer_name: dispute.customer?.fullName,
      type: dispute.type,
      reason: dispute.reason,
      reason_label: dispute.reasonLabel,
      description: dispute.description,
      preferred_resolution: dispute.preferredResolution,
      status: dispute.status,
      customer: dispute.customer,
      item_details: dispute.itemDetails,
      media_urls: dispute.attachmentNames || [],
      timeline: dispute.timeline || [],
      resolution_notes: dispute.resolutionDetails?.notes || null,
      assigned_to: null,
      replacement_waybill: dispute.resolutionDetails?.replacementWaybill || null,
      raw_dispute: dispute,
    };
    const { error } = await supabase.from("promec_disputes").upsert(row, { onConflict: "id" });
    if (error) {
      console.error(`Failed dispute ${dispute.id}:`, error.message);
    } else {
      disputesSuccess++;
    }
  }
  console.log(`[Disputes] Synced ${disputesSuccess} / ${uniqueDisputes.size} successfully.\n`);

  // 3. SUPPORT TICKETS
  const ticketsList = [
    ...readJsonFile("support_tickets.json"),
    ...readJsonFile("support_tickets.json.bak"),
  ];
  const uniqueTickets = new Map();
  for (const t of ticketsList) {
    if (t && t.id) uniqueTickets.set(t.id, t);
  }

  console.log(`[Support Tickets] Found ${uniqueTickets.size} unique tickets.`);
  let ticketsSuccess = 0;
  for (const ticket of uniqueTickets.values()) {
    const cleanPhone = (ticket.customerPhone || "").replace(/\D/g, "").slice(-10);
    const row = {
      id: ticket.id,
      created_at: ticket.createdAt,
      updated_at: ticket.updatedAt,
      customer_phone: cleanPhone,
      customer_name: ticket.customerName,
      customer_email: ticket.customerEmail || null,
      order_id: ticket.orderId || null,
      category: ticket.category,
      category_label: ticket.categoryLabel,
      subject: ticket.subject,
      priority: ticket.priority,
      status: ticket.status,
      callback_requested: Boolean(ticket.callbackRequested),
      preferred_callback_time: ticket.preferredCallbackTime || null,
      messages: ticket.messages || [],
      raw_ticket: ticket,
    };
    const { error } = await supabase.from("promec_support_tickets").upsert(row, { onConflict: "id" });
    if (error) {
      console.error(`Failed ticket ${ticket.id}:`, error.message);
    } else {
      ticketsSuccess++;
    }
  }
  console.log(`[Support Tickets] Synced ${ticketsSuccess} / ${uniqueTickets.size} successfully.\n`);

  console.log("=========================================");
  console.log("ALL DATA SYNC COMPLETED");
  console.log("=========================================");
}

syncAll();
