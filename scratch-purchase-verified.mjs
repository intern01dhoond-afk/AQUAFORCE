async function testLivePurchase() {
  const payload = {
    orderId: `ORD_COD_LIVE_${Date.now()}`,
    paymentId: `pay_COD_LIVE_${Date.now()}`,
    fullName: "Sri Sai Potluri (Live Order Test)",
    email: "saileshyd@gmail.com",
    phone: "9440804233",
    altPhone: "9395819804",
    deliveryAddress: "H.NO. 16-2-100/116, Plot no.116, road no.15B, PVR Indradhnu, Gopalnagar Society, Kukatpally.",
    city: "Hyderabad",
    state: "Telangana",
    pincode: "500085",
    gstNumber: "36AACFL5575H1Z4",
    product: "Cordless AquaForce® 1400 High-pressure Washer System (Yellow)",
    quantity: 1,
    amount: 37999,
    paymentMethod: "10% Cash on Delivery",
    advanceAmount: 3799,
    codBalance: 34349,
    status: "10% Advance Paid - COD Balance Pending",
  };

  console.log("Submitting order to live /api/purchase endpoint...");
  try {
    const res = await fetch("https://promectools.in/aquaforceforautocare/api/purchase", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    console.log("Purchase API HTTP Status:", res.status);
    const data = await res.json();
    console.log("Purchase API Response:", JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Purchase API Fetch Error:", err);
  }
}

testLivePurchase();
