"use client";

import { useMemo, useState } from "react";
import { Pencil, Plus, Trash2, Check, X } from "lucide-react";

import {
  resourceConfigs,
  type ResourceFormValues
} from "@/lib/admin-config";
import type { AdminResourceKey } from "@/lib/types";
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
  const [status, setStatus] = useState<{ type: "idle" | "saving" | "saved" | "error"; msg: string }>({
    type: "idle",
    msg: ""
  });

  const selectedItem = useMemo(
    () => items.find((item) => item.id === selectedId) ?? null,
    [items, selectedId]
  );

  function startCreate() {
    setSelectedId(null);
    setFormValues(config.createEmpty());
    setStatus({ type: "idle", msg: "" });
  }

  function startEdit(item: Record<string, unknown>) {
    setSelectedId(String(item.id));
    setFormValues(config.toFormValues(item as never));
    setStatus({ type: "idle", msg: "" });
  }

  function updateField(name: string, value: string | number | boolean) {
    setFormValues((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ type: "saving", msg: "SAVING..." });
    const payload = config.toPayload(formValues);
    const endpoint = selectedId
      ? `/api/admin/${resource}/${selectedId}`
      : `/api/admin/${resource}`;
    const method = selectedId ? "PATCH" : "POST";

    const response = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      setStatus({ type: "error", msg: "SAVE FAILED" });
      return;
    }

    const data = (await response.json()) as Record<string, unknown>;
    setItems((current) => {
      if (selectedId) return current.map((item) => (item.id === selectedId ? data : item));
      return [data, ...current];
    });
    setSelectedId(String(data.id));
    setFormValues(config.toFormValues(data as never));
    setStatus({ type: "saved", msg: "SAVED" });
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this entry?")) return;
    const response = await fetch(`/api/admin/${resource}/${id}`, { method: "DELETE" });
    if (!response.ok) {
      setStatus({ type: "error", msg: "DELETE FAILED" });
      return;
    }
    setItems((current) => current.filter((item) => item.id !== id));
    if (selectedId === id) startCreate();
    setStatus({ type: "saved", msg: "DELETED" });
  }

  return (
    <div className="grid h-full gap-6 xl:grid-cols-[1fr_1.1fr]">
      {/* ── Item List ── */}
      <section className="flex flex-col gap-6">
        {/* List header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-[3px] border-true-black bg-paper-white p-6 neo-shadow">
          <div>
            <p className="font-body text-label-mono uppercase text-on-surface-variant">MANAGER</p>
            <h1 className="mt-1 font-display text-headline-md uppercase leading-none text-true-black">
              {config.title}
            </h1>
          </div>
          <button
            type="button"
            onClick={startCreate}
            className="flex w-full sm:w-auto items-center justify-center gap-2 border-[3px] border-true-black bg-true-black px-6 py-3 sm:px-4 sm:py-3 font-body text-label-mono uppercase text-paper-white neo-shadow-sm transition-all hover:bg-secondary-container hover:text-true-black active:translate-x-1 active:translate-y-1 active:shadow-none"
          >
            <Plus className="h-4 w-4" />
            NEW
          </button>
        </div>

        {/* Item cards */}
        <div className="space-y-4">
          {items.length === 0 && (
            <div className="border-[3px] border-dashed border-true-black/30 bg-surface-container p-12 text-center">
              <p className="font-body text-label-mono uppercase text-on-surface-variant">
                NO ENTRIES YET. CREATE THE FIRST ONE.
              </p>
            </div>
          )}
          {items.map((item) => {
            const card = config.toCard(item as never);
            const isSelected = selectedId === item.id;
            return (
              <article
                key={String(item.id)}
                className={`border-[3px] border-true-black bg-paper-white p-5 transition-all ${
                  isSelected ? "neo-shadow bg-surface-container-high" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <h2 className="truncate font-display text-headline-md uppercase leading-none text-true-black">
                      {card.title}
                    </h2>
                    <p className="mt-1 truncate font-body text-label-mono uppercase text-on-surface-variant">
                      {card.subtitle}
                    </p>
                  </div>
                  <div className="flex flex-shrink-0 gap-2">
                    <button
                      type="button"
                      onClick={() => startEdit(item)}
                      className="border-[3px] border-true-black bg-paper-white p-2 transition-all hover:bg-secondary-container neo-shadow-sm active:translate-x-1 active:translate-y-1 active:shadow-none"
                      title="Edit"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(String(item.id))}
                      className="border-[3px] border-true-black bg-primary-container p-2 text-paper-white neo-shadow-sm transition-all hover:bg-true-black active:translate-x-1 active:translate-y-1 active:shadow-none"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {card.badges.map((badge) => (
                    <span
                      key={badge}
                      className={`border-[3px] border-true-black px-3 py-1 font-body text-label-mono uppercase ${
                        badge === "active"
                          ? "bg-true-black text-paper-white"
                          : badge === "draft"
                          ? "bg-surface-container text-on-surface-variant"
                          : "bg-surface-container-high text-on-surface"
                      }`}
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

      {/* ── Form Panel ── */}
      <section className="border-[3px] border-true-black bg-paper-white neo-shadow">
        {/* Form header */}
        <div className={`border-b-[3px] border-true-black px-6 py-5 ${selectedItem ? "bg-secondary-container" : "bg-true-black"}`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className={`font-body text-label-mono uppercase ${selectedItem ? "text-true-black" : "text-paper-white/60"}`}>
                {selectedItem ? "EDITING ENTRY" : "NEW ENTRY"}
              </p>
              <h2 className={`mt-1 font-display text-headline-md uppercase leading-none ${selectedItem ? "text-true-black" : "text-paper-white"}`}>
                {selectedItem ? "UPDATE DATA" : "CREATE DATA"}
              </h2>
            </div>

            {/* Status badge */}
            {status.msg && (
              <div className={`flex items-center gap-2 border-[3px] px-3 py-2 font-body text-label-mono uppercase ${
                status.type === "saved"
                  ? "border-true-black bg-paper-white text-true-black"
                  : status.type === "error"
                  ? "border-paper-white bg-primary-container text-paper-white"
                  : "border-paper-white/30 bg-paper-white/10 text-paper-white"
              }`}>
                {status.type === "saved" && <Check className="h-3 w-3" />}
                {status.type === "error" && <X className="h-3 w-3" />}
                {status.msg}
              </div>
            )}
          </div>
        </div>

        {/* Form body */}
        <form onSubmit={handleSubmit} className="grid gap-5 p-6 md:grid-cols-2">
          {config.fields.map((field) => (
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
                  className="neo-input min-h-[100px] w-full resize-y px-4 py-3 font-body text-body-md text-on-surface normal-case"
                  placeholder={field.placeholder}
                />
              ) : field.type === "checkbox" ? (
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-6 w-6 cursor-pointer items-center justify-center border-[3px] border-true-black transition-colors ${
                      Boolean(formValues[field.name]) ? "bg-true-black" : "bg-paper-white"
                    }`}
                    onClick={() => updateField(field.name, !Boolean(formValues[field.name]))}
                  >
                    {Boolean(formValues[field.name]) && (
                      <Check className="h-4 w-4 text-paper-white" />
                    )}
                  </div>
                  <span className="font-body text-body-md text-on-surface">
                    {Boolean(formValues[field.name]) ? "Enabled" : "Disabled"}
                  </span>
                </div>
              ) : (
                <input
                  type={field.type === "number" ? "number" : "text"}
                  value={String(formValues[field.name] ?? "")}
                  onChange={(e) =>
                    updateField(
                      field.name,
                      field.type === "number" ? Number(e.target.value) : e.target.value
                    )
                  }
                  className="neo-input w-full px-4 py-3 font-body text-body-md text-on-surface normal-case"
                  placeholder={field.placeholder}
                />
              )}

              {field.media && (
                <MediaUploadField onUploaded={(val) => updateField(field.name, val)} />
              )}
            </label>
          ))}

          {/* Submit */}
          <div className="flex flex-col sm:flex-row gap-4 md:col-span-2 w-full">
            <button
              type="submit"
              className="flex w-full sm:w-auto items-center justify-center gap-2 border-[3px] border-true-black bg-true-black px-6 py-4 font-display text-headline-md uppercase text-paper-white neo-shadow transition-all hover:bg-primary-container active:translate-x-1 active:translate-y-1 active:shadow-none"
            >
              <Check className="h-5 w-5" />
              {selectedItem ? "UPDATE ENTRY" : "CREATE ENTRY"}
            </button>
            {selectedItem && (
              <button
                type="button"
                onClick={startCreate}
                className="w-full sm:w-auto border-[3px] border-true-black bg-surface-container px-6 py-4 font-display text-headline-md uppercase text-true-black neo-shadow-sm transition-all hover:bg-secondary-container active:translate-x-1 active:translate-y-1 active:shadow-none"
              >
                NEW
              </button>
            )}
          </div>
        </form>
      </section>
    </div>
  );
}
