import { Resend } from "resend";

export interface EnquiryEmailPayload {
  enquiryId?: string | null;
  fullName: string;
  businessName: string;
  email: string;
  websiteUrl: string;
  preferredPackage: string;
  devicePreference: string;
  projectDescription: string;
  submittedAt: string;
}

export interface EmailDispatchResult {
  configured: boolean;
  customerConfirmationSent: boolean;
  adminNotificationSent: boolean;
  customerMessageId?: string;
  adminMessageId?: string;
  errors: string[];
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildCustomerConfirmationHtml(payload: EnquiryEmailPayload): string {
  const refBadge = payload.enquiryId
    ? `<p style="margin:0 0 16px;font-family:monospace;font-size:12px;color:#60a5fa;">Reference ID: ${escapeHtml(payload.enquiryId)}</p>`
    : "";

  return `
    <div style="background-color:#08090d;padding:32px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#e2e8f0;">
      <div style="max-width:600px;margin:0 auto;background-color:#10141f;border:1px solid #1e293b;border-radius:14px;padding:32px;">
        <p style="margin:0 0 8px;font-family:monospace;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#3b82f6;">
          AppLayer • Website-to-App Transformation
        </p>
        <h1 style="margin:0 0 16px;font-size:24px;line-height:1.25;color:#ffffff;">
          Project Enquiry Received
        </h1>
        ${refBadge}
        <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#cbd5e1;">
          Hello ${escapeHtml(payload.fullName)}, thank you for submitting a transformation enquiry for <strong>${escapeHtml(payload.businessName)}</strong>. We have recorded your website details and will review technical compatibility for your selected devices.
        </p>
        <div style="background-color:#090b10;border:1px solid #1e293b;border-radius:10px;padding:20px;margin-bottom:24px;">
          <table style="width:100%;border-collapse:collapse;font-size:13px;color:#cbd5e1;">
            <tr>
              <td style="padding:6px 0;color:#94a3b8;width:160px;">Business Name</td>
              <td style="padding:6px 0;color:#ffffff;font-weight:600;">${escapeHtml(payload.businessName)}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;color:#94a3b8;">Existing Website</td>
              <td style="padding:6px 0;color:#60a5fa;">${escapeHtml(payload.websiteUrl)}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;color:#94a3b8;">Selected Package</td>
              <td style="padding:6px 0;color:#ffffff;font-weight:600;">${escapeHtml(payload.preferredPackage)}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;color:#94a3b8;">Device Preference</td>
              <td style="padding:6px 0;color:#ffffff;">${escapeHtml(payload.devicePreference)}</td>
            </tr>
          </table>
        </div>
        <p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#ffffff;">Next Steps</p>
        <p style="margin:0 0 24px;font-size:13px;line-height:1.6;color:#94a3b8;">
          1. Website architecture and HTTPS readiness review.<br/>
          2. Platform capability assessment for Android and/or iPhone.<br/>
          3. Tailored quotation and implementation plan confirmation.
        </p>
        <hr style="border:none;border-top:1px solid #1e293b;margin:24px 0;"/>
        <p style="margin:0;font-size:11px;line-height:1.5;color:#64748b;">
          AppLayer • Helping businesses transform their existing websites into modern, installable mobile experiences.
        </p>
      </div>
    </div>
  `;
}

function buildAdminNotificationHtml(payload: EnquiryEmailPayload): string {
  return `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;padding:24px;background-color:#f8fafc;color:#0f172a;">
      <div style="max-width:620px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:28px;">
        <p style="margin:0 0 6px;font-family:monospace;font-size:11px;text-transform:uppercase;letter-spacing:1.2px;color:#2563eb;">
          New Project Enquiry
        </p>
        <h2 style="margin:0 0 18px;font-size:20px;color:#0f172a;">
          ${escapeHtml(payload.businessName)} — ${escapeHtml(payload.preferredPackage)}
        </h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:20px;">
          <tr><td style="padding:8px 0;border-bottom:1px solid #f1f5f9;color:#64748b;width:160px;">Reference ID</td><td style="padding:8px 0;border-bottom:1px solid #f1f5f9;font-family:monospace;">${escapeHtml(payload.enquiryId || "N/A")}</td></tr>
          <tr><td style="padding:8px 0;border-bottom:1px solid #f1f5f9;color:#64748b;">Full Name</td><td style="padding:8px 0;border-bottom:1px solid #f1f5f9;">${escapeHtml(payload.fullName)}</td></tr>
          <tr><td style="padding:8px 0;border-bottom:1px solid #f1f5f9;color:#64748b;">Business Name</td><td style="padding:8px 0;border-bottom:1px solid #f1f5f9;">${escapeHtml(payload.businessName)}</td></tr>
          <tr><td style="padding:8px 0;border-bottom:1px solid #f1f5f9;color:#64748b;">Email Address</td><td style="padding:8px 0;border-bottom:1px solid #f1f5f9;">${escapeHtml(payload.email)}</td></tr>
          <tr><td style="padding:8px 0;border-bottom:1px solid #f1f5f9;color:#64748b;">Website URL</td><td style="padding:8px 0;border-bottom:1px solid #f1f5f9;">${escapeHtml(payload.websiteUrl)}</td></tr>
          <tr><td style="padding:8px 0;border-bottom:1px solid #f1f5f9;color:#64748b;">Package</td><td style="padding:8px 0;border-bottom:1px solid #f1f5f9;font-weight:600;">${escapeHtml(payload.preferredPackage)}</td></tr>
          <tr><td style="padding:8px 0;border-bottom:1px solid #f1f5f9;color:#64748b;">Device Preference</td><td style="padding:8px 0;border-bottom:1px solid #f1f5f9;">${escapeHtml(payload.devicePreference)}</td></tr>
          <tr><td style="padding:8px 0;border-bottom:1px solid #f1f5f9;color:#64748b;">Submitted At</td><td style="padding:8px 0;border-bottom:1px solid #f1f5f9;">${escapeHtml(payload.submittedAt)}</td></tr>
        </table>
        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:16px;">
          <div style="font-size:12px;font-weight:600;color:#475569;margin-bottom:6px;">Project Description</div>
          <div style="font-size:14px;line-height:1.6;color:#0f172a;white-space:pre-line;">${escapeHtml(payload.projectDescription)}</div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Dispatches enquiry emails through Resend using RESEND_API_KEY and the
 * configured sending domain (RESEND_FROM_EMAIL).
 */
export async function sendEnquiryEmails(
  payload: EnquiryEmailPayload
): Promise<EmailDispatchResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return {
      configured: false,
      customerConfirmationSent: false,
      adminNotificationSent: false,
      errors: [],
    };
  }

  const resend = new Resend(apiKey);
  const fromEmail =
    process.env.RESEND_FROM_EMAIL || "AppLayer <enquiries@atlassync.company>";
  const adminEmail = process.env.ENQUIRY_NOTIFICATION_EMAIL?.trim();
  const errors: string[] = [];

  let customerConfirmationSent = false;
  let customerMessageId: string | undefined;
  let adminNotificationSent = false;
  let adminMessageId: string | undefined;

  const customerText = [
    `Hello ${payload.fullName},`,
    "",
    `Thank you for submitting a Website-to-App transformation enquiry for ${payload.businessName}.`,
    payload.enquiryId ? `Reference ID: ${payload.enquiryId}` : "",
    `Existing Website URL: ${payload.websiteUrl}`,
    `Preferred Package: ${payload.preferredPackage}`,
    `Device Preference: ${payload.devicePreference}`,
    "",
    "We will review your website architecture and compatibility and follow up with next steps.",
    "",
    "AppLayer",
  ]
    .filter(Boolean)
    .join("\n");

  const customerRes = await resend.emails.send({
    from: fromEmail,
    to: [payload.email],
    subject: `Enquiry Received: Website-to-App Transformation (${payload.businessName})`,
    html: buildCustomerConfirmationHtml(payload),
    text: customerText,
  });

  if (customerRes.error) {
    errors.push(`Customer email error: ${customerRes.error.message}`);
  } else {
    customerConfirmationSent = true;
    customerMessageId = customerRes.data?.id;
  }

  if (adminEmail) {
    const adminRes = await resend.emails.send({
      from: fromEmail,
      to: [adminEmail],
      replyTo: payload.email,
      subject: `New Project Enquiry: ${payload.businessName} (${payload.preferredPackage})`,
      html: buildAdminNotificationHtml(payload),
    });

    if (adminRes.error) {
      errors.push(`Admin alert error: ${adminRes.error.message}`);
    } else {
      adminNotificationSent = true;
      adminMessageId = adminRes.data?.id;
    }
  }

  return {
    configured: true,
    customerConfirmationSent,
    adminNotificationSent,
    customerMessageId,
    adminMessageId,
    errors,
  };
}
