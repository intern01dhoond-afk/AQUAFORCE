async function testLiveShiprocketRoute() {
  const payload = {
    orderId: `ORD_LIVE_WEB_${Date.now()}`,
    fullName: "TEST - Live Web Checkout COD",
    email: "live.web@example.com",
    phone: "9876543210",
    altPhone: "9123456789",
    deliveryAddress: "Plot 99, Road 10, Banjara Hills",
    city: "Hyderabad",
    state: "Telangana",
    pincode: "500034",
    product: "Cordless AquaForce® 1400 High-pressure Washer System (Yellow)",
    quantity: 1,
    amount: 37999,
    paymentMode: "COD",
    codAmount: 34349,
    advanceAmount: 3799,
  };

  console.log("Calling live domain /api/shiprocket/create-shipment...");
  try {
    const res = await fetch("https://promectools.in/aquaforceforautocare/api/shiprocket/create-shipment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    console.log("Live Shiprocket Route HTTP Status:", res.status);
    const data = await res.json();
    console.log("Live Shiprocket Route Response:", JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Live Shiprocket Route Fetch Error:", err);
  }
}

testLiveShiprocketRoute();
