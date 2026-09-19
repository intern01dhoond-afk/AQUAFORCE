async function pushSriSaiPotluriOrder() {
  const email = "hemanthk0804@gmail.com";
  const password = "9GW&KOtvjA@$9LT8t4ztD4KX%Z74IhYn";

  const authRes = await fetch("https://apiv2.shiprocket.in/v1/external/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const authData = await authRes.json();
  const token = authData.token;

  console.log("Token obtained!");

  const payload = {
    order_id: "order_Td93ss02xLZQX3",
    order_date: "2026-09-17 20:29",
    pickup_location: "warehouse",
    channel_id: 12211988,
    comment: "Aquaforce 1400 Order - Sri Sai Potluri",
    billing_customer_name: "Sri Sai Potluri",
    billing_last_name: "",
    billing_address: "H.NO. 16-2-100/116, Plot no.116, road no.15B, PVR Indradhnu, Gopalnagar Society, Kukatpally.",
    billing_address_2: "Alt Phone: 9395819804",
    billing_city: "Hyderabad",
    billing_pincode: "500085",
    billing_state: "Telangana",
    billing_country: "India",
    billing_email: "saileshyd@gmail.com",
    billing_phone: "9440804233",
    shipping_is_billing: true,
    order_items: [
      {
        name: "Cordless AquaForce 1400 High-pressure Washer System (Yellow)",
        sku: "AMEC-AQUAFORCE-1400",
        units: 1,
        selling_price: 37999,
        discount: 0,
        tax: 0,
        hsn: "84243000",
      },
    ],
    payment_method: "COD",
    shipping_charges: 0,
    giftwrap_charges: 0,
    transaction_charges: 0,
    total_discount: 0,
    sub_total: 34349,
    length: 60,
    breadth: 41,
    height: 41,
    weight: 8.5,
  };

  console.log("Creating order in Shiprocket for Sri Sai Potluri (order_Td93ss02xLZQX3)...");
  const res = await fetch("https://apiv2.shiprocket.in/v1/external/orders/create/adhoc", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  console.log("Response Status:", res.status);
  const data = await res.json().catch(() => null);
  console.log("Response Data:", JSON.stringify(data, null, 2));

  if (res.ok && (data?.order_id || data?.shipment_id)) {
    console.log("\nSUCCESS! Sri Sai Potluri's order was created in Shiprocket!");
    console.log(`Shiprocket Order ID: ${data.order_id}`);
    console.log(`Shipment ID / AWB: ${data.shipment_id}`);
  }
}

pushSriSaiPotluriOrder();
