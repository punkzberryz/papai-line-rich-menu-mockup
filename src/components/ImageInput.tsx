"use client";

import { Image } from "lucide-react";
import { useState } from "react";

interface Props {
  inputId: string;
  children: React.ReactNode;
  setImage: (image: File | null) => void;
  disabled: boolean;
}
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
// const MAX_IMAGE_SIZE = 200e3; // 5MB
export default function ImageInput({
  children,
  inputId,
  setImage,
  disabled,
}: Props) {
  const [imagePath, setImagePath] = useState<string | null>(null);
  const [error, setError] = useState(false);
  return (
    <>
      <div className="w-[500px] border-2 border-dotted border-[#9D97B5] h-auto rounded-xl overflow-hidden  py-3 px-5">
        {children}
        <input
          className="sr-only"
          id={inputId}
          hidden
          type="file"
          accept="image/*"
          disabled={disabled}
          onChange={({ target: { files } }) => {
            setError(false);
            if (!files || files?.length === 0) return;
            const file = files[0];
            if (file.size > MAX_IMAGE_SIZE) {
              setError(true);
              setImagePath(null);
              return;
            }
            setImagePath(URL.createObjectURL(file));
            setImage(file);
          }}
        />
        <label className="flex flex-col items-start" htmlFor={inputId}>
          {imagePath ? (
            <img src={imagePath} />
          ) : (
            <Image color="#6acdc2" size={60} />
          )}
        </label>
      </div>
      {error && (
        <p className="font-semibold text-red-400">ขนาดรูปต้องไม่เกิน 5MB</p>
      )}
    </>
  );
}
