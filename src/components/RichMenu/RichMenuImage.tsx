"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";

interface RichMenuImageProps {
  richMenuId: string;
  channelToken: string;
}
const RichMenuImage = ({ channelToken, richMenuId }: RichMenuImageProps) => {
  const [imgUrl, setImgUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    fetch(`/api/richmenu/${richMenuId}/image`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${channelToken}`,
        "Content-Type": "image/*",
      },
    })
      .then((resp) => resp.blob())
      .catch((err) => console.log(err))
      .then((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        setImgUrl(url);
      })
      .catch((err) => {
        console.log("error when getting richmenu image: ");
        console.error(err);
      })
      .finally(() => setIsLoading(false));
    return () => URL.revokeObjectURL(imgUrl);
  }, []);

  return (
    <div>
      {isLoading ? <Skeleton className="w-full h-[200px]" /> : null}
      {imgUrl ? (
        <Image
          className="w-[300px] h-auto"
          src={imgUrl}
          width={0}
          height={0}
          alt="rich menu image"
        />
      ) : null}
    </div>
  );
};

export default RichMenuImage;
