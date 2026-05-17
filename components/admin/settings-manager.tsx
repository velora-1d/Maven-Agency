"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";

import {
  getSettingsFields,
  getSettingsFormValues,
  settingsValuesToPayload,
  type ResourceFormValues
} from "@/lib/admin-config";
import type { SiteSettings } from "@/lib/types";
import { MediaUploadField } from "@/components/admin/media-upload-field";

type SettingsManagerProps = {
  initialSettings: SiteSettings;
};

const SECTION_LABELS: Record<string, string> = {
  heroBadgeId: "HERO",
  heroHeadlineId: "HERO",
  heroSubheadlineId: "HERO",
  heroCtaLabelId: "HERO",
  heroCtaHref: "HERO",
  heroImage1: "HERO",
  heroImage2: "HERO",
  aboutHeadlineId: "ABOUT",
  aboutStoryId: "ABOUT",
  missionId: "ABOUT",
  visionId: "ABOUT",
  stats: "ABOUT",
  whyUs: "WHY US",
  contactHeadlineId: "CONTACT",
  contactCopyId: "CONTACT",
  whatsapp: "CONTACT",
  phone: "CONTACT",
  email: "CONTACT",
  addressId: "CONTACT",
  socials: "CONTACT",
};

export function SettingsManager({ initialSettings }: SettingsManagerProps) {
  const [formValues, setFormValues] = useState<ResourceFormValues>(
    getSettingsFormValues(initialSettings)
  );
  const [status, setStatus] = useState<{ type: "idle" | "saving" | "saved" | "error"; msg: string }>({
    type: "idle",
    msg: ""
  });

  function updateField(name: string, value: string) {
    setFormValues((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ type: "saving", msg: "SAVING..." });
    const payload = settingsValuesToPayload(formValues);

    const response = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      setStatus({ type: "error", msg: "SAVE FAILED" });
      return;
    }

    const data = (await response.json()) as SiteSettings;
    setFormValues(getSettingsFormValues(data));
    setStatus({ type: "saved", msg: "SETTINGS SAVED" });
  }

  const fields = getSettingsFields();
  const sections = Array.from(new Set(fields.map((f) => SECTION_LABELS[f.name] ?? "OTHER")));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-[3px] border-true-black bg-paper-white p-6 neo-shadow">
        <div>
          <p className="font-body text-label-mono uppercase text-on-surface-variant">CONFIGURATION</p>
          <h1 className="mt-1 font-display text-headline-md uppercase leading-none text-true-black">
            SITE SETTINGS
          </h1>
          <p className="mt-2 font-body text-body-md text-on-surface-variant">
            Edit hero copy, about content, stats, why-us, and contact details.
          </p>
        </div>

        {status.msg && (
          <div className={`flex items-center gap-2 border-[3px] px-4 py-3 font-body text-label-mono uppercase ${
            status.type === "saved"
              ? "border-true-black bg-true-black text-paper-white"
              : status.type === "error"
              ? "border-primary-container bg-primary-container text-paper-white"
              : "border-true-black bg-surface-container text-on-surface"
          }`}>
            {status.type === "saved" && <Check className="h-4 w-4" />}
            {status.type === "error" && <X className="h-4 w-4" />}
            {status.msg}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {sections.map((section) => {
          const sectionFields = fields.filter((f) => (SECTION_LABELS[f.name] ?? "OTHER") === section);
          return (
            <div key={section} className="border-[3px] border-true-black bg-paper-white neo-shadow">
              {/* Section header */}
              <div className={`border-b-[3px] border-true-black px-6 py-4 ${
                section === "HERO" ? "bg-true-black" :
                section === "ABOUT" ? "bg-surface-container-high" :
                section === "CONTACT" ? "bg-primary-container" :
                "bg-secondary-container"
              }`}>
                <h2 className={`font-display text-headline-md uppercase ${
                  section === "HERO" ? "text-paper-white" :
                  section === "CONTACT" ? "text-paper-white" :
                  "text-true-black"
                }`}>
                  {section}
                </h2>
              </div>

              {/* Fields grid */}
              <div className="grid gap-6 p-6 md:grid-cols-2">
                {sectionFields.map((field) => (
                  <label
                    key={field.name}
                    className={`flex flex-col gap-2 ${field.type === "textarea" ? "md:col-span-2" : ""}`}
                  >
                    <span className="font-body text-label-mono uppercase text-on-surface-variant">
                      {field.label}
                    </span>
                    {field.type === "textarea" ? (
                      <textarea
                        value={String(formValues[field.name] ?? "")}
                        onChange={(e) => updateField(field.name, e.target.value)}
                        className="neo-input min-h-[120px] w-full resize-y px-4 py-3 font-body text-body-md text-on-surface normal-case"
                      />
                    ) : (
                      <input
                        type="text"
                        value={String(formValues[field.name] ?? "")}
                        onChange={(e) => updateField(field.name, e.target.value)}
                        className="neo-input w-full px-4 py-3 font-body text-body-md text-on-surface normal-case"
                      />
                    )}
                    {field.media && (
                      <MediaUploadField
                        value={String(formValues[field.name] ?? "")}
                        resource="settings"
                        onUploaded={(val) => updateField(field.name, val)}
                      />
                    )}
                  </label>
                ))}
              </div>
            </div>
          );
        })}

        {/* Submit */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full pt-4">
          <button
            type="submit"
            disabled={status.type === "saving"}
            className={`flex w-full sm:w-auto items-center justify-center gap-2 border-[3px] border-true-black px-10 py-4 font-display text-headline-md uppercase text-paper-white neo-shadow transition-all active:translate-x-1 active:translate-y-1 active:shadow-none ${
              status.type === "saving"
                ? "bg-surface-container text-on-surface cursor-not-allowed opacity-70"
                : status.type === "saved"
                ? "bg-true-black hover:bg-primary-container"
                : status.type === "error"
                ? "bg-primary-container hover:bg-true-black"
                : "bg-true-black hover:bg-primary-container"
            }`}
          >
            {status.type === "saving" ? (
              <span className="animate-spin">⏳</span>
            ) : status.type === "error" ? (
              <X className="h-5 w-5" />
            ) : (
              <Check className="h-5 w-5" />
            )}
            {status.type === "saving"
              ? "SAVING..."
              : status.type === "saved"
              ? "SAVED SUCCESSFULLY"
              : status.type === "error"
              ? "SAVE FAILED - RETRY"
              : "SAVE ALL SETTINGS"}
          </button>

          {status.msg && (
            <div
              className={`flex items-center gap-2 border-[3px] px-6 py-4 font-body text-label-mono uppercase ${
                status.type === "saved"
                  ? "border-true-black bg-true-black text-paper-white animate-bounce"
                  : status.type === "error"
                  ? "border-primary-container bg-primary-container text-paper-white animate-pulse"
                  : "border-true-black bg-surface-container text-on-surface"
              }`}
            >
              {status.type === "saved" && <Check className="h-5 w-5" />}
              {status.type === "error" && <X className="h-5 w-5" />}
              {status.msg}
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
