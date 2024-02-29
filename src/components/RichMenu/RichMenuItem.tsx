import { RichMenuReturnType } from "@/lib/rich-menu-api";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import RichMenuImage from "./RichMenuImage";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import RichMenuItemDownloadJsonButton from "./RichMenuItemDownloadJsonButton";
import RichMenuItemDeleteButton from "./RichMenuItemDeleteButton";

// Render Richmenu item
interface RichMenuItemProps {
  richmenu: RichMenuReturnType;
  channelToken: string;
}
const RichMenuItem = ({ richmenu, channelToken }: RichMenuItemProps) => {
  const richMenuAliasId = `richmenu-${richmenu.name.toLowerCase()}`;

  // proper way to get richMenuAliasId is to fetch from LINE API
  return (
    <div className="grid gap-6 group border p-4 rounded-lg hover:bg-gray-200 md:max-w-[350px] h-fit">
      <div className="w-full overflow-hidden">
        <h2 className="py-2 text-xl font-semibold group-hover:text-gray-900">
          {richmenu.name}
        </h2>
        <p className="text-gray-500 group-hover:text-gray-800">
          {richmenu.chatBarText}
        </p>
        <p className="text-gray-500 group-hover:text-gray-800 truncate">
          RichMenu ID:
          {" " + richmenu.richMenuId}
        </p>
        {richmenu.areas.length !== 0 ? (
          <Accordion type="single" collapsible>
            <AccordionItem value="RichMenu">
              <AccordionTrigger className="font-normal text-sm py-1">
                Show action
              </AccordionTrigger>
              <AccordionContent>
                <ScrollArea className="h-80 w-full border rounded-lg p-2 text-sm font-light text-gray-700">
                  {richmenu.areas.map((area, index) => (
                    <div key={index}>
                      <pre>{JSON.stringify(area.action, null, 2)}</pre>
                    </div>
                  ))}
                  <ScrollBar orientation="vertical" />
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ) : null}
      </div>
      <RichMenuImage
        channelToken={channelToken}
        richMenuId={richmenu.richMenuId}
      />
      <div className="py-2 flex flex-col gap-2">
        <RichMenuItemDownloadJsonButton richmenu={richmenu} />
        <RichMenuItemDeleteButton
          richMenuId={richmenu.richMenuId}
          richMenuAliasId={richMenuAliasId}
          channelToken={channelToken}
        />
      </div>
    </div>
  );
};

export default RichMenuItem;
