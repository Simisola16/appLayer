"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Copy,
  Check,
  RefreshCw,
  Terminal,
} from "lucide-react";
import {
  SITE_CONFIG,
  CURRENCIES,
  CurrencyCode,
  buildWhatsAppEnquiryUrl,
} from "@/lib/config";
import {
  DEVICE_OPTIONS,
  DeviceOption,
  EnquiryFormData,
  ValidationErrors,
  normalizeWebsiteUrl,
  validateEnquiryForm,
} from "@/lib/validation";

function getPackageOptionsForCurrency(currency: CurrencyCode): string[] {
  const pkgOptions = SITE_CONFIG.packages.map((pkg) => {
    if (currency === "USD") {
      return pkg.formOptionValue;
    }
    const price = pkg.pricesByCurrency[currency] || pkg.priceDisplay;
    const shortName = pkg.name.replace(" Package", "");
    return pkg.pricePrefix
      ? `${shortName} — ${pkg.pricePrefix} ${price} (${currency})`
      : `${shortName} — ${price} (${currency})`;
  });

  return [...pkgOptions, "Not Sure — Request a Recommendation"];
}

const INITIAL_FORM: EnquiryFormData = {
  fullName: "",
  businessName: "",
  email: "",
  websiteUrl: "",
  preferredPackage: "Professional — $249",
  devicePreference: "Both",
  projectDescription: "",
};

export default function ContactForm() {
  const [activeCurrency, setActiveCurrency] = useState<CurrencyCode>("USD");
  const [selectedPkgIndex, setSelectedPkgIndex] = useState<number>(1); // Default to Professional (index 1)
  const [formData, setFormData] = useState<EnquiryFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedPayload, setSubmittedPayload] =
    useState<EnquiryFormData | null>(null);
  const [deliveredToLiveBackend, setDeliveredToLiveBackend] = useState(false);
  const [copiedBrief, setCopiedBrief] = useState(false);

  const dynamicPackageOptions = useMemo(
    () => getPackageOptionsForCurrency(activeCurrency),
    [activeCurrency]
  );

  // Keep formData.preferredPackage synchronized when currency or selectedPkgIndex changes
  useEffect(() => {
    const newOption =
      dynamicPackageOptions[selectedPkgIndex] || dynamicPackageOptions[1];
    setFormData((prev) => ({
      ...prev,
      preferredPackage: newOption,
    }));
  }, [dynamicPackageOptions, selectedPkgIndex]);

  // Sync package and currency selection from URL query params or Pricing section events
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const pkgParam = params.get("package")?.toLowerCase();
      const currencyParam = params
        .get("currency")
        ?.toUpperCase() as CurrencyCode;

      if (
        currencyParam &&
        CURRENCIES.some((c) => c.code === currencyParam)
      ) {
        setActiveCurrency(currencyParam);
      }

      if (pkgParam === "starter") {
        setSelectedPkgIndex(0);
      } else if (pkgParam === "professional") {
        setSelectedPkgIndex(1);
      } else if (pkgParam === "advanced") {
        setSelectedPkgIndex(2);
      }

      const handleCurrencyEvent = (event: Event) => {
        const customEvent = event as CustomEvent<CurrencyCode>;
        if (
          customEvent.detail &&
          CURRENCIES.some((c) => c.code === customEvent.detail)
        ) {
          setActiveCurrency(customEvent.detail);
        }
      };

      const handlePackageEvent = (event: Event) => {
        const customEvent = event as CustomEvent<
          | string
          | {
              packageId?: string;
              currency?: CurrencyCode;
              optionLabel?: string;
            }
        >;
        const detail = customEvent.detail;
        if (!detail) return;

        if (typeof detail === "object") {
          if (
            detail.currency &&
            CURRENCIES.some((c) => c.code === detail.currency)
          ) {
            setActiveCurrency(detail.currency);
          }
          if (detail.packageId === "starter") setSelectedPkgIndex(0);
          else if (detail.packageId === "professional") setSelectedPkgIndex(1);
          else if (detail.packageId === "advanced") setSelectedPkgIndex(2);
        } else if (typeof detail === "string") {
          if (detail.startsWith("Starter")) setSelectedPkgIndex(0);
          else if (detail.startsWith("Professional")) setSelectedPkgIndex(1);
          else if (detail.startsWith("Advanced")) setSelectedPkgIndex(2);
          else setSelectedPkgIndex(3);
        }
      };

      window.addEventListener("change-pwa-currency", handleCurrencyEvent);
      window.addEventListener("select-pwa-package", handlePackageEvent);
      return () => {
        window.removeEventListener("change-pwa-currency", handleCurrencyEvent);
        window.removeEventListener("select-pwa-package", handlePackageEvent);
      };
    }
  }, []);

  const handleFieldChange = <K extends keyof EnquiryFormData>(
    field: K,
    value: EnquiryFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validation = validateEnquiryForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    const normalizedData: EnquiryFormData = {
      ...formData,
      fullName: formData.fullName.trim(),
      businessName: formData.businessName.trim(),
      email: formData.email.trim(),
      websiteUrl: normalizeWebsiteUrl(formData.websiteUrl),
      projectDescription: formData.projectDescription.trim(),
    };

    try {
      const response = await fetch(SITE_CONFIG.integrations.enquiryEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(normalizedData),
      });

      const result = await response.json();
      setDeliveredToLiveBackend(Boolean(result?.deliveredToBackend));
      setSubmittedPayload(normalizedData);
    } catch {
      setDeliveredToLiveBackend(false);
      setSubmittedPayload(normalizedData);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatEnquirySummaryText = (data: EnquiryFormData) => {
    return [
      "WEBSITE-TO-APP PROJECT ENQUIRY",
      `Full Name: ${data.fullName}`,
      `Business Name: ${data.businessName}`,
      `Email Address: ${data.email}`,
      `Existing Website URL: ${data.websiteUrl}`,
      `Preferred Package: ${data.preferredPackage}`,
      `Device Preference: ${data.devicePreference}`,
      `Project Description: ${data.projectDescription}`,
    ].join("\n");
  };

  const handleCopyBrief = async () => {
    if (!submittedPayload) return;
    try {
      await navigator.clipboard.writeText(
        formatEnquirySummaryText(submittedPayload)
      );
      setCopiedBrief(true);
      setTimeout(() => setCopiedBrief(false), 2500);
    } catch {
      setCopiedBrief(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-24 lg:py-32 bg-[#08090d] text-white border-b border-white/10 bg-grid-dark"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-start">
          {/* Left Column: Enquiry Context & Configurable Direct Channels */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/[0.05] border border-white/10 mb-4">
                <span className="font-[family-name:var(--font-mono)] text-xs font-semibold uppercase tracking-widest text-blue-400">
                  08 / Project Enquiry
                </span>
              </div>
              <h2 className="font-[family-name:var(--font-jakarta)] text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-white leading-[1.15]">
                Ready to Transform Your Website?
              </h2>
              <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
                Tell us about your business and existing website. We&apos;ll
                review your requirements and recommend an appropriate
                transformation package.
              </p>
            </div>

            {/* Assessment What We Review Card */}
            <div className="bg-[#10141f] border border-white/10 rounded-2xl p-6 space-y-4">
              <div className="text-xs font-[family-name:var(--font-mono)] uppercase tracking-wider text-blue-400">
                What Happens After You Enquire
              </div>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="font-[family-name:var(--font-mono)] text-xs text-blue-400 font-bold mt-0.5">
                    01
                  </span>
                  <span>
                    We inspect your existing website URL for PWA readiness and
                    HTTPS configuration.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-[family-name:var(--font-mono)] text-xs text-blue-400 font-bold mt-0.5">
                    02
                  </span>
                  <span>
                    We verify compatibility for your target devices (Android,
                    iPhone, or Both).
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-[family-name:var(--font-mono)] text-xs text-blue-400 font-bold mt-0.5">
                    03
                  </span>
                  <span>
                    We confirm the best package fit and provide a clear
                    quotation in your preferred currency.
                  </span>
                </li>
              </ul>
            </div>

            {/* WhatsApp Contact Action (Configurable Placeholder Number) */}
            <div className="bg-[#10141f] border border-white/10 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-white">
                  Prefer Direct Messaging?
                </span>
                <span className="text-[11px] font-[family-name:var(--font-mono)] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded">
                  WhatsApp Channel
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Start a project conversation on WhatsApp with a pre-formatted
                transformation enquiry message.
              </p>
              <a
                href={buildWhatsAppEnquiryUrl(
                  submittedPayload
                    ? formatEnquirySummaryText(submittedPayload)
                    : undefined
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold py-3.5 px-5 rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Enquire via WhatsApp</span>
              </a>
              <p className="text-[11px] text-slate-500 font-[family-name:var(--font-mono)]">
                Configurable endpoint via NEXT_PUBLIC_WHATSAPP_NUMBER in{" "}
                <code className="text-slate-400">src/lib/config.ts</code>.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Project Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#10141f] border border-white/10 rounded-2xl p-6 sm:p-10 shadow-xl">
              {submittedPayload ? (
                /* HONEST SUBMISSION SUCCESS / PREPARED STATE */
                <div className="space-y-6" role="status" aria-live="polite">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 shrink-0">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest text-blue-400">
                        {deliveredToLiveBackend
                          ? "Enquiry Transmitted"
                          : "Enquiry Validated & Prepared"}
                      </span>
                      <h3 className="font-[family-name:var(--font-jakarta)] text-2xl font-bold text-white mt-1">
                        {deliveredToLiveBackend
                          ? "Thank You — Your Project Enquiry Has Been Sent"
                          : "Your Project Enquiry Summary Is Ready"}
                      </h3>
                    </div>
                  </div>

                  {/* Honest Backend Status Banner */}
                  {deliveredToLiveBackend ? (
                    <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-sm text-emerald-200 leading-relaxed">
                      Your project details have been delivered to our configured
                      intake endpoint. We will review{" "}
                      <span className="font-semibold text-white">
                        {submittedPayload.websiteUrl}
                      </span>{" "}
                      and respond to{" "}
                      <span className="font-semibold text-white">
                        {submittedPayload.email}
                      </span>
                      .
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs sm:text-sm text-amber-200/90 leading-relaxed flex items-start gap-3">
                      <Terminal className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-white block mb-1">
                          Transparent Delivery Status (No Live Backend Connected
                          Yet)
                        </span>
                        All fields passed validation and your enquiry payload has
                        been structured below. Because no external email or
                        webhook endpoint (
                        <code className="font-[family-name:var(--font-mono)] text-amber-300">
                          ENQUIRY_WEBHOOK_URL
                        </code>
                        ) is currently connected in this environment, no message
                        has been transmitted over the network yet. You can copy
                        the formatted brief below or send it directly via
                        WhatsApp.
                      </div>
                    </div>
                  )}

                  {/* Structured Summary Review */}
                  <div className="bg-[#090b10] border border-white/10 rounded-xl p-5 space-y-3 text-sm">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                      <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-slate-400">
                        Structured Enquiry Payload
                      </span>
                      <span className="font-[family-name:var(--font-mono)] text-xs text-blue-400">
                        {submittedPayload.preferredPackage}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div>
                        <div className="text-xs text-slate-500">Full Name</div>
                        <div className="text-slate-200 font-medium">
                          {submittedPayload.fullName}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500">
                          Business Name
                        </div>
                        <div className="text-slate-200 font-medium">
                          {submittedPayload.businessName}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500">
                          Email Address
                        </div>
                        <div className="text-slate-200 font-medium">
                          {submittedPayload.email}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500">
                          Existing Website URL
                        </div>
                        <div className="text-blue-400 font-[family-name:var(--font-mono)] text-xs truncate">
                          {submittedPayload.websiteUrl}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500">
                          Target Devices
                        </div>
                        <div className="text-slate-200 font-medium">
                          {submittedPayload.devicePreference}
                        </div>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-white/[0.06]">
                      <div className="text-xs text-slate-500 mb-1">
                        Project Description
                      </div>
                      <p className="text-slate-300 text-xs leading-relaxed whitespace-pre-line">
                        {submittedPayload.projectDescription}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons in Success View */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      type="button"
                      onClick={handleCopyBrief}
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold py-3.5 px-5 rounded-xl transition-colors"
                    >
                      {copiedBrief ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Brief Copied to Clipboard</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy Structured Brief</span>
                        </>
                      )}
                    </button>

                    <a
                      href={buildWhatsAppEnquiryUrl(
                        formatEnquirySummaryText(submittedPayload)
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold py-3.5 px-5 rounded-xl transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Send Brief via WhatsApp</span>
                    </a>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSubmittedPayload(null)}
                    className="inline-flex items-center gap-2 text-xs font-[family-name:var(--font-mono)] text-slate-400 hover:text-white transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Edit or Submit Another Enquiry</span>
                  </button>
                </div>
              ) : (
                /* ENQUIRY FORM */
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-6"
                  aria-label="Project Enquiry Form"
                >
                  <div className="border-b border-white/10 pb-4 flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-[family-name:var(--font-jakarta)] text-xl font-bold text-white">
                      Project Specification Form
                    </h3>
                    <div className="flex items-center gap-1.5">
                      {CURRENCIES.map((curr) => (
                        <button
                          key={curr.code}
                          type="button"
                          onClick={() => setActiveCurrency(curr.code)}
                          className={`px-2 py-1 rounded text-[11px] font-[family-name:var(--font-mono)] transition-colors ${
                            activeCurrency === curr.code
                              ? "bg-blue-600 text-white font-semibold"
                              : "bg-white/[0.05] text-slate-400 hover:text-white"
                          }`}
                        >
                          {curr.code}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Row 1: Full Name & Business Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2"
                      >
                        Full Name
                      </label>
                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        autoComplete="name"
                        value={formData.fullName}
                        onChange={(e) =>
                          handleFieldChange("fullName", e.target.value)
                        }
                        placeholder="e.g., Alex Morgan"
                        aria-invalid={Boolean(errors.fullName)}
                        aria-describedby={
                          errors.fullName ? "error-fullName" : undefined
                        }
                        className={`w-full rounded-xl bg-[#090b10] border px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                          errors.fullName
                            ? "border-red-500"
                            : "border-white/15 hover:border-white/25"
                        }`}
                      />
                      {errors.fullName && (
                        <p
                          id="error-fullName"
                          className="mt-1.5 text-xs text-red-400 flex items-center gap-1.5"
                        >
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.fullName}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="businessName"
                        className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2"
                      >
                        Business Name
                      </label>
                      <input
                        id="businessName"
                        name="businessName"
                        type="text"
                        autoComplete="organization"
                        value={formData.businessName}
                        onChange={(e) =>
                          handleFieldChange("businessName", e.target.value)
                        }
                        placeholder="e.g., Meridian Health Group"
                        aria-invalid={Boolean(errors.businessName)}
                        aria-describedby={
                          errors.businessName ? "error-businessName" : undefined
                        }
                        className={`w-full rounded-xl bg-[#090b10] border px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                          errors.businessName
                            ? "border-red-500"
                            : "border-white/15 hover:border-white/25"
                        }`}
                      />
                      {errors.businessName && (
                        <p
                          id="error-businessName"
                          className="mt-1.5 text-xs text-red-400 flex items-center gap-1.5"
                        >
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.businessName}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Email Address & Existing Website URL */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2"
                      >
                        Email Address
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleFieldChange("email", e.target.value)
                        }
                        placeholder="name@company.com"
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={
                          errors.email ? "error-email" : undefined
                        }
                        className={`w-full rounded-xl bg-[#090b10] border px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                          errors.email
                            ? "border-red-500"
                            : "border-white/15 hover:border-white/25"
                        }`}
                      />
                      {errors.email && (
                        <p
                          id="error-email"
                          className="mt-1.5 text-xs text-red-400 flex items-center gap-1.5"
                        >
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="websiteUrl"
                        className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2"
                      >
                        Existing Website URL
                      </label>
                      <input
                        id="websiteUrl"
                        name="websiteUrl"
                        type="url"
                        value={formData.websiteUrl}
                        onChange={(e) =>
                          handleFieldChange("websiteUrl", e.target.value)
                        }
                        placeholder="https://yourbusiness.com"
                        aria-invalid={Boolean(errors.websiteUrl)}
                        aria-describedby={
                          errors.websiteUrl ? "error-websiteUrl" : undefined
                        }
                        className={`w-full rounded-xl bg-[#090b10] border px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                          errors.websiteUrl
                            ? "border-red-500"
                            : "border-white/15 hover:border-white/25"
                        }`}
                      />
                      {errors.websiteUrl && (
                        <p
                          id="error-websiteUrl"
                          className="mt-1.5 text-xs text-red-400 flex items-center gap-1.5"
                        >
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.websiteUrl}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Row 3: Preferred Package & Device Preference */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="preferredPackage"
                        className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2"
                      >
                        Preferred Package ({activeCurrency})
                      </label>
                      <select
                        id="preferredPackage"
                        name="preferredPackage"
                        value={formData.preferredPackage}
                        onChange={(e) => {
                          const idx = dynamicPackageOptions.indexOf(
                            e.target.value
                          );
                          if (idx !== -1) setSelectedPkgIndex(idx);
                          handleFieldChange("preferredPackage", e.target.value);
                        }}
                        className="w-full rounded-xl bg-[#090b10] border border-white/15 hover:border-white/25 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                      >
                        {dynamicPackageOptions.map((option) => (
                          <option
                            key={option}
                            value={option}
                            className="bg-[#090b10] text-white"
                          >
                            {option}
                          </option>
                        ))}
                      </select>
                      {errors.preferredPackage && (
                        <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1.5">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.preferredPackage}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <span className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                        Device Preference
                      </span>
                      <div
                        role="radiogroup"
                        aria-label="Device Preference"
                        className="grid grid-cols-3 gap-2.5"
                      >
                        {DEVICE_OPTIONS.map((device) => {
                          const selected =
                            formData.devicePreference === device;
                          return (
                            <button
                              key={device}
                              type="button"
                              role="radio"
                              aria-checked={selected}
                              onClick={() =>
                                handleFieldChange(
                                  "devicePreference",
                                  device as DeviceOption
                                )
                              }
                              className={`py-3 px-3 rounded-xl text-xs font-semibold border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                                selected
                                  ? "bg-blue-600 text-white border-blue-500 shadow-sm"
                                  : "bg-[#090b10] text-slate-300 border-white/15 hover:border-white/30"
                              }`}
                            >
                              {device}
                            </button>
                          );
                        })}
                      </div>
                      {errors.devicePreference && (
                        <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1.5">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.devicePreference}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Row 4: Project Description */}
                  <div>
                    <label
                      htmlFor="projectDescription"
                      className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2"
                    >
                      Project Description
                    </label>
                    <textarea
                      id="projectDescription"
                      name="projectDescription"
                      rows={4}
                      value={formData.projectDescription}
                      onChange={(e) =>
                        handleFieldChange("projectDescription", e.target.value)
                      }
                      placeholder="Describe your website platform (e.g., WordPress, Next.js, Shopify, custom web app) and the mobile experience you want to offer your customers..."
                      aria-invalid={Boolean(errors.projectDescription)}
                      aria-describedby={
                        errors.projectDescription
                          ? "error-projectDescription"
                          : undefined
                      }
                      className={`w-full rounded-xl bg-[#090b10] border px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                        errors.projectDescription
                          ? "border-red-500"
                          : "border-white/15 hover:border-white/25"
                      }`}
                    />
                    {errors.projectDescription && (
                      <p
                        id="error-projectDescription"
                        className="mt-1.5 text-xs text-red-400 flex items-center gap-1.5"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.projectDescription}</span>
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-semibold text-base py-4 px-7 rounded-xl transition-all duration-150 shadow-sm hover:shadow-blue-600/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                    >
                      <Send className="w-4 h-4" />
                      <span>
                        {isSubmitting
                          ? "Validating Enquiry..."
                          : "Submit Project Enquiry"}
                      </span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
