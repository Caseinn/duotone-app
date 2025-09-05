import { AlertCircleIcon, ImageIcon, UploadIcon, XIcon } from "lucide-react";
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

  const previewUrl = files[0]?.filteredPreview || files[0]?.preview || null;

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

        {previewUrl ? (
          <>
            <button
              type="button"
              aria-label="Remove uploaded image"
              onClick={() => removeFile(files[0]?.id)}
              className="absolute top-3 right-3 z-50 flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <XIcon className="h-5 w-5" aria-hidden="true" />
            </button>

            <div className="w-full max-w-[500px] h-[300px] mx-auto rounded-lg overflow-hidden">
              <img
                src={previewUrl}
                alt={files[0]?.file?.name || "Uploaded image"}
                className="w-full h-full object-contain"
                draggable={false}
              />
            </div>
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
              className="mt-3 bg-gradient-to-br from-[#f784c5] to-[#1b602f] text-white hover:text-gray-300 group"
              onClick={openFileDialog}
            >
              <UploadIcon
                className="-ml-1 h-5 w-5 text-white group-hover:text-gray-300"
                aria-hidden="true"
              />
              Select Image
            </Button>
          </div>
        )}
      </div>

      {errors.length > 0 && (
        <div
          className="text-destructive flex items-center gap-2 text-xs mt-3"
          role="alert"
        >
          <AlertCircleIcon className="h-4 w-4" />
          <span>{errors[0]}</span>
        </div>
      )}
    </div>
  );
}
