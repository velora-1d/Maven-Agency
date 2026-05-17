"use client";

import { useRef, useState, useEffect } from "react";
import { Upload, Check, X, ZoomIn, Move } from "lucide-react";

type MediaUploadFieldProps = {
  value?: string;
  resource?: string;
  onUploaded: (value: string) => void;
};

export function MediaUploadField({ value = "", resource = "", onUploaded }: MediaUploadFieldProps) {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [status, setStatus] = useState("");
  const [cropSource, setCropSource] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string>("image/png");
  const [imgObj, setImgObj] = useState<HTMLImageElement | null>(null);
  const [aspect, setAspect] = useState<number>(
    resource === "portfolio" ? 16 / 9 : resource === "team" ? 4 / 5 : 0
  );
  const [zoom, setZoom] = useState<number>(1);
  const [panX, setPanX] = useState<number>(0);
  const [panY, setPanY] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileType(file.type || "image/png");
    setAspect(resource === "portfolio" ? 16 / 9 : resource === "team" ? 4 / 5 : 0);
    setZoom(1);
    setPanX(0);
    setPanY(0);
    setStatus("");
    setImgObj(null);

    const reader = new FileReader();
    reader.onload = () => {
      setCropSource(reader.result as string);
    };
    reader.readAsDataURL(file);

    event.target.value = "";
  }

  useEffect(() => {
    if (!cropSource) return;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = cropSource;
    img.onload = () => {
      setImgObj(img);
    };
  }, [cropSource]);

  useEffect(() => {
    if (!imgObj || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let targetAspect = aspect;
    if (targetAspect === 0) {
      targetAspect = imgObj.naturalWidth / imgObj.naturalHeight;
    }

    if (targetAspect > 1) {
      canvas.width = 1200;
      canvas.height = Math.round(1200 / targetAspect);
    } else if (targetAspect < 1) {
      canvas.height = 1000;
      canvas.width = Math.round(1000 * targetAspect);
    } else {
      canvas.width = 800;
      canvas.height = 800;
    }

    let sWidth = imgObj.naturalWidth / zoom;
    let sHeight = sWidth / targetAspect;

    if (sHeight > imgObj.naturalHeight / zoom) {
      sHeight = imgObj.naturalHeight / zoom;
      sWidth = sHeight * targetAspect;
    }

    const maxPanX = (imgObj.naturalWidth - sWidth) / 2;
    const maxPanY = (imgObj.naturalHeight - sHeight) / 2;

    const sx = (imgObj.naturalWidth - sWidth) / 2 + (panX / 100) * maxPanX;
    const sy = (imgObj.naturalHeight - sHeight) / 2 + (panY / 100) * maxPanY;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(imgObj, sx, sy, sWidth, sHeight, 0, 0, canvas.width, canvas.height);
  }, [imgObj, aspect, zoom, panX, panY]);

  async function handleCropAndUpload() {
    if (!canvasRef.current || !fileType) return;
    setStatus("Uploading cropped image...");
    setIsUploading(true);

    canvasRef.current.toBlob(
      async (blob) => {
        if (!blob) {
          setStatus("Failed to create image blob");
          setIsUploading(false);
          return;
        }

        const formData = new FormData();
        formData.append("file", new File([blob], `cropped-${Date.now()}.png`, { type: fileType }));

        try {
          const response = await fetch("/api/admin/upload", {
            method: "POST",
            body: formData
          });

          if (!response.ok) {
            setStatus("Upload failed");
            setIsUploading(false);
            return;
          }

          const data = (await response.json()) as { url: string };
          onUploaded(data.url);
          setStatus("Uploaded successfully!");
          setCropSource(null);
          setIsUploading(false);
        } catch (err) {
          console.error("Upload error:", err);
          setStatus("Upload error");
          setIsUploading(false);
        }
      },
      fileType,
      0.9
    );
  }

  return (
    <div className="mt-3 flex flex-col gap-4 border-[3px] border-true-black bg-surface-container-lowest p-5 neo-shadow-sm">
      {/* Header & Upload Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="font-body text-label-mono uppercase text-on-surface-variant">Media Upload</p>
          <p className="font-body text-xs text-on-surface-variant mt-0.5">
            {resource === "portfolio"
              ? "Rasio ideal: 16:9 (Landscape)"
              : resource === "team"
              ? "Rasio ideal: 4:5 (Portrait)"
              : "Format bebas (JPG/PNG/WEBP)"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <input
            ref={fileRef}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileSelect}
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="inline-flex items-center gap-2 border-[3px] border-true-black bg-primary-container text-paper-white px-5 py-2.5 font-display text-label-mono uppercase neo-shadow-sm hover:bg-true-black transition-all active:translate-x-1 active:translate-y-1 active:shadow-none"
          >
            <Upload className="h-4 w-4" />
            {value ? "Ganti Gambar" : "Upload Gambar"}
          </button>
        </div>
      </div>

      {/* PREVIEW GAMBAR DI DASHBOARD */}
      {value ? (
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-t-[3px] border-true-black pt-4 mt-2">
          <div className="relative overflow-hidden border-[3px] border-true-black bg-paper-white neo-shadow-sm w-40 h-28 flex-shrink-0">
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-body text-label-mono uppercase text-true-black">Preview Aktif</p>
            <p className="font-body text-xs text-on-surface-variant truncate mt-1">{value}</p>
            <button
              type="button"
              onClick={() => onUploaded("")}
              className="mt-2 inline-flex items-center gap-1 text-xs font-body uppercase text-primary-container hover:underline"
            >
              Hapus Gambar
            </button>
          </div>
        </div>
      ) : (
        <div className="border-[2px] border-dashed border-true-black/30 bg-surface-container py-6 text-center">
          <p className="font-body text-xs uppercase text-on-surface-variant">Belum ada gambar yang diupload</p>
        </div>
      )}

      {status ? (
        <span className="text-xs uppercase tracking-[0.2em] font-body text-primary-container">
          {status}
        </span>
      ) : null}

      {/* MODAL CROP & ADJUST */}
      {cropSource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-true-black/80 p-4 backdrop-blur-sm">
          <div className="flex w-full max-w-3xl flex-col border-[4px] border-true-black bg-paper-white p-6 neo-shadow max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b-[3px] border-true-black pb-4 mb-6">
              <div>
                <p className="font-body text-label-mono uppercase text-on-surface-variant">Interactive Cropper</p>
                <h3 className="font-display text-headline-md uppercase text-true-black mt-1">
                  ⚡ Sesuaikan &amp; Crop Gambar
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setCropSource(null)}
                className="border-[3px] border-true-black bg-paper-white p-2 hover:bg-primary-container hover:text-paper-white neo-shadow-sm transition-all"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Canvas Live Preview */}
            <div className="mb-6 flex flex-col items-center justify-center bg-surface-container py-4 border-[3px] border-true-black neo-shadow-inner overflow-hidden">
              <p className="font-body text-xs uppercase text-on-surface-variant mb-3">Live Cropped Preview</p>
              <canvas
                ref={canvasRef}
                className="max-h-[40vh] w-auto border-[3px] border-true-black bg-paper-white neo-shadow-sm object-contain"
              />
            </div>

            {/* Controls Grid */}
            <div className="grid gap-6 md:grid-cols-2 border-b-[3px] border-true-black pb-6 mb-6">
              {/* Aspect Ratio Selector */}
              <div className="flex flex-col gap-2">
                <span className="font-body text-label-mono uppercase text-on-surface-variant">Rasio Aspek</span>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => { setAspect(16 / 9); setPanX(0); setPanY(0); setZoom(1); }}
                    className={`border-[3px] border-true-black px-4 py-2 font-body text-label-mono uppercase neo-shadow-sm transition-all ${
                      Math.abs(aspect - 16 / 9) < 0.01 ? "bg-true-black text-paper-white" : "bg-paper-white hover:bg-secondary-container"
                    }`}
                  >
                    16:9 (Landscape)
                  </button>
                  <button
                    type="button"
                    onClick={() => { setAspect(4 / 5); setPanX(0); setPanY(0); setZoom(1); }}
                    className={`border-[3px] border-true-black px-4 py-2 font-body text-label-mono uppercase neo-shadow-sm transition-all ${
                      Math.abs(aspect - 4 / 5) < 0.01 ? "bg-true-black text-paper-white" : "bg-paper-white hover:bg-secondary-container"
                    }`}
                  >
                    4:5 (Portrait)
                  </button>
                  <button
                    type="button"
                    onClick={() => { setAspect(1); setPanX(0); setPanY(0); setZoom(1); }}
                    className={`border-[3px] border-true-black px-4 py-2 font-body text-label-mono uppercase neo-shadow-sm transition-all ${
                      Math.abs(aspect - 1) < 0.01 ? "bg-true-black text-paper-white" : "bg-paper-white hover:bg-secondary-container"
                    }`}
                  >
                    1:1 (Square)
                  </button>
                  <button
                    type="button"
                    onClick={() => { setAspect(0); setPanX(0); setPanY(0); setZoom(1); }}
                    className={`border-[3px] border-true-black px-4 py-2 font-body text-label-mono uppercase neo-shadow-sm transition-all ${
                      aspect === 0 ? "bg-true-black text-paper-white" : "bg-paper-white hover:bg-secondary-container"
                    }`}
                  >
                    Bebas / Asli
                  </button>
                </div>
              </div>

              {/* Sliders */}
              <div className="flex flex-col gap-4">
                <label className="flex flex-col gap-1">
                  <div className="flex justify-between font-body text-label-mono uppercase text-on-surface-variant">
                    <span className="flex items-center gap-1"><ZoomIn className="h-3.5 w-3.5" /> Zoom / Skala</span>
                    <span>{zoom.toFixed(1)}x</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="3"
                    step="0.1"
                    value={zoom}
                    onChange={(e) => setZoom(Number(e.target.value))}
                    className="w-full accent-true-black cursor-pointer"
                  />
                </label>

                <label className="flex flex-col gap-1">
                  <div className="flex justify-between font-body text-label-mono uppercase text-on-surface-variant">
                    <span className="flex items-center gap-1"><Move className="h-3.5 w-3.5" /> Geser Horizontal (X)</span>
                    <span>{panX}%</span>
                  </div>
                  <input
                    type="range"
                    min="-100"
                    max="100"
                    value={panX}
                    onChange={(e) => setPanX(Number(e.target.value))}
                    className="w-full accent-true-black cursor-pointer"
                  />
                </label>

                <label className="flex flex-col gap-1">
                  <div className="flex justify-between font-body text-label-mono uppercase text-on-surface-variant">
                    <span className="flex items-center gap-1"><Move className="h-3.5 w-3.5" /> Geser Vertikal (Y)</span>
                    <span>{panY}%</span>
                  </div>
                  <input
                    type="range"
                    min="-100"
                    max="100"
                    value={panY}
                    onChange={(e) => setPanY(Number(e.target.value))}
                    className="w-full accent-true-black cursor-pointer"
                  />
                </label>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row justify-end gap-4">
              <button
                type="button"
                onClick={() => setCropSource(null)}
                disabled={isUploading}
                className="border-[3px] border-true-black bg-surface-container px-6 py-3 font-display text-label-mono uppercase text-true-black neo-shadow-sm hover:bg-secondary-container transition-all"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleCropAndUpload}
                disabled={isUploading}
                className="flex items-center justify-center gap-2 border-[3px] border-true-black bg-true-black px-8 py-3 font-display text-label-mono uppercase text-paper-white neo-shadow hover:bg-primary-container transition-all active:translate-x-1 active:translate-y-1 active:shadow-none"
              >
                {isUploading ? (
                  <>
                    <span className="animate-spin">⏳</span>
                    MEMPROSES...
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4" />
                    ⚡ CROP &amp; UPLOAD
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
