import { NextResponse } from "next/server";
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

    const normalizedPayload = {
      fullName: body.fullName.trim(),
      businessName: body.businessName.trim(),
      email: body.email.trim(),
      websiteUrl: normalizeWebsiteUrl(body.websiteUrl),
      preferredPackage: body.preferredPackage,
      devicePreference: body.devicePreference,
      projectDescription: body.projectDescription.trim(),
      submittedAt: new Date().toISOString(),
    };

    const webhookUrl =
      process.env.ENQUIRY_WEBHOOK_URL ||
      process.env.NEXT_PUBLIC_ENQUIRY_WEBHOOK_URL;

    let deliveredToBackend = false;

    if (webhookUrl) {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(normalizedPayload),
      });

      if (!response.ok) {
        return NextResponse.json(
          {
            ok: false,
            message:
              "The configured delivery endpoint returned an error. Please try again or use an alternative contact option.",
          },
          { status: 502 }
        );
      }
      deliveredToBackend = true;
    }

    return NextResponse.json({
      ok: true,
      deliveredToBackend,
      enquiry: normalizedPayload,
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: "Unable to process project enquiry payload.",
      },
      { status: 500 }
    );
  }
}
