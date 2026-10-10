import Razorpay from 'razorpay';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

async function run() {
  try {
    console.log('Testing Razorpay exact invoice with tax IDs...');

    // Fetch existing customer or create
    let customer;
    try {
      customer = await razorpay.customers.create({
        name: 'Hemanth K',
        email: 'hemanthk0804@gmail.com',
        contact: '9723141220',
      });
      console.log('Customer created:', customer.id);
    } catch (e) {
      console.log('Customer note:', e.message);
      const custs = await razorpay.customers.all({ count: 10 });
      customer = custs.items.find(c => c.email === 'hemanthk0804@gmail.com') || custs.items[0];
      console.log('Using customer:', customer.id);
    }

    // Test 1: item_id with only taxes (no tax_rate or tax_inclusive)
    const invoicePayload = {
      type: 'invoice',
      description: 'Invoice to Hemanth K for Cordless AquaForce® 1400 High-pressure Washer System (R)',
      currency: 'INR',
      customer_id: customer.id,
      line_items: [
        {
          item_id: 'item_Tm7NjNimkXraOi',
          quantity: 1,
        },
      ],
      email_notify: 1,
      sms_notify: 0,
    };

    const inv = await razorpay.invoices.create(invoicePayload);
    console.log('SUCCESS! Invoice created:');
    console.log('Invoice ID:', inv.id);
    console.log('Invoice Number:', inv.invoice_number);
    console.log('Short URL:', inv.short_url);
    console.log('Status:', inv.status);
    console.log('Line Items:', JSON.stringify(inv.line_items, null, 2));

    console.log('Dispatching via Razorpay notifyBy email...');
    const notifyRes = await razorpay.invoices.notifyBy(inv.id, 'email');
    console.log('NotifyBy email result:', notifyRes);
  } catch (err) {
    console.error('API Error:', err);
  }
}

run();
