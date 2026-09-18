import { createShiprocketShipment } from "./lib/shiprocket.ts";

async function testFinalLiveCod() {
  const timestamp = Date.now();
  const orderId = `ORD_FINAL_COD_${timestamp}`;
  const paymentId = `pay_FINAL_COD_${timestamp}`;

  const payload = {
    orderId,
    paymentId,
    fullName: "TEST - Final Live COD Verification",
    email: "final.cod@example.com",
    phone: "9876543210",
    altPhone: "9123456789",
    deliveryAddress: "Plot 99, Road 10, Banjara Hills",
    city: "Hyderabad",
    state: "Telangana",
    pincode: "500034",
    gstNumber: "36AACFL5575H1Z4",
    product: "Cordless AquaForce® 1400 High-pressure Washer System (Yellow)",
    quantity: 1,
    amount: 37999,
    paymentMethod: "10% Cash on Delivery",
    advanceAmount: 3799,
    codBalance: 34349,
    status: "10% Advance Paid - COD Balance Pending",
  };

  console.log("1. Creating order in Shiprocket...");
  const shipResult = await createShiprocketShipment({
    orderId: payload.orderId,
    fullName: payload.fullName,
    email: payload.email,
    phone: payload.phone,
    altPhone: payload.altPhone,
    deliveryAddress: payload.deliveryAddress,
    city: payload.city,
    state: payload.state,
    pincode: payload.pincode,
    product: payload.product,
    quantity: payload.quantity,
    amount: payload.amount,
    paymentMode: "COD",
    codAmount: payload.codBalance,
    advanceAmount: payload.advanceAmount,
  });

  console.log("Shiprocket Result:", JSON.stringify(shipResult, null, 2));

  const waybill = shipResult.success ? String(shipResult.awbCode || shipResult.shipmentId || shipResult.orderId) : "AUTO_GENERATED";

  console.log("\n2. Forwarding order to live Purchase Sheet API...");
  const res = await fetch("https://promectools.in/aquaforceforautocare/api/purchase", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...payload,
      waybill,
    }),
  });

  console.log("Purchase API Status:", res.status);
  const data = await res.json();
  console.log("Purchase API Response:", JSON.stringify(data, null, 2));
}

testFinalLiveCod();
