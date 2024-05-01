import { RichMenuBodyType } from "@/app/schema/richmenu";

interface getFeederBodyProps {
  createNewEventUrl: string;
  meUrl: string;
  myEventsUrl: string;
}
export const getFeederBody = ({
  createNewEventUrl,
  meUrl,
  myEventsUrl,
}: getFeederBodyProps): RichMenuBodyType => {
  return {
    size: {
      width: 2500,
      height: 1686,
    },
    selected: true,
    name: "feeder",
    chatBarText: "ผู้ป้อนงาน",
    areas: [
      {
        bounds: {
          x: 144,
          y: 603,
          width: 640,
          height: 709,
        },
        action: {
          type: "uri",
          uri: createNewEventUrl,
        },
      },
      {
        bounds: {
          x: 938,
          y: 608,
          width: 640,
          height: 709,
        },
        action: {
          type: "uri",
          uri: myEventsUrl,
        },
      },
      {
        bounds: {
          x: 1715,
          y: 605,
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
          x: 836,
          y: 22,
          width: 816,
          height: 186,
        },
        action: {
          type: "richmenuswitch",
          richMenuAliasId: "richmenu-carer",
          data: "switch-richmenu-to-carer-page",
        },
      },
      {
        bounds: {
          x: 18,
          y: 20,
          width: 802,
          height: 189,
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
