import { RichMenuBodyType } from "@/app/schema/richmenu";

interface getCarerBodyProps {
  eventBaordUrl: string;
  meUrl: string;
  myEventsUrl: string;
  myBookedEventsUrl: string;
}
export const getCarerBody = ({
  eventBaordUrl,
  meUrl,
  myEventsUrl,
  myBookedEventsUrl,
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
          x: 18,
          y: 278,
          width: 640,
          height: 635,
        },
        action: {
          type: "uri",
          uri: eventBaordUrl,
        },
      },
      {
        bounds: {
          x: 837,
          y: 281,
          width: 632,
          height: 635,
        },
        action: {
          type: "uri",
          uri: myEventsUrl,
        },
      },
      {
        bounds: {
          x: 1663,
          y: 282,
          width: 632,
          height: 635,
        },
        action: {
          type: "uri",
          uri: myBookedEventsUrl,
        },
      },
      {
        bounds: {
          x: 15,
          y: 1001,
          width: 632,
          height: 635,
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
