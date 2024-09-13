import { RichMenuBodyType } from "@/app/schema/richmenu";
interface getMainBodyProps {
  papaiPlatformUrl: string;
  authSignupUrl: string;
  appEventNewUrl: string;
  appEventUrl: string;
}
export const getMainBody = ({
  papaiPlatformUrl,
  appEventNewUrl,
  appEventUrl,authSignupUrl
}: getMainBodyProps): RichMenuBodyType => {
  return {
    size: {
      width: 2500,
      height: 1686,
    },
    selected: true,
    name: "main",
    chatBarText: "ค้นหาผู้ดูแล",
    areas: [
      {
        bounds: {
          x: 1931,
          y: 45,
          width: 519,
          height: 149,
        },
        action: {
          type: "uri",
          uri: papaiPlatformUrl,
        },
      },
      {
        bounds: {
          x: 62,
          y: 611,
          width: 742,
          height: 1027,
        },
        action: {
          type: "uri",
          uri: appEventNewUrl,
        },
      },
      {
        bounds: {
          x: 877,
          y: 609,
          width: 742,
          height: 1027,
        },
        action: {
          type: "uri",
          uri: appEventUrl,
        },
      },
      {
        bounds: {
          x: 1692,
          y: 615,
          width: 742,
          height: 1027,
        },
        action: {
          type: "uri",
          uri: authSignupUrl,
        },
      },
    ],
  };
};
