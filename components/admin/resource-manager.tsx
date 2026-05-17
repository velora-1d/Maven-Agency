"use client";

import { useMemo, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";

import {
  resourceConfigs,
  type ResourceFormValues
} from "@/lib/admin-config";
import type { AdminResourceKey } from "@/lib/types";
import { cn } from "@/lib/utils";
import { MediaUploadField } from "@/components/admin/media-upload-field";

type ResourceManagerProps = {
  resource: AdminResourceKey;
  initialItems: Array<Record<string, unknown>>;
};

export function ResourceManager({
  resource,
  initialItems
}: ResourceManagerProps) {
  const config = resourceConfigs[resource];
  const [items, setItems] = useState(initialItems);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [formValues, setFormValues] = useState<ResourceFormValues>(config.createEmpty());
  const [status, setStatus] = useState("");
  const selectedItem = useMemo(
    () => items.find((item) => item.id === selectedId) ?? null,
    [items, selectedId]
  );

  function startCreate() {
    setSelectedId(null);
    setFormValues(config.createEmpty());
    setStatus("");
  }

  function startEdit(item: Record<string, unknown>) {
    setSelectedId(String(item.id));
    setFormValues(config.toFormValues(item as never));
    setStatus("");
  }

  function updateField(name: string, value: string | number | boolean) {
    setFormValues((current) => ({
      ...current,
      [name]: value
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Saving...");
    const payload = config.toPayload(formValues);
    const endpoint = selectedId
      ? `/api/admin/${resource}/${selectedId}`
      : `/api/admin/${resource}`;
    const method = selectedId ? "PATCH" : "POST";

    const response = await fetch(endpoint, {
      method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      setStatus("Save failed");
      return;
    }

    const data = (await response.json()) as Record<string, unknown>;

    setItems((current) => {
      if (selectedId) {
        return current.map((item) => (item.id === selectedId ? data : item));
      }

      return [data, ...current];
    });
    setSelectedId(String(data.id));
    setFormValues(config.toFormValues(data as never));
    setStatus("Saved");
  }

  async function handleDelete(id: string) {
    const response = await fetch(`/api/admin/${resource}/${id}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      setStatus("Delete failed");
      return;
    }

    setItems((current) => current.filter((item) => item.id !== id));
    if (selectedId === id) {
      startCreate();
    }
    setStatus("Deleted");
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
      <section className="dash-panel">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="font-[family:var(--font-display)] text-4xl uppercase leading-none">
              {config.title}
            </h1>
            <p className="mt-3 text-sm leading-7">{config.description}</p>
          </div>
          <button
            type="button"
            onClick={startCreate}
            className="inline-flex items-center gap-2 rounded-full border-[3px] border-black bg-mint px-4 py-2 text-xs uppercase tracking-[0.2em]"
          >
            <Plus className="h-4 w-4" />
            New
          </button>
        </div>

        <div className="mt-6 grid gap-4">
          {items.map((item) => {
            const card = config.toCard(item as never);
            return (
              <article
                key={String(item.id)}
                className={cn(
                  "rounded-[24px] border-[3px] border-black bg-paper p-5 transition",
                  selectedId === item.id ? "shadow-brutalSm" : ""
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-[family:var(--font-display)] text-2xl uppercase leading-none">
                      {card.title}
                    </h2>
                    <p className="mt-2 text-xs uppercase tracking-[0.2em]">
                      {card.subtitle}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => startEdit(item)}
                      className="rounded-full border-[3px] border-black bg-white p-2"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(String(item.id))}
                      className="rounded-full border-[3px] border-black bg-signal p-2"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {card.badges.map((badge) => (
                    <span
                      key={badge}
                      className="rounded-full border-[3px] border-black bg-white px-3 py-2 text-[11px] uppercase tracking-[0.2em]"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="dash-panel">
        <h2 className="font-[family:var(--font-display)] text-4xl uppercase leading-none">
          {selectedItem ? "Edit Entry" : "Create Entry"}
        </h2>
        <p className="mt-3 text-sm">{status || "Fill the form and save changes."}</p>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-5">
          {config.fields.map((field) => (
            <label key={field.name}>
              <span className="editor-label">{field.label}</span>
              {field.type === "textarea" ? (
                <textarea
                  value={String(formValues[field.name] ?? "")}
                  onChange={(event) => updateField(field.name, event.target.value)}
                  className="editable-field min-h-28"
                  placeholder={field.placeholder}
                />
              ) : field.type === "checkbox" ? (
                <div className="inline-flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={Boolean(formValues[field.name])}
                    onChange={(event) => updateField(field.name, event.target.checked)}
                    className="h-5 w-5 rounded border-[3px] border-black"
                  />
                  <span className="text-sm">Enabled</span>
                </div>
              ) : (
                <input
                  type={field.type === "number" ? "number" : "text"}
                  value={String(formValues[field.name] ?? "")}
                  onChange={(event) =>
                    updateField(
                      field.name,
                      field.type === "number"
                        ? Number(event.target.value)
                        : event.target.value
                    )
                  }
                  className="editable-field"
                  placeholder={field.placeholder}
                />
              )}
              {field.media ? (
                <MediaUploadField
                  onUploaded={(value) => updateField(field.name, value)}
                />
              ) : null}
            </label>
          ))}

          <button
            type="submit"
            className="rounded-full border-[3px] border-black bg-ink px-6 py-3 text-sm uppercase tracking-[0.25em] text-paper"
          >
            {selectedItem ? "Update Entry" : "Create Entry"}
          </button>
        </form>
      </section>
    </div>
  );
}
