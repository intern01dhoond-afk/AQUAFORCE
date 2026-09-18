import { createShiprocketShipment } from "./lib/shiprocket.ts";

async function testPush() {
  console.log("Calling createShiprocketShipment directly...");

  const result = await createShiprocketShipment({
    orderId: "ORD_COD_AUDIT_1789715980254",
    fullName: "TEST - COD Purchase Audit Entry",
    email: "test.cod@example.com",
    phone: "9876543210",
    altPhone: "9123456789",
    deliveryAddress: "Plot 45, Jubilee Hills, Road No 36",
    city: "Hyderabad",
    state: "Telangana",
    pincode: "500033",
    product: "Cordless AquaForce 1400 High-pressure Washer System",
    quantity: 1,
    amount: 37999,
    paymentMode: "COD",
    codAmount: 34349,
    advanceAmount: 3799,
  });

  console.log("Shiprocket Shipment Result:", JSON.stringify(result, null, 2));
}

testPush();
