"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface CompanyAvatarProps {
  domain: string | undefined;
  companyName: string | undefined;
  size?: number;
}

export default function CompanyAvatar({
  domain,
  companyName,
  size = 44,
}: CompanyAvatarProps) {
  const [hasError, setHasError] = useState(false);
  const initialLetter = companyName ? companyName.charAt(0).toUpperCase() : "?";
  const logoDomain = domain?.replace(/^https?:\/\//, "");

  if (!logoDomain || hasError) {
    return (
      <div
        style={{ width: size, height: size, fontSize: `${size * 0.45}px` }}
        className="flex items-center justify-center font-bold text-white bg-blue-600 rounded-md"
      >
        {initialLetter}
      </div>
    );
  }

  return (
    <Image
      src={`https://logos.hunter.io/${logoDomain}`}
      alt={`${companyName} logo`}
      width={size}
      height={size}
      className="object-contain rounded-md"
      unoptimized
      onError={() => setHasError(true)}
    />
  );
}
