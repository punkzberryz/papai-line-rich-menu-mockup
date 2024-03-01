"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";
import { deleteRichMenu, deleteRichMenuAlias } from "@/lib/rich-menu-api";
interface RichMenuItemDeleteButtonProps {
  richMenuId: string;
  richMenuAliasId: string;
  channelToken: string;
}
const RichMenuItemDeleteButton = ({
  richMenuId,
  richMenuAliasId,
  channelToken,
}: RichMenuItemDeleteButtonProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const handleOnClick = async () => {
    console.log("delete richmenu");
    setIsLoading(true);
    try {
      await Promise.all([
        deleteRichMenu({ channelToken, richMenuId }),
        deleteRichMenuAlias({ channelToken, richMenuAliasId }),
      ]);

      setIsLoading(false);
      toast({
        title: "Rich menu deleted",
        description: "Rich menu has been deleted",
      });
      router.refresh();
      location.reload();
    } catch (err) {
      console.error(err);
      setIsLoading(false);
      return;
    }
  };
  return (
    <Button
      className="w-full"
      variant="destructive"
      onClick={handleOnClick}
      disabled={isLoading}
    >
      Delete Richmenu
    </Button>
  );
};

export default RichMenuItemDeleteButton;
