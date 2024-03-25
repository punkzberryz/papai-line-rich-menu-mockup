import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import RichMenuItem from "@/components/RichMenu/RichMenuItem";
import config from "@/lib/config";
import { RichMenuReturnType, getRichMenuList } from "@/lib/rich-menu-api";

const ManageRichMenuPage = async () => {
  const channelToken = config.channelAccessToken;
  if (!channelToken) {
    throw new Error("Channel Access Token is not found");
  }
  const richMenuList = await getRichMenuList(channelToken);
  if (!richMenuList) {
    throw new Error("Rich menu list is not found");
  }

  // const richMenus: Record<string, RichMenuReturnType> = {};
  const richMenus: Record<string, RichMenu> = {};

  richMenuList.map((richMenu) => {
    richMenus[richMenu.richMenuId] = { body: richMenu };
  });

  return (
    <MaxWidthWrapper className="grid gap-6">
      <h1 className="text-xl">Manage Rich Menu</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(richMenus).map(([richMenuId, richMenu]) => {
          return (
            <RichMenuItem
              key={richMenuId}
              richmenu={richMenu.body}
              channelToken={channelToken}
            />
          );
        })}
        {richMenuList.length === 0 ? <div>No rich menu found...</div> : null}
      </div>
    </MaxWidthWrapper>
  );
};

type RichMenu = {
  body: RichMenuReturnType;
};

export default ManageRichMenuPage;
