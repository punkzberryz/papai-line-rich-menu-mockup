"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ActiveElement } from "../types";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ShapesMenuProps {
  item: {
    name: string;
    icon: string;
    value: Array<ActiveElement>;
  };
  activeElement: ActiveElement;
  handleActiveElement: (element: ActiveElement) => void;
  imageInputRef: React.MutableRefObject<HTMLInputElement | null>;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export const ShapesMenu = ({
  item,
  activeElement,
  handleActiveElement,
  handleImageUpload,
  imageInputRef,
}: ShapesMenuProps) => {
  const isDropdownElem = item.value.some(
    (elem) => elem?.value === activeElement.value
  );

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="relative h-5 w-5 object-contain"
            onClick={() =>
              handleActiveElement({
                icon: item.icon,
                name: item.name,
                value: item.value.toString(),
              })
            }
          >
            <Image
              src={isDropdownElem ? activeElement.icon : item.icon}
              alt={item.name}
              fill
              className={isDropdownElem ? "invert" : ""}
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mt-5 flex flex-col gap-y-1 border-none bg-primary-black py-4 text-white">
          {item.value.map((el) => (
            <Button
              key={el.name}
              onClick={() => handleActiveElement(el)}
              className={`flex h-fit justify-between gap-10 rounded-none px-5 py-3 focus:border-none ${
                activeElement.value === el.value
                  ? "bg-primary-green"
                  : "hover:bg-primary-grey-200"
              }`}
            >
              <div className="group flex items-center gap-2">
                <Image
                  src={el.icon as string}
                  alt={el.name as string}
                  width={20}
                  height={20}
                  className={activeElement.value === el.value ? "invert" : ""}
                />
                <p
                  className={`text-sm  ${
                    activeElement.value === el.value
                      ? "text-primary-black"
                      : "text-white"
                  }`}
                >
                  {el.name}
                </p>
              </div>
            </Button>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <input
        type="file"
        className="hidden"
        ref={imageInputRef}
        accept="image/*"
        onChange={handleImageUpload}
      />
    </>
  );
};
