async function testLiveShiprocketRoute() {
  const payload = {
    orderId: `ORD_VERIFIED_${Date.now()}`,
    fullName: "Sri Sai Potluri",
    email: "saileshyd@gmail.com",
    phone: "9440804233",
    altPhone: "9395819804",
    deliveryAddress: "H.NO. 16-2-100/116, Plot no.116, road no.15B, PVR Indradhnu, Gopalnagar Society, Kukatpally.",
    city: "Hyderabad",
    state: "Telangana",
    pincode: "500085",
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

    if (data.success) {
      console.log("\nNow forwarding order to Google Purchase Sheet...");
      const purchaseRes = await fetch("https://promectools.in/aquaforceforautocare/api/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          paymentMethod: "10% Cash on Delivery",
          status: "10% Advance Paid - COD Balance Pending",
          waybill: data.waybill,
        }),
      });
      console.log("Purchase Sheet Status:", purchaseRes.status);
      const purchaseData = await purchaseRes.json();
      console.log("Purchase Sheet Response:", JSON.stringify(purchaseData, null, 2));
    }
  } catch (err) {
    console.error("Live Shiprocket Route Fetch Error:", err);
  }
}

testLiveShiprocketRoute();
