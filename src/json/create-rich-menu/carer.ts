import { RichMenuBodyType } from "@/app/schema/richmenu";

interface getCarerBodyProps {
  eventBaordUrl: string;
  meUrl: string;
}
export const getCarerBody = ({
  eventBaordUrl,
  meUrl,
}: getCarerBodyProps): RichMenuBodyType => {
  return {
    size: {
      width: 2500,
      height: 1686,
    },
    selected: true,
    name: "carer",
    chatBarText: "ผู้ดูแล",
    areas: [
      {
        bounds: {
          x: 538,
          y: 608,
          width: 640,
          height: 709,
        },
        action: {
          type: "uri",
          uri: eventBaordUrl,
        },
      },
      {
        bounds: {
          x: 1324,
          y: 598,
          width: 640,
          height: 709,
        },
        action: {
          type: "uri",
          uri: meUrl,
        },
      },
      {
        bounds: {
          x: 1665,
          y: 22,
          width: 815,
          height: 186,
        },
        action: {
          type: "richmenuswitch",
          richMenuAliasId: "richmenu-feeder",
          data: "switch-richmenu-to-feeder-page",
        },
      },
      {
        bounds: {
          x: 24,
          y: 23,
          width: 811,
          height: 190,
        },
        action: {
          type: "richmenuswitch",
          richMenuAliasId: "richmenu-home",
          data: "switch-richmenu-to-home-page",
        },
      },
    ],
  };
};
