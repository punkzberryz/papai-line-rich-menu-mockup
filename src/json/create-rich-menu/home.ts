import { RichMenuBodyType } from "@/app/schema/richmenu";

interface getHomeBodyProps {
  papaiPlatformUrl: string;
  createNewCarerUrl: string;
  createNewFeederUrl: string;
  createNewEventUrl: string;
}
export const getHomeBody = ({
  papaiPlatformUrl,
  createNewCarerUrl,
  createNewEventUrl,
  createNewFeederUrl,
}: getHomeBodyProps): RichMenuBodyType => {
  return {
    size: {
      width: 2500,
      height: 1686,
    },
    selected: true,
    name: "home",
    chatBarText: "Papai Platform",
    areas: [
      {
        bounds: {
          x: 1869,
          y: 685,
          width: 570,
          height: 182,
        },
        action: {
          type: "uri",
          uri: papaiPlatformUrl,
        },
      },
      {
        bounds: {
          x: 63,
          y: 957,
          width: 751,
          height: 693,
        },
        action: {
          type: "uri",
          uri: createNewCarerUrl,
        },
      },
      {
        bounds: {
          x: 877,
          y: 954,
          width: 751,
          height: 693,
        },
        action: {
          type: "uri",
          uri: createNewFeederUrl,
        },
      },
      {
        bounds: {
          x: 1691,
          y: 953,
          width: 751,
          height: 693,
        },
        action: {
          type: "uri",
          uri: createNewEventUrl,
        },
      },
      {
        bounds: {
          x: 1672,
          y: 8,
          width: 815,
          height: 211,
        },
        action: {
          type: "richmenuswitch",
          richMenuAliasId: "richmenu-feeder",
          data: "switch-richmenu-to-feeder-page",
        },
      },
      {
        bounds: {
          x: 846,
          y: 9,
          width: 821,
          height: 211,
        },
        action: {
          type: "richmenuswitch",
          richMenuAliasId: "richmenu-carer",
          data: "switch-richmenu-to-carer-page",
        },
      },
    ],
  };
};
