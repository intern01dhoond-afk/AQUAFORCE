-- ==============================================================================
-- PROMEC INDIA / AMEC MOBILITY - SUPABASE DATABASE SCHEMA
-- Free Tier PostgreSQL Database for Orders, Live Tracking, Disputes & Support
-- ==============================================================================

-- 1. ORDERS TABLE
-- Stores full customer orders, line items, pricing, payment breakdowns and AWB waybills.
CREATE TABLE IF NOT EXISTS promec_orders (
  id TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  order_status TEXT NOT NULL DEFAULT 'confirmed',
  customer_phone TEXT NOT NULL,
  customer_name TEXT,
  customer_email TEXT,
  customer_city TEXT,
  customer_state TEXT,
  customer_pincode TEXT,
  customer JSONB NOT NULL DEFAULT '{}'::jsonb,
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  pricing JSONB NOT NULL DEFAULT '{}'::jsonb,
  payment JSONB NOT NULL DEFAULT '{}'::jsonb,
  fulfillment JSONB NOT NULL DEFAULT '{}'::jsonb,
  cancellation JSONB,
  refund JSONB,
  idempotency_key TEXT,
  processed_webhook_events JSONB DEFAULT '[]'::jsonb,
  raw_order JSONB NOT NULL
);

-- Fast lookup indexes
CREATE INDEX IF NOT EXISTS idx_promec_orders_phone ON promec_orders(customer_phone);
CREATE INDEX IF NOT EXISTS idx_promec_orders_status ON promec_orders(order_status);
CREATE INDEX IF NOT EXISTS idx_promec_orders_created ON promec_orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_promec_orders_idempotency ON promec_orders(idempotency_key);


-- 2. DISPUTES & REPLACEMENTS TABLE
-- Self-service doorstep replacements, damages, missing parts, and warranty claims.
CREATE TABLE IF NOT EXISTS promec_disputes (
  id TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  order_id TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_name TEXT,
  type TEXT NOT NULL DEFAULT 'replacement',
  reason TEXT NOT NULL,
  reason_label TEXT NOT NULL,
  description TEXT,
  preferred_resolution TEXT,
  status TEXT NOT NULL DEFAULT 'submitted',
  customer JSONB NOT NULL DEFAULT '{}'::jsonb,
  item_details JSONB DEFAULT '{}'::jsonb,
  media_urls JSONB DEFAULT '[]'::jsonb,
  timeline JSONB DEFAULT '[]'::jsonb,
  resolution_notes TEXT,
  assigned_to TEXT,
  replacement_waybill TEXT,
  raw_dispute JSONB NOT NULL
);

-- Fast lookup indexes
CREATE INDEX IF NOT EXISTS idx_promec_disputes_phone ON promec_disputes(customer_phone);
CREATE INDEX IF NOT EXISTS idx_promec_disputes_order ON promec_disputes(order_id);
CREATE INDEX IF NOT EXISTS idx_promec_disputes_status ON promec_disputes(status);
CREATE INDEX IF NOT EXISTS idx_promec_disputes_created ON promec_disputes(created_at DESC);


-- 3. CUSTOMER SUPPORT TICKETS & CALLBACKS TABLE
-- Technician 30-min callbacks, priority care desk and 2-way message logs.
CREATE TABLE IF NOT EXISTS promec_support_tickets (
  id TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  customer_phone TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT,
  order_id TEXT,
  category TEXT NOT NULL DEFAULT 'general_inquiry',
  category_label TEXT NOT NULL DEFAULT 'General Inquiry',
  subject TEXT NOT NULL,
  priority TEXT NOT NULL DEFAULT 'normal',
  status TEXT NOT NULL DEFAULT 'open',
  callback_requested BOOLEAN DEFAULT FALSE,
  preferred_callback_time TEXT,
  messages JSONB DEFAULT '[]'::jsonb,
  raw_ticket JSONB NOT NULL
);

-- Fast lookup indexes
CREATE INDEX IF NOT EXISTS idx_promec_support_phone ON promec_support_tickets(customer_phone);
CREATE INDEX IF NOT EXISTS idx_promec_support_status ON promec_support_tickets(status);
CREATE INDEX IF NOT EXISTS idx_promec_support_created ON promec_support_tickets(created_at DESC);

-- Enable Row Level Security (Optional, off by default for backend service-role access)
-- ALTER TABLE promec_orders ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE promec_disputes ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE promec_support_tickets ENABLE ROW LEVEL SECURITY;
