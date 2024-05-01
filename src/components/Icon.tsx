import { cn } from "@/lib/utils";
import Image from "next/image";
interface IconProps {
  className?: string;
}
export const PapaiLogo = ({ className = "" }: IconProps) => {
  return (
    <Image
      className={cn("h-28 w-auto", className)}
      src="img/rich-menu/papai-logo.svg"
      alt="Papai logo"
      width={0}
      height={0}
    />
  );
};
export const CalendarConfirmedIcon = ({ className = "" }: IconProps) => {
  return (
    <Image
      className={cn("h-28 w-auto", className)}
      src="/img/rich-menu/calendar-confirm.png"
      alt="calendar icon"
      width={200}
      height={200}
    />
  );
};
export const CalendarBookedIcon = ({ className = "" }: IconProps) => {
  return (
    <Image
      className={cn("h-28 w-auto", className)}
      src="/img/rich-menu/calendar-book.png"
      alt="calendar icon"
      width={200}
      height={200}
    />
  );
};
export const ClipboardIcon = ({ className = "" }: IconProps) => {
  return (
    <Image
      className={cn("h-28 w-auto", className)}
      src="/img/rich-menu/calendar-book.png"
      alt="clipboard icon"
      width={200}
      height={200}
    />
  );
};

export const NurseIcon = ({ className = "" }: IconProps) => {
  return (
    <Image
      className={cn("h-28 w-auto", className)}
      src="img/rich-menu/nurse.svg"
      alt="Nurse icon"
      width={0}
      height={0}
    />
  );
};

export const DocumentIcon = ({ className = "" }: IconProps) => {
  return (
    <Image
      className={cn("h-28 w-auto", className)}
      src="img/rich-menu/document.svg"
      alt="Document icon"
      width={0}
      height={0}
    />
  );
};
