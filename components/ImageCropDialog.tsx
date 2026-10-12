"use client";

import { useEffect, useRef, useState } from "react";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  type Crop,
  type PixelCrop,
} from "react-image-crop";

import "react-image-crop/dist/ReactCrop.css";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { FileWithPreview } from "@/hooks/use-file-upload";

interface ImageCropDialogProps {
  file: FileWithPreview | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCropComplete: (croppedFile: File) => void;
}

export function ImageCropDialog({
  file,
  open,
  onOpenChange,
  onCropComplete,
}: ImageCropDialogProps) {
  const imageRef = useRef<HTMLImageElement | null>(null);

  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();

  useEffect(() => {
    if (!open) {
      setCrop(undefined);
      setCompletedCrop(undefined);
    }
  }, [open]);

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = event.currentTarget;

    const size = Math.min(width, height);

    const initialCrop = centerCrop(
      makeAspectCrop(
        {
          unit: "px",
          width: size,
        },
        1,
        width,
        height,
      ),
      width,
      height,
    );

    setCrop(initialCrop);
  };

  const handleCrop = async () => {
    if (
      !completedCrop ||
      !imageRef.current ||
      !file ||
      !(file.file instanceof File)
    ) {
      return;
    }

    const image = imageRef.current;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const canvas = document.createElement("canvas");

    const outputSize = 512;

    canvas.width = outputSize;
    canvas.height = outputSize;

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return;
    }

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      outputSize,
      outputSize,
    );

    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(resolve, "image/jpeg", 0.9);
    });

    if (!blob) {
      return;
    }

    const croppedFile = new File(
      [blob],
      file.file.name.replace(/\.[^/.]+$/, "") + "-cropped.jpg",
      {
        type: "image/jpeg",
        lastModified: Date.now(),
      },
    );

    onCropComplete(croppedFile);
  };

  if (!file) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Crop your avatar</DialogTitle>
        </DialogHeader>

        <div className="flex max-h-[65vh] justify-center overflow-hidden rounded-lg">
          <ReactCrop
            crop={crop}
            onChange={(newCrop) => setCrop(newCrop)}
            onComplete={(newCrop) => setCompletedCrop(newCrop)}
            aspect={1}
            circularCrop
            keepSelection
          >
            <img
              ref={imageRef}
              src={file.preview}
              alt="Crop avatar"
              onLoad={handleImageLoad}
              className="max-h-[60vh] max-w-full object-contain"
            />
          </ReactCrop>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>

          <Button type="button" onClick={handleCrop} disabled={!completedCrop}>
            Crop & Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
