import { InvoiceDetails } from "./invoiceUtils";

/**
 * Generates an email-client compliant (Gmail, Outlook, Apple Mail) HTML body
 * that renders the EXACT Razorpay Invoice Sheet (as seen at /invoices/[id]).
 */
export function generateInvoiceEmailHtml({
  invoice,
  onlineInvoiceUrl,
}: {
  invoice: InvoiceDetails;
  onlineInvoiceUrl?: string;
}): string {
  const { customer, product, pricing } = invoice;
  const isMH = pricing.isIntraState;

  const formattedTotal = pricing.totalAmount.toLocaleString("en-IN");
  const formattedCgst = pricing.cgst.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const formattedSgst = pricing.sgst.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const formattedIgst = pricing.igst.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const formattedTotalTax = pricing.totalTax.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Invoice #${invoice.invoiceNumber}</title>
</head>
<body style="margin: 0; padding: 20px 10px; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f1f5f9;">
    <tr>
      <td align="center">
        
        <!-- Main Card Container -->
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 680px; background-color: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.04);">
          <tr>
            <td style="padding: 32px 30px;">
              
              <!-- 1. Header: Company Brand on Left, Razorpay Badge on Right -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-bottom: 1px solid #f1f5f9; padding-bottom: 24px;">
                <tr>
                  <!-- Left: AMEC Logo & Details -->
                  <td valign="top">
                    <table border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td valign="top" style="padding-right: 14px;" width="52">
                          <img src="cid:amecShieldLogo" width="48" height="48" alt="AMEC Mobility" style="display: block; width: 48px; height: 48px; border: 0;" />
                        </td>
                        <td valign="top">
                          <div style="font-size: 15px; font-weight: 800; color: #0f172a; line-height: 1.3; letter-spacing: -0.3px;">
                            AMEC MOBILITY PRIVATE LIMITED
                          </div>
                          <div style="font-size: 11.5px; color: #64748b; margin-top: 3px; font-weight: 500;">
                            GSTIN - <strong style="color: #334155;">27AAVCA0791L1Z0</strong>
                          </div>
                          <div style="font-size: 11.5px; color: #64748b; margin-top: 1px; font-weight: 500;">
                            CIN - <strong style="color: #334155;">U29256MH2021PTC358748</strong>
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>

                  <!-- Right: Razorpay Invoicing Badge -->
                  <td align="right" valign="top" width="160">
                    <img src="cid:razorpayLogo" width="112" height="24" alt="Razorpay" style="display: block; width: 112px; height: auto; border: 0; margin-left: auto;" />
                    <div style="font-size: 10px; color: #94a3b8; text-align: right; line-height: 1.3; margin-top: 4px;">
                      Invoicing and payments<br/>
                      powered by <strong style="color: #0c2340;">Razorpay</strong>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- 2. Invoice Meta Title & Description -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: 24px;">
                <tr>
                  <td>
                    <div style="font-size: 18px; font-weight: 800; color: #0f172a; letter-spacing: -0.4px;">
                      Invoice # <span style="font-family: monospace; font-size: 15px; font-weight: 700; color: #1e293b; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px;">${invoice.invoiceNumber}</span>
                    </div>
                    <div style="font-size: 12px; color: #475569; margin-top: 6px; line-height: 1.5;">
                      Invoice to ${customer.fullName} for ${product.name}
                    </div>
                  </td>
                </tr>
              </table>

              <!-- 3. Amount Due Display -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: 20px;">
                <tr>
                  <td>
                    <div style="font-size: 11px; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 0.8px;">
                      AMOUNT DUE
                    </div>
                    <div style="width: 28px; height: 2.5px; background-color: #2563eb; border-radius: 2px; margin-top: 4px; margin-bottom: 8px;"></div>
                    <div style="font-size: 28px; font-weight: 800; color: #0f172a; letter-spacing: -0.5px;">
                      ₹ ${formattedTotal}<span style="font-size: 18px; font-weight: 600; color: #64748b;">.00</span>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- 4. Customer Billing & Address Section -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: 24px; border-top: 1px solid #f8fafc; padding-top: 10px;">
                <tr>
                  <!-- Left: Billing To & Dates -->
                  <td width="50%" valign="top" style="padding-right: 15px;">
                    <div style="font-size: 10.5px; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 6px;">
                      BILLING TO
                    </div>
                    <div style="font-size: 13.5px; font-weight: 700; color: #0f172a;">${customer.fullName}</div>
                    ${customer.phone ? `<div style="font-size: 12px; color: #475569; margin-top: 2px;">${customer.phone}</div>` : ""}
                    ${customer.email ? `<div style="font-size: 12px; color: #475569; margin-top: 2px;">${customer.email}</div>` : ""}
                    ${customer.gstin ? `<div style="font-size: 11.5px; color: #047857; font-weight: 700; margin-top: 4px;">GSTIN: ${customer.gstin}</div>` : ""}

                    <table border="0" cellspacing="0" cellpadding="0" style="margin-top: 16px;">
                      <tr>
                        <td style="font-size: 10.5px; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.8px; padding-right: 14px; padding-bottom: 8px;">
                          ISSUE DATE
                        </td>
                        <td style="font-size: 12px; font-weight: 600; color: #1e293b; background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 3px 8px; border-radius: 4px; padding-bottom: 8px;">
                          ${invoice.issueDate}
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size: 10.5px; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.8px; padding-right: 14px;">
                          EXPIRY DATE
                        </td>
                        <td style="font-size: 12px; font-weight: 500; color: #94a3b8; background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 3px 8px; border-radius: 4px;">
                          ${invoice.expiryDate || "Expiry Date"}
                        </td>
                      </tr>
                    </table>
                  </td>

                  <!-- Right: Addresses & Place of Supply -->
                  <td width="50%" valign="top" style="padding-left: 15px;">
                    <div style="font-size: 10.5px; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 4px;">
                      BILLING ADDRESS
                    </div>
                    <div style="font-size: 11.5px; color: #334155; line-height: 1.45; text-transform: capitalize; margin-bottom: 12px;">
                      ${customer.billingAddress}<br/>
                      ${customer.city}, ${customer.state}, India (${customer.pincode})
                    </div>

                    <div style="font-size: 10.5px; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 4px;">
                      SHIPPING ADDRESS
                    </div>
                    <div style="font-size: 11.5px; color: #334155; line-height: 1.45; text-transform: capitalize; margin-bottom: 12px;">
                      ${customer.shippingAddress}<br/>
                      ${customer.city}, ${customer.state}, India (${customer.pincode})
                    </div>

                    <div style="font-size: 10.5px; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 2px;">
                      PLACE OF SUPPLY
                    </div>
                    <div style="font-size: 12px; font-weight: 700; color: #0f172a;">
                      ${customer.state || "Maharashtra"}
                    </div>
                  </td>
                </tr>
              </table>

              <!-- 5. Itemized Table with State-dependent GST breakup -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: 26px; border-top: 1px solid #cbd5e1; border-bottom: 1px solid #cbd5e1;">
                <thead>
                  <tr style="background-color: #f8fafc;">
                    <th align="left" style="padding: 10px 8px; font-size: 10.5px; font-weight: 800; color: #64748b; text-transform: uppercase;">DESCRIPTION</th>
                    <th align="right" style="padding: 10px 8px; font-size: 10.5px; font-weight: 800; color: #64748b; text-transform: uppercase;">RATE/ITEM</th>
                    <th align="center" style="padding: 10px 8px; font-size: 10.5px; font-weight: 800; color: #64748b; text-transform: uppercase;">QTY</th>
                    <th align="right" style="padding: 10px 8px; font-size: 10.5px; font-weight: 800; color: #64748b; text-transform: uppercase;">TOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td valign="top" style="padding: 14px 8px; border-top: 1px solid #f1f5f9;">
                      <div style="font-size: 12.5px; font-weight: 700; color: #0f172a; line-height: 1.3;">
                        ${product.name}
                      </div>
                      <div style="font-size: 11px; color: #64748b; font-weight: 600; margin-top: 4px;">
                        HSN - <strong style="color: #1e293b;">${product.hsn}</strong>
                      </div>
                    </td>

                    <td align="right" valign="top" style="padding: 14px 8px; border-top: 1px solid #f1f5f9;">
                      <div style="font-family: monospace; font-size: 12px; font-weight: 600; color: #1e293b;">
                        ${product.unitPrice}
                      </div>
                      ${isMH ? `
                        <div style="font-size: 10.5px; color: #64748b; margin-top: 4px; line-height: 1.3;">
                          CGST @ 9%<br/>
                          SGST @ 9%
                        </div>
                      ` : `
                        <div style="font-size: 10.5px; color: #64748b; margin-top: 4px;">
                          IGST @ 18%
                        </div>
                      `}
                    </td>

                    <td align="center" valign="top" style="padding: 14px 8px; border-top: 1px solid #f1f5f9; font-size: 12px; font-weight: 700; color: #1e293b;">
                      ${product.quantity}
                    </td>

                    <td align="right" valign="top" style="padding: 14px 8px; border-top: 1px solid #f1f5f9;">
                      <div style="font-family: monospace; font-size: 12.5px; font-weight: 800; color: #0f172a;">
                        ₹ ${formattedTotal}.00
                      </div>
                      ${isMH ? `
                        <div style="font-family: monospace; font-size: 10.5px; color: #475569; margin-top: 4px; line-height: 1.3;">
                          ₹ ${formattedCgst}<br/>
                          ₹ ${formattedSgst}
                        </div>
                      ` : `
                        <div style="font-family: monospace; font-size: 10.5px; color: #475569; margin-top: 4px;">
                          ₹ ${formattedIgst}
                        </div>
                      `}
                      <div style="font-size: 9.5px; color: #94a3b8; font-style: italic; margin-top: 3px;">
                        Tax Inclusive, Rounded-off
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>

              <!-- 6. Subtotal & Totals Summary -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: 16px;">
                <tr>
                  <td width="40%"></td>
                  <td width="60%" align="right">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 290px;">
                      <tr>
                        <td align="left" style="font-size: 12px; color: #475569; padding: 3px 0;">Sub Total</td>
                        <td align="right" style="font-family: monospace; font-size: 12px; font-weight: 600; color: #1e293b; padding: 3px 0;">₹ ${formattedTotal}.00</td>
                      </tr>

                      ${isMH ? `
                        <tr>
                          <td align="left" style="font-size: 11px; color: #64748b; padding: 2px 0;">CGST (9%)</td>
                          <td align="right" style="font-family: monospace; font-size: 11px; color: #475569; padding: 2px 0;">₹ ${formattedCgst}</td>
                        </tr>
                        <tr>
                          <td align="left" style="font-size: 11px; color: #64748b; padding: 2px 0;">SGST (9%)</td>
                          <td align="right" style="font-family: monospace; font-size: 11px; color: #475569; padding: 2px 0;">₹ ${formattedSgst}</td>
                        </tr>
                      ` : `
                        <tr>
                          <td align="left" style="font-size: 11px; color: #64748b; padding: 2px 0;">IGST (18%)</td>
                          <td align="right" style="font-family: monospace; font-size: 11px; color: #475569; padding: 2px 0;">₹ ${formattedIgst}</td>
                        </tr>
                      `}

                      <tr>
                        <td align="left" style="font-size: 12px; color: #334155; font-weight: 600; padding: 3px 0;">Total Tax</td>
                        <td align="right" style="font-family: monospace; font-size: 12px; font-weight: 600; color: #1e293b; padding: 3px 0;">₹ ${formattedTotalTax}</td>
                      </tr>

                      <tr>
                        <td colspan="2" style="border-top: 1px solid #cbd5e1; padding-top: 8px; margin-top: 6px;">
                          <table width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tr>
                              <td align="left" style="font-size: 14.5px; font-weight: 800; color: #0f172a;">Total Amount</td>
                              <td align="right" style="font-family: monospace; font-size: 15px; font-weight: 800; color: #0f172a;">₹ ${formattedTotal}.00</td>
                            </tr>
                          </table>
                        </td>
                      </tr>

                      <tr>
                        <td colspan="2" align="right" style="font-size: 10.5px; color: #64748b; font-style: italic; padding-top: 4px; line-height: 1.3;">
                          (In Words) ${invoice.inWords}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- 7. Customer Notes & Terms and Conditions -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: 24px; border-top: 1px solid #e2e8f0; padding-top: 16px;">
                <tr>
                  <td>
                    <div style="font-size: 10.5px; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 3px;">
                      CUSTOMER NOTES
                    </div>
                    <div style="font-size: 11.5px; color: #64748b; line-height: 1.4; margin-bottom: 12px;">
                      ${invoice.customerNotes || "Includes 1-Year Comprehensive Doorstep Replacement Warranty & Free Delivery."}
                    </div>

                    <div style="font-size: 10.5px; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 3px;">
                      TERMS AND CONDITIONS
                    </div>
                    <div style="font-size: 11.5px; color: #64748b; line-height: 1.4;">
                      ${invoice.termsAndConditions || "This computer-generated tax invoice is valid and compliant under the Indian IT Act 2000 and GST Rules."}
                    </div>
                  </td>
                </tr>
              </table>

              <!-- 9. Centered Official Footer -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: 28px; border-top: 1px solid #e2e8f0; padding-top: 16px; text-align: center;">
                <tr>
                  <td align="center">
                    <div style="font-size: 12px; font-weight: 700; color: #0f172a;">
                      AMEC MOBILITY PRIVATE LIMITED
                    </div>
                    <div style="font-size: 10.5px; color: #94a3b8; margin-top: 3px; line-height: 1.4;">
                      Plot No. 5A, 13A MIDC, Beside Tata Motors Service Centre, Hingna MIDC, Nagpur, Maharashtra, India - 440016
                    </div>
                  </td>
                </tr>
              </table>

            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>

</body>
</html>
  `.trim();
}
