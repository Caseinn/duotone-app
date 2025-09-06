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
  const shouldShowImage = currentFile?.filteredPreview;

const getDimensionsText = () => {
  if (!currentFile) return null;
  const { file, preview } = currentFile;
  if (!file || !(file instanceof File)) return null;

  const previewUrl = preview || null;

  return new Promise<string>((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve(`${img.width} × ${img.height}`);
    };
    img.onerror = () => resolve("Unknown size");

    if (previewUrl) {
      img.src = previewUrl;
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          img.src = e.target.result as string;
        } else {
          resolve("Unknown size");
        }
      };
      reader.onerror = () => resolve("Unknown size");
      reader.readAsDataURL(file); // ✅ Safe — file is already checked
    }
  });
};

  const [dimensions, setDimensions] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (currentFile?.preview && currentFile.file instanceof File) {
      setDimensions("Loading...");
      if (currentFile && typeof getDimensionsText === "function") {
        getDimensionsText()?.then(setDimensions);
      }
    } else {
      setDimensions(null);
    }
  }, [currentFile?.preview]);

  return (
    <div className="flex flex-col gap-3 w-full h-full">
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        data-dragging={isDragging || undefined}
        className="relative flex flex-col items-center justify-center h-full w-full rounded-xl border-2 border-dashed border-input p-6 transition-colors data-[dragging=true]:bg-primary/10 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/50"
      >
        <input {...getInputProps()} className="sr-only" aria-label="Upload image file" />

        {currentFile ? (
          <>
            <button
              type="button"
              aria-label="Remove uploaded image"
              onClick={() => removeFile(currentFile.id)}
              className="absolute top-3 right-3 z-50 flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
            >
              <XIcon className="h-5 w-5" aria-hidden="true" />
            </button>

            <div className="w-full max-w-[500px] h-[300px] mx-auto rounded-lg bg-muted relative overflow-hidden">
              <div
                className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-300 ease-in-out ${
                  isProcessing ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                <Loader2Icon className="h-10 w-10 text-primary animate-spin mb-2" />
                <p className="text-sm text-muted-foreground">Applying duotone filter...</p>
              </div>

              {shouldShowImage && (
                <img
                  src={shouldShowImage}
                  alt={currentFile.file.name || "Filtered image"}
                  className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ease-in-out ${
                    isProcessing ? "opacity-0" : "opacity-100"
                  }`}
                  draggable={false}
                />
              )}

              {!isProcessing && !shouldShowImage && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-sm text-muted-foreground">Preview not available</p>
                </div>
              )}
            </div>

            {(currentFile.preview || shouldShowImage) && (
              <div className="mt-3 text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400 font-mono tracking-wide">
                  {currentFile.file.name} • {dimensions || "Loading..."}
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div
              className="bg-gradient-to-br from-[#f784c5] to-[#1b602f] flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 dark:border-gray-600"
              aria-hidden="true"
            >
              <ImageIcon className="h-6 w-6 text-white" />
            </div>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Drop your image here
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              PNG, JPG or WEBP (max. {maxSizeMB}MB)
            </p>
            <Button
              variant="outline"
              className="mt-3 bg-gradient-to-br from-[#f784c5] to-[#1b602f] text-white hover:text-white group transition-all duration-200"
              onClick={openFileDialog}
            >
              <UploadIcon
                className="-ml-1 h-5 w-5 text-white group-hover:text-white transition-colors"
                aria-hidden="true"
              />
              Select Image
            </Button>
          </div>
        )}
      </div>

      {errors.length > 0 && (
        <div
          className="text-destructive flex items-center gap-2 text-xs mt-3 animate-in fade-in-0 zoom-in-95 duration-200"
          role="alert"
        >
          <AlertCircleIcon className="h-4 w-4" />
          <span>{errors[0]}</span>
        </div>
      )}

      {shouldShowImage && (
        <div className="mt-4 flex justify-center animate-in fade-in duration-300">
          <Button
            variant="default"
            className="bg-gradient-to-br from-[#f784c5] to-[#1b602f] text-white hover:text-white px-6 py-2 rounded-lg shadow-md hover:shadow-lg transform transition-all duration-200 hover:-translate-y-0.5"
            onClick={() => {
              const link = document.createElement("a");
              link.href = shouldShowImage;
              link.download = currentFile.file.name.replace(/\.[^/.]+$/, "") + "-duotone.png";
              link.click();
            }}
          >
            Download Image (PNG)
          </Button>
        </div>
      )}
    </div>
  );
}