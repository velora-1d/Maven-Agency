"use client";

import { useRef, useState } from "react";
import { Upload } from "lucide-react";

type MediaUploadFieldProps = {
  onUploaded: (value: string) => void;
};

export function MediaUploadField({ onUploaded }: MediaUploadFieldProps) {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [status, setStatus] = useState("");

  async function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setStatus("Uploading...");
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData
    });

    if (!response.ok) {
      setStatus("Upload failed");
      return;
    }

    const data = (await response.json()) as { url: string };
    onUploaded(data.url);
    setStatus("Uploaded");
  }

  return (
    <div className="mt-3 flex flex-wrap items-center gap-3">
      <input
        ref={fileRef}
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleUpload}
      />
      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        className="inline-flex items-center gap-2 rounded-full border-[3px] border-black bg-sky px-4 py-2 text-xs uppercase tracking-[0.2em]"
      >
        <Upload className="h-4 w-4" />
        Upload
      </button>
      {status ? <span className="text-xs uppercase tracking-[0.2em]">{status}</span> : null}
    </div>
  );
}
