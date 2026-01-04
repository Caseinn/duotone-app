import * as React from "react";
import { AlertCircleIcon, ImageIcon, UploadIcon, XIcon, Loader2Icon } from "lucide-react";
import { useFileUpload } from "@/hooks/use-file-upload";
import { Button } from "@/components/ui/button";

export default function FileUpload() {
  const maxSizeMB = 25;
  const maxSize = maxSizeMB * 1024 * 1024;

  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      getInputProps,
    },
  ] = useFileUpload({
    accept: "image/png,image/jpeg,image/jpg,image/webp",
    maxSize,
  });

  const currentFile = files[0];
  const isProcessing = currentFile?.isLoading;
  const filteredImage = currentFile?.filteredPreview;
  const displayImage = filteredImage || currentFile?.preview;

  const getDimensionsText = React.useCallback((file: File, previewUrl?: string) => {
    return new Promise<string>((resolve) => {
      const img = new Image();
      img.onload = () => {
        resolve(`${img.width} x ${img.height}`);
      };
      img.onerror = () => resolve("Unknown size");

      if (previewUrl) {
        img.src = previewUrl;
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          img.src = e.target.result as string;
        } else {
          resolve("Unknown size");
        }
      };
      reader.onerror = () => resolve("Unknown size");
      reader.readAsDataURL(file);
    });
  }, []);

  const [dimensions, setDimensions] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (currentFile?.file instanceof File) {
      setDimensions("Loading...");
      getDimensionsText(currentFile.file, displayImage).then(setDimensions);
    } else {
      setDimensions(null);
    }
  }, [currentFile?.file, displayImage, getDimensionsText]);

  return (
    <div className="flex h-full w-full flex-col gap-5 sm:gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3 text-[0.55rem] uppercase tracking-[0.2em] text-white sm:text-[0.65rem] sm:tracking-[0.35em] md:text-[0.7rem] md:tracking-[0.4em] lg:text-[0.75rem] lg:tracking-[0.45em]">
        <span className="font-[var(--font-display)]">Input 01</span>
        <span className="hidden font-[var(--font-display)] sm:inline">{maxSizeMB}MB max</span>
      </div>

      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        data-dragging={isDragging || undefined}
        className="relative flex min-h-[240px] w-full flex-1 flex-col items-center justify-center rounded-2xl border border-white/20 bg-card p-4 transition-colors data-[dragging=true]:border-[#00C853] data-[dragging=true]:bg-[#00C853]/10 sm:min-h-[320px] sm:p-5 md:min-h-[360px] md:p-6 lg:min-h-[380px] lg:p-7"
      >
        <input {...getInputProps()} className="sr-only" aria-label="Upload image file" />

        {currentFile ? (
          <>
            <button
              type="button"
              aria-label="Remove uploaded image"
              onClick={() => removeFile(currentFile.id)}
              className="cursor-pointer absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white transition hover:bg-black/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00C853] sm:h-9 sm:w-9"
            >
              <XIcon className="h-4 w-4" aria-hidden="true" />
            </button>

            <div className="w-full max-w-[440px] sm:max-w-[520px] md:max-w-[560px] lg:max-w-[620px]">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/15 bg-black/40">
                <div
                  className={`absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 transition-opacity duration-300 ${
                    isProcessing ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                >
                  <Loader2Icon className="h-7 w-7 text-[#FF2E63] animate-spin sm:h-8 sm:w-8 md:h-9 md:w-9" />
                  <p className="text-[0.65rem] uppercase tracking-[0.3em] text-white/70 sm:text-xs md:text-sm">
                    Filtering
                  </p>
                </div>

                {displayImage && (
                  <img
                    src={displayImage}
                    alt={currentFile.file.name || "Filtered image"}
                    className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-300 ${
                      isProcessing ? "opacity-40" : "opacity-100"
                    }`}
                    draggable={false}
                  />
                )}

                {!displayImage && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-[0.65rem] uppercase tracking-[0.3em] text-white/60 sm:text-xs md:text-sm">
                      Preview unavailable
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-4 flex flex-col items-start gap-1 text-[0.6rem] uppercase tracking-[0.18em] text-white/70 sm:flex-row sm:items-center sm:justify-between sm:gap-2 sm:text-[0.65rem] sm:tracking-[0.28em] md:text-[0.7rem] md:tracking-[0.3em]">
                <span className="w-full truncate font-[var(--font-mono)] normal-case tracking-normal sm:max-w-[60%] md:max-w-[65%]">
                  {currentFile.file.name}
                </span>
                <span className="w-full whitespace-nowrap font-[var(--font-mono)] normal-case tracking-normal sm:w-auto">
                  {dimensions || "Loading..."}
                </span>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center gap-5 text-center">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/30"
              aria-hidden="true"
            >
              <ImageIcon className="h-5 w-5 text-white/70 sm:h-6 sm:w-6 md:h-7 md:w-7" />
            </div>
            <div className="space-y-2 sm:space-y-3">
              <p className="text-[0.6rem] uppercase tracking-[0.2em] text-white sm:text-[0.7rem] sm:tracking-[0.3em] md:text-[0.8rem]">
                Drop image here
              </p>
              <p className="font-[var(--font-display)] text-lg uppercase text-white sm:text-2xl md:text-3xl lg:text-[2.4rem]">
                Local only
              </p>
              <p className="text-[0.55rem] uppercase tracking-[0.25em] text-white/50 sm:text-[0.65rem] md:text-[0.7rem]">
                PNG / JPG / WEBP
              </p>
            </div>
            <Button
              variant="default"
              className="cursor-pointer h-11 w-full rounded-full bg-[#FF2E63] px-6 text-[0.6rem] font-[var(--font-display)] uppercase tracking-[0.2em] text-white hover:bg-[#e62856] sm:w-auto sm:text-[0.65rem] sm:tracking-[0.35em] md:text-[0.7rem] md:tracking-[0.35em] lg:text-[0.75rem] lg:tracking-[0.4em]"
              onClick={openFileDialog}
            >
              <UploadIcon className="-ml-1 h-4 w-4 text-white" aria-hidden="true" />
              Browse File
            </Button>
          </div>
        )}
      </div>

      <div className="grid gap-3">
        <div className="flex flex-col items-start gap-2 text-[0.6rem] uppercase tracking-[0.2em] text-white sm:flex-row sm:items-center sm:justify-between sm:text-[0.65rem] sm:tracking-[0.3em] md:text-[0.7rem] md:tracking-[0.32em] lg:text-[0.75rem] lg:tracking-[0.36em]">
          <span className="font-[var(--font-display)]">Gradient map</span>
          <span className="hidden font-[var(--font-mono)] sm:inline">#FF784C5 - #1B602F</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full border border-white/15 bg-black/40">
          <div className="h-full w-full bg-gradient-to-r from-[#f784c5] to-[#1b602f]" />
        </div>
      </div>

      {errors.length > 0 && (
        <div
          className="flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.2em] text-[#FF2E63] sm:text-[0.65rem] sm:tracking-[0.3em] md:text-[0.7rem] md:tracking-[0.35em] lg:text-[0.75rem] lg:tracking-[0.38em]"
          role="alert"
        >
          <AlertCircleIcon className="h-4 w-4" />
          <span>{errors[0]}</span>
        </div>
      )}

      {filteredImage && currentFile && (
        <div className="flex flex-col items-start justify-between gap-3 rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-[0.6rem] uppercase tracking-[0.2em] text-white sm:flex-row sm:items-center sm:text-[0.65rem] sm:tracking-[0.3em] md:text-[0.7rem] md:tracking-[0.35em] lg:text-[0.75rem] lg:tracking-[0.38em]">
          <span className="font-[var(--font-display)]">Output: PNG</span>
          <Button
            variant="default"
            className="cursor-pointer h-10 w-full rounded-full bg-[#00C853] px-5 text-[0.55rem] font-[var(--font-display)] uppercase tracking-[0.25em] text-[#081C15] hover:bg-[#00b64b] sm:w-auto sm:text-[0.6rem] sm:tracking-[0.32em] md:text-[0.65rem] md:tracking-[0.35em] lg:text-[0.7rem] lg:tracking-[0.4em]"
            onClick={() => {
              const link = document.createElement("a");
              link.href = filteredImage;
              link.download =
                currentFile.file.name.replace(/\.[^/.]+$/, "") + "-duotone.png";
              link.click();
            }}
          >
            Download PNG
          </Button>
        </div>
      )}
    </div>
  );
}
