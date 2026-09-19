async function pushSriSaiViaLiveRoute() {
  const payload = {
    orderId: "order_Td93ss02xLZQX3",
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

  console.log("Calling live website /api/shiprocket/create-shipment for Sri Sai Potluri...");
  const res = await fetch("https://promectools.in/aquaforceforautocare/api/shiprocket/create-shipment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  console.log("Live Route HTTP Status:", res.status);
  const data = await res.json();
  console.log("Live Route Response Data:", JSON.stringify(data, null, 2));
}

pushSriSaiViaLiveRoute();
