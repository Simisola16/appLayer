export type PackageOption =
  | "Starter — $99"
  | "Professional — $249"
  | "Advanced — Starting at $499"
  | "Not Sure — Request a Recommendation";

export type DeviceOption = "Android" | "iPhone" | "Both";

export interface EnquiryFormData {
  fullName: string;
  businessName: string;
  email: string;
  websiteUrl: string;
  preferredPackage: PackageOption | string;
  devicePreference: DeviceOption | string;
  projectDescription: string;
}

export interface ValidationErrors {
  fullName?: string;
  businessName?: string;
  email?: string;
  websiteUrl?: string;
  preferredPackage?: string;
  devicePreference?: string;
  projectDescription?: string;
}

export const PACKAGE_OPTIONS: PackageOption[] = [
  "Starter — $99",
  "Professional — $249",
  "Advanced — Starting at $499",
  "Not Sure — Request a Recommendation",
];

export const DEVICE_OPTIONS: DeviceOption[] = ["Android", "iPhone", "Both"];

export function normalizeWebsiteUrl(rawUrl: string): string {
  const trimmed = rawUrl.trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

export function validateEnquiryForm(data: EnquiryFormData): {
  isValid: boolean;
  errors: ValidationErrors;
} {
  const errors: ValidationErrors = {};

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = "Please enter your full name (at least 2 characters).";
  }

  if (!data.businessName || data.businessName.trim().length < 2) {
    errors.businessName = "Please enter your business or organisation name.";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!data.email || !emailRegex.test(data.email.trim())) {
    errors.email = "Please enter a valid business email address.";
  }

  if (!data.websiteUrl || !data.websiteUrl.trim()) {
    errors.websiteUrl = "Please enter your existing website URL.";
  } else {
    const normalized = normalizeWebsiteUrl(data.websiteUrl);
    try {
      const parsed = new URL(normalized);
      if (!parsed.hostname || !parsed.hostname.includes(".")) {
        errors.websiteUrl =
          "Please enter a valid domain name (e.g., https://yourbusiness.com).";
      }
    } catch {
      errors.websiteUrl =
        "Please enter a valid website URL (e.g., https://yourbusiness.com).";
    }
  }

  const validPackagePrefixes = [
    "Starter",
    "Professional",
    "Advanced",
    "Not Sure",
  ];
  if (
    !data.preferredPackage ||
    !validPackagePrefixes.some((prefix) =>
      data.preferredPackage.startsWith(prefix)
    )
  ) {
    errors.preferredPackage = "Please select a preferred package option.";
  }

  if (
    !data.devicePreference ||
    !DEVICE_OPTIONS.includes(data.devicePreference as DeviceOption)
  ) {
    errors.devicePreference = "Please select a target device preference.";
  }

  if (
    !data.projectDescription ||
    data.projectDescription.trim().length < 15
  ) {
    errors.projectDescription =
      "Please provide a brief project description (at least 15 characters) so we can assess compatibility.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
