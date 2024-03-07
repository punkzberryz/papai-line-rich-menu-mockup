import config from "@/lib/config";
import ClientComp from "./ClientComp";
import { getRichMenuJsonFromLocal } from "@/lib/rich-menu-api";

const UploadRichMenuPage = async () => {
  const channelToken = config.channelAccessToken;
  if (!channelToken) {
    throw new Error("Channel Access Token is not found");
  }
  const richMenuBodyInputMaps = getRichMenuJsonFromLocal();

  return (
    <main className="flex flex-col items-center p-2">
      <h1
        data-test="upload-richmenu-title"
        className="text-xl font-semibold tracking-wider"
      >
        Upload Richmenu
      </h1>
      <ClientComp
        channelToken={channelToken}
        jsonBodyMap={richMenuBodyInputMaps}
      />
    </main>
  );
};

export default UploadRichMenuPage;
