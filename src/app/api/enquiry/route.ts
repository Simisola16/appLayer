import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import { sendEnquiryEmails } from "@/lib/email";
import {
  EnquiryFormData,
  normalizeWebsiteUrl,
  validateEnquiryForm,
} from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as EnquiryFormData;
    const validation = validateEnquiryForm(body);

    if (!validation.isValid) {
      return NextResponse.json(
        {
          ok: false,
          message: "Please review the highlighted fields and try again.",
          errors: validation.errors,
        },
        { status: 400 }
      );
    }

    const submittedAt = new Date().toISOString();
    const normalizedPayload = {
      fullName: body.fullName.trim(),
      businessName: body.businessName.trim(),
      email: body.email.trim(),
      websiteUrl: normalizeWebsiteUrl(body.websiteUrl),
      preferredPackage: body.preferredPackage,
      devicePreference: body.devicePreference,
      projectDescription: body.projectDescription.trim(),
      submittedAt,
    };

    let savedToDatabase = false;
    let enquiryId: string | null = null;

    // 1. Persist enquiry in MongoDB if MONGODB_URI is configured
    const db = await getDatabase();
    if (db) {
      const insertResult = await db.collection("enquiries").insertOne({
        ...normalizedPayload,
        status: "new",
        createdAt: new Date(submittedAt),
      });
      savedToDatabase = Boolean(insertResult.acknowledged);
      enquiryId = insertResult.insertedId.toString();
    }

    // 2. Send emails via Resend if RESEND_API_KEY is configured
    const emailResult = await sendEnquiryEmails({
      ...normalizedPayload,
      enquiryId,
    });

    // 3. Optional forward webhook if configured
    const webhookUrl =
      process.env.ENQUIRY_WEBHOOK_URL ||
      process.env.NEXT_PUBLIC_ENQUIRY_WEBHOOK_URL;
    let webhookDelivered = false;

    if (webhookUrl) {
      const webhookRes = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...normalizedPayload,
          enquiryId,
        }),
      });

      if (!webhookRes.ok) {
        return NextResponse.json(
          {
            ok: false,
            message:
              "The configured delivery endpoint returned an error. Please try again or use an alternative contact option.",
          },
          { status: 502 }
        );
      }
      webhookDelivered = true;
    }

    const emailSent =
      emailResult.customerConfirmationSent || emailResult.adminNotificationSent;
    const deliveredToBackend =
      savedToDatabase || emailSent || webhookDelivered;

    // If Resend was configured and failed completely without DB save, surface error
    if (
      emailResult.configured &&
      emailResult.errors.length > 0 &&
      !savedToDatabase &&
      !emailSent
    ) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "Email delivery failed. Please try again or contact us via WhatsApp.",
          details: emailResult.errors,
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      ok: true,
      deliveredToBackend,
      savedToDatabase,
      enquiryId,
      emailStatus: {
        configured: emailResult.configured,
        customerConfirmationSent: emailResult.customerConfirmationSent,
        adminNotificationSent: emailResult.adminNotificationSent,
        errors: emailResult.errors,
      },
      enquiry: normalizedPayload,
    });
  } catch (error) {
    console.error("Enquiry API error:", error);
    return NextResponse.json(
      {
        ok: false,
        message: "Unable to process project enquiry. Please try again.",
      },
      { status: 500 }
    );
  }
}
