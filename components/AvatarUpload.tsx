"use client";

import { useEffect, useState } from "react";

import {
  formatBytes,
  useFileUpload,
  type FileWithPreview,
} from "@/hooks/use-file-upload";

import { cn } from "cn";
import { Button } from "@/components/ui/button";
import { UserIcon, XIcon } from "lucide-react";
import { ImageCropDialog } from "@/components/ImageCropDialog";

interface AvatarUploadProps {
  maxSize?: number;
  className?: string;
  onFileChange?: (file: FileWithPreview | null) => void;
  defaultAvatar?: string;
}

export function AvatarUpload({
  maxSize = 2 * 1024 * 1024,
  className,
  onFileChange,
  defaultAvatar,
}: AvatarUploadProps) {
  const [cropFile, setCropFile] = useState<FileWithPreview | null>(null);

  const [
    { files, isDragging },
    {
      removeFile,
      replaceFile,
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      getInputProps,
    },
  ] = useFileUpload({
    maxFiles: 1,
    maxSize,
    accept: "image/*",
    multiple: false,

    // Open the crop dialog when a new file is selected.
    onFilesAdded: (addedFiles) => {
      const file = addedFiles[0];

      if (file) {
        setCropFile(file);
      }
    },
  });

  const currentFile = files[0];
  const previewUrl = currentFile?.preview || defaultAvatar;

  // Notify the parent when the selected file changes.
  // Only forward cropped files, not the original image.
  useEffect(() => {
    const file = files[0];

    if (!file) {
      onFileChange?.(null);
      return;
    }

    if (file.file instanceof File && file.file.name.endsWith("-cropped.jpg")) {
      onFileChange?.(file);
    }
  }, [files, onFileChange]);

  const handleRemove = () => {
    if (currentFile) {
      removeFile(currentFile.id);
    }
  };

  const handleCropComplete = (croppedFile: File) => {
    if (!cropFile) return;

    replaceFile(cropFile.id, croppedFile);
    setCropFile(null);
  };

  const handleCropDialogChange = (open: boolean) => {
    if (open) return;

    const pendingFile = cropFile;

    setCropFile(null);

    // Remove the original image if cropping is cancelled.
    if (pendingFile) {
      removeFile(pendingFile.id);
    }
  };

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      {/* Avatar preview */}
      <div className="relative">
        <div
          className={cn(
            "group/avatar relative h-24 w-24 cursor-pointer overflow-hidden rounded-full border border-dashed transition-colors",
            isDragging
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25 hover:border-muted-foreground/20",
            previewUrl && "border-solid",
          )}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={openFileDialog}
        >
          <input {...getInputProps()} className="sr-only" />

          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Avatar"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <UserIcon className="text-muted-foreground size-6" />
            </div>
          )}
        </div>

        {/* Remove button */}
        {currentFile && (
          <Button
            type="button"
            size="icon"
            variant="outline"
            onClick={handleRemove}
            className="absolute inset-e-0.5 top-0.5 z-10 size-6 rounded-full dark:bg-zinc-800 hover:dark:bg-zinc-700"
            aria-label="Remove avatar"
          >
            <XIcon className="size-3.5" />
          </Button>
        )}
      </div>

      {/* Upload instructions */}
      <div className="space-y-0.5 text-center">
        <p className="text-sm font-medium">
          {currentFile ? "Avatar selected" : "Upload avatar"}
        </p>

        <p className="text-muted-foreground text-xs">
          PNG, JPG up to {formatBytes(maxSize)}
        </p>
      </div>

      {/* Crop dialog */}
      <ImageCropDialog
        file={cropFile}
        open={Boolean(cropFile)}
        onOpenChange={handleCropDialogChange}
        onCropComplete={handleCropComplete}
      />
    </div>
  );
}
