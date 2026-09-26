import fs from "fs";
import path from "path";

export const SHIPROCKET_EMAIL = process.env.SHIPROCKET_EMAIL || "";
export const SHIPROCKET_PASSWORD = process.env.SHIPROCKET_PASSWORD || "";
export const SHIPROCKET_PICKUP_LOCATION =
  process.env.SHIPROCKET_PICKUP_LOCATION || "primary_warehouse";
export const SHIPROCKET_PICKUP_PINCODE =
  process.env.SHIPROCKET_PICKUP_PINCODE || "440016";

// Persistent disk cache for token to prevent repeated /auth/login calls that trigger Shiprocket lockout
const TOKEN_FILE_PATH = path.join(process.cwd(), "data", "shiprocket_token.json");

let cachedToken: string | null = null;
let tokenExpiresAt: number = 0;
let activeAuthPromise: Promise<string> | null = null;

function loadTokenFromDisk(): boolean {
  try {
    if (fs.existsSync(TOKEN_FILE_PATH)) {
      const data = JSON.parse(fs.readFileSync(TOKEN_FILE_PATH, "utf-8"));
      const now = Date.now();
      // Valid if it has at least 2 hours remaining
      if (data && data.token && data.expiresAt && now < data.expiresAt - 2 * 60 * 60 * 1000) {
        cachedToken = data.token;
        tokenExpiresAt = data.expiresAt;
        return true;
      }
    }
  } catch (e) {
    console.warn("[Shiprocket] Could not read token from disk cache:", e);
  }
  return false;
}

function saveTokenToDisk(token: string, expiresAt: number) {
  try {
    const dataDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(TOKEN_FILE_PATH, JSON.stringify({ token, expiresAt }, null, 2), "utf-8");
  } catch (e) {
    console.warn("[Shiprocket] Could not write token to disk cache:", e);
  }
}

/**
 * Obtain Shiprocket API JWT Bearer Token.
 * Utilizes persistent disk caching (8 days) and in-flight request deduplication
 * so Shiprocket is never spammed with repeated logins that trigger account lockouts.
 */
export async function getShiprocketToken(): Promise<string> {
  // 1. Static token support if user configured SHIPROCKET_TOKEN or SHIPROCKET_API_TOKEN
  const staticToken = (process.env.SHIPROCKET_TOKEN || process.env.SHIPROCKET_API_TOKEN || "").trim();
  if (staticToken) {
    return staticToken;
  }

  const now = Date.now();

  // 2. Return memory-cached token if still valid
  if (cachedToken && now < tokenExpiresAt - 2 * 60 * 60 * 1000) {
    return cachedToken;
  }

  // 3. Return disk-cached token if valid
  if (loadTokenFromDisk()) {
    return cachedToken!;
  }

  // 4. Return in-flight login promise if already authenticating (deduplication)
  if (activeAuthPromise) {
    return activeAuthPromise;
  }

  activeAuthPromise = (async () => {
    try {
      if (!SHIPROCKET_EMAIL || !SHIPROCKET_PASSWORD) {
        throw new Error(
          "Shiprocket credentials (SHIPROCKET_EMAIL, SHIPROCKET_PASSWORD) are not set in environment."
        );
      }

      console.log("[Shiprocket] Requesting fresh JWT Bearer token from Shiprocket API...");
      const res = await fetch("https://apiv2.shiprocket.in/v1/external/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: SHIPROCKET_EMAIL,
          password: SHIPROCKET_PASSWORD,
        }),
      });

      const data = await res.json();
      if (res.ok && data.token) {
        cachedToken = data.token;
        // Shiprocket JWT tokens last 10 days (240 hours). Cache for 8 days to avoid repeated logins.
        tokenExpiresAt = Date.now() + 8 * 24 * 60 * 60 * 1000;
        saveTokenToDisk(data.token, tokenExpiresAt);
        console.log(
          "[Shiprocket] Token generated successfully and saved to persistent disk cache (valid for 8 days)."
        );
        return data.token;
      }

      if (res.status === 403 || data.message?.includes("Invalid email and password") || data.message?.includes("locked")) {
        throw new Error(
          `Shiprocket Account Locked / Invalid Credentials (status 403): ${data.message || "Invalid email and password"}. Please unlock your account at https://app.shiprocket.in or generate a token under Settings > API.`
        );
      }

      throw new Error(
        data.message || data.error || `Shiprocket Auth Failed (${res.status})`
      );
    } catch (err: any) {
      console.error("[Shiprocket Auth Login Error]:", err.message);
      throw err;
    } finally {
      activeAuthPromise = null;
    }
  })();

  return activeAuthPromise;
}

export interface CreateShiprocketShipmentOptions {
  orderId: string;
  fullName: string;
  email?: string;
  phone: string;
  altPhone?: string;
  deliveryAddress: string;
  city: string;
  state: string;
  pincode: string;
  product?: string;
  quantity?: number | string;
  amount?: number | string;
  paymentMode?: string;
  codAmount?: number;
  advanceAmount?: number;
}

export interface CreateShiprocketShipmentResult {
  success: boolean;
  orderId?: string | number;
  shipmentId?: string | number;
  awbCode?: string;
  courierName?: string;
  error?: string;
  raw?: any;
}

/**
 * Create Adhoc Order in Shiprocket
 */
export async function createShiprocketShipment(
  options: CreateShiprocketShipmentOptions
): Promise<CreateShiprocketShipmentResult> {
  const {
    orderId,
    fullName,
    email,
    phone,
    altPhone,
    deliveryAddress,
    city,
    state,
    pincode,
    product,
    quantity,
    amount,
    paymentMode,
    codAmount,
  } = options;

  try {
    const token = await getShiprocketToken();
    const isCod = paymentMode === "COD" || Number(codAmount) > 0;
    const resolvedCodAmount = isCod
      ? Math.round(Number(codAmount) || Number(amount) * 0.9)
      : 0;

    const hasAltPhone =
      altPhone && altPhone !== "N/A" && altPhone.trim().length > 0;

    const formattedDate = new Date()
      .toISOString()
      .replace("T", " ")
      .substring(0, 16);

    const payload = {
      order_id: orderId || `ORD_${Date.now()}`,
      order_date: formattedDate,
      pickup_location: SHIPROCKET_PICKUP_LOCATION,
      channel_id: process.env.SHIPROCKET_CHANNEL_ID || "12211988",
      comment: "Next.js Custom E-commerce Order",
      billing_customer_name: fullName || "Valued Customer",
      billing_last_name: "",
      billing_address: deliveryAddress,
      billing_address_2: hasAltPhone ? `Alt Phone: ${altPhone}` : "",
      billing_city: city,
      billing_pincode: pincode,
      billing_state: state,
      billing_country: "India",
      billing_email: email || "orders@promectools.in",
      billing_phone: phone,
      shipping_is_billing: true,
      order_items: [
        {
          name: product || "Cordless AquaForce 1400 High-pressure Washer System",
          sku: "AMEC-AQUAFORCE-1400",
          units: Math.max(1, Number(quantity) || 1),
          selling_price: Math.round(Number(amount) || 37999),
          discount: 0,
          tax: 0,
          hsn: "84243000",
        },
      ],
      payment_method: isCod ? "COD" : "Prepaid",
      shipping_charges: 0,
      giftwrap_charges: 0,
      transaction_charges: 0,
      total_discount: 0,
      sub_total: isCod ? resolvedCodAmount : Math.round(Number(amount) || 37999),
      length: 60,
      breadth: 41,
      height: 41,
      weight: 8.5 * Math.max(1, Number(quantity) || 1),
    };

    const res = await fetch(
      "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
        body: JSON.stringify(payload),
      }
    );

    const resText = await res.text();
    let data: any = {};
    try {
      data = JSON.parse(resText);
    } catch {
      console.warn("Shiprocket response was non-JSON:", res.status, resText);
    }
    console.log("Shiprocket Order Create Response:", JSON.stringify(data, null, 2));

    if (res.ok && (data.order_id || data.shipment_id)) {
      return {
        success: true,
        orderId: data.order_id,
        shipmentId: data.shipment_id,
        awbCode: data.awb_code || (data.shipment_id ? String(data.shipment_id) : undefined),
        courierName: data.courier_name || "Shiprocket Express",
        raw: data,
      };
    }

    const errorMsg =
      data.message ||
      (Array.isArray(data.errors) ? data.errors.join(", ") : null) ||
      "Failed to create order on Shiprocket";

    return {
      success: false,
      error: errorMsg,
      raw: data,
    };
  } catch (err: any) {
    console.error("Shiprocket Create Order API Error:", err);
    return {
      success: false,
      error: err.message || "Failed to communicate with Shiprocket API",
    };
  }
}

/**
 * In-memory cache for pincode serviceability to avoid calling Shiprocket repeatedly
 */
const serviceabilityCache = new Map<string, { result: any; expiresAt: number }>();

/**
 * Check Pincode Serviceability via Shiprocket (with 6-hour caching per pincode)
 */
export async function checkShiprocketServiceability(
  pincode: string,
  isCod: boolean = true
) {
  const cacheKey = `${pincode}_${isCod ? "cod" : "prepaid"}`;
  const cached = serviceabilityCache.get(cacheKey);
  if (cached && Date.now() < cached.expiresAt) {
    return cached.result;
  }

  try {
    const token = await getShiprocketToken();
    const url = `https://apiv2.shiprocket.in/v1/external/courier/serviceability/?pickup_postcode=${SHIPROCKET_PICKUP_PINCODE}&delivery_postcode=${pincode}&weight=8.5&cod=${
      isCod ? 1 : 0
    }`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (res.ok && data.status === 200 && data.data) {
      const companies = data.data.available_courier_companies || [];
      const serviceable = companies.length > 0;
      const codAvailable = companies.some(
        (c: any) => c.cod === 1 || c.is_cod === 1
      );

      const result = {
        success: true,
        serviceable,
        cod: codAvailable,
        couriersCount: companies.length,
        raw: data,
      };

      // Cache successful response for 6 hours
      serviceabilityCache.set(cacheKey, {
        result,
        expiresAt: Date.now() + 6 * 60 * 60 * 1000,
      });

      return result;
    }

    return {
      success: false,
      serviceable: false,
      cod: false,
      error: data.message || "Serviceability check failed",
    };
  } catch (err: any) {
    console.error("Shiprocket Serviceability API Error:", err);
    return {
      success: false,
      serviceable: true, // Graceful fallback
      cod: true,
      error: err.message,
    };
  }
}
