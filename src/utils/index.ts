import { toBlob } from "html-to-image";
import { fromBlob } from "image-resize-compress";

export const divToBlob = async (ref: HTMLDivElement) => {
  const blob = await toBlob(ref, {
    quality: 1,
  });
  return blob;
};

//This seems not to work
export const compressBlob = async (
  maxSize: number,
  blob: Blob
): Promise<Blob> => {
  //check blob size
  const size = blob.size;
  if (size < maxSize) {
    //compress not needed
    return blob;
  }
  //compress
  const quality = (maxSize / size) * 0.95;

  const compressedBlob = await fromBlob(blob, 0.8, 0, 0);
  //check compressed blob size
  if (compressedBlob.size > maxSize) {
    console.log(
      "compressedBlob.size is still bigger than 1MB: ",
      compressedBlob.size / 1024 / 1024,
      "MB",
      "quality: ",
      quality
    );
    //recursively compress until size is less than maxSize
    return compressBlob(maxSize, compressedBlob);
  }
  return compressedBlob;
};
