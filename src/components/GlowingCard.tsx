import { cn } from "@/lib/utils";

interface Props {
  varient?: "primary" | "secondary";
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}
const GlowingCard = ({ children = "", className, hover = true }: Props) => {
  return (
    <div className={cn("relative group cursor-pointer", className)}>
      <div
        className={cn(
          "absolute -inset-1 bg-gradient-to-b from-blue-400 to-primary-papai rounded-lg blur opacity-25",
          hover
            ? "group-hover:opacity-100 transition duration-1000 group-hover:duration-200"
            : ""
        )}
      ></div>
      <div className="relative h-full p-2 bg-white ring-1 ring-gray-900/5 rounded-lg flex flex-col justify-center items-center">
        {children}
      </div>
    </div>
  );
};

export default GlowingCard;
