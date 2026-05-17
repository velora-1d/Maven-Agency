"use client";

import { useState } from "react";

import {
  getSettingsFields,
  getSettingsFormValues,
  settingsValuesToPayload,
  type ResourceFormValues
} from "@/lib/admin-config";
import type { SiteSettings } from "@/lib/types";

type SettingsManagerProps = {
  initialSettings: SiteSettings;
};

export function SettingsManager({ initialSettings }: SettingsManagerProps) {
  const [formValues, setFormValues] = useState<ResourceFormValues>(
    getSettingsFormValues(initialSettings)
  );
  const [status, setStatus] = useState("");

  function updateField(name: string, value: string) {
    setFormValues((current) => ({
      ...current,
      [name]: value
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Saving...");
    const payload = settingsValuesToPayload(formValues);

    const response = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      setStatus("Save failed");
      return;
    }

    const data = (await response.json()) as SiteSettings;
    setFormValues(getSettingsFormValues(data));
    setStatus("Saved");
  }

  return (
    <section className="dash-panel">
      <h1 className="font-[family:var(--font-display)] text-4xl uppercase leading-none">
        Site Settings
      </h1>
      <p className="mt-3 max-w-3xl text-sm leading-7">
        Edit hero copy, about content, stats, why-us list, and contact details from one place.
      </p>
      <p className="mt-3 text-sm uppercase tracking-[0.2em]">{status}</p>

      <form onSubmit={handleSubmit} className="mt-8 grid gap-5 md:grid-cols-2">
        {getSettingsFields().map((field) => (
          <label
            key={field.name}
            className={field.type === "textarea" ? "md:col-span-2" : undefined}
          >
            <span className="editor-label">{field.label}</span>
            {field.type === "textarea" ? (
              <textarea
                value={String(formValues[field.name] ?? "")}
                onChange={(event) => updateField(field.name, event.target.value)}
                className="editable-field min-h-28"
              />
            ) : (
              <input
                type="text"
                value={String(formValues[field.name] ?? "")}
                onChange={(event) => updateField(field.name, event.target.value)}
                className="editable-field"
              />
            )}
          </label>
        ))}

        <div className="md:col-span-2">
          <button
            type="submit"
            className="rounded-full border-[3px] border-black bg-ink px-6 py-3 text-sm uppercase tracking-[0.25em] text-paper"
          >
            Save Settings
          </button>
        </div>
      </form>
    </section>
  );
}
