import { RichMenuBodyType } from "@/app/schema/richmenu";
import carer from "../json/create-rich-menu/carer.json";
import feeder from "../json/create-rich-menu/feeder.json";
import home from "../json/create-rich-menu/home.json";
import test from "../json/create-rich-menu/test.json";
import {
  getCarerBody,
  getFeederBody,
  getHomeBody,
} from "@/json/create-rich-menu";
import config from "./config";
import { getMainBody } from "@/json/create-rich-menu/main";

export const createRichMenu = async ({
  data,
  channelToken,
}: {
  channelToken: string;
  data: RichMenuBodyType;
}): Promise<string | undefined> => {
  try {
    const resp = await fetch("/api/richmenu", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${channelToken}`,
      },
    });
    if (!resp.ok) {
      const data = await resp.json();
      console.log({ data });
      throw new Error("Failed to create rich menu: " + resp.statusText);
    }
    const { richMenuId }: { richMenuId?: string } = await resp.json();
    if (!richMenuId) {
      throw new Error("richMenuId not found in response");
    }
    return richMenuId;
  } catch (err) {
    console.log("error creating rich menu");
    console.error(err);
    throw err;
  }
};

export const uploadRichMenuImage = async ({
  channelToken,
  image,
  richMenuId,
}: {
  channelToken: string;
  image: File;
  richMenuId: string;
}) => {
  try {
    const response = await fetch(`/api/richmenu/${richMenuId}/image`, {
      method: "POST",
      headers: {
        "Content-Type": "image/jpeg",
        Authorization: `Bearer ${channelToken}`,
      },
      body: image,
    });
    if (!response.ok) {
      const data = await response.json();
      console.log({ data });
      throw new Error(
        "Failed to upload rich menu image: " + response.statusText,
      );
    }
  } catch (err) {
    console.log("error uploading rich menu image");
    console.error(err);
    throw err;
  }
};

export const createRichMenuAlias = async ({
  channelToken,
  fileName,
  richMenuId,
}: {
  channelToken: string;
  fileName: string;
  richMenuId: string;
}) => {
  try {
    const response = await fetch(`/api/richmenu/${richMenuId}/alias`, {
      method: "POST",
      body: JSON.stringify({
        richMenuId,
        richMenuAliasId: `richmenu-${fileName}`,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${channelToken}`,
      },
    });
    if (!response.ok) {
      throw new Error(
        "Failed to create rich menu alias: " + response.statusText,
      );
    }
  } catch (err) {
    console.log("error creating rich menu alias");
    console.error(err);
    throw err;
  }
};

export const deleteRichMenu = async ({
  channelToken,
  richMenuId,
}: {
  channelToken: string;
  richMenuId: string;
}) => {
  try {
    const response = await fetch(`/api/richmenu/${richMenuId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${channelToken}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to delete rich menu: " + response.statusText);
    }
  } catch (err) {
    console.log("error deleting rich menu");
    console.error(err);
    throw err;
  }
};

export const deleteRichMenuAlias = async ({
  channelToken,
  richMenuAliasId,
}: {
  channelToken: string;
  richMenuAliasId: string;
}) => {
  try {
    const response = await fetch(`/api/richmenu/${richMenuAliasId}/alias`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${channelToken}`,
      },
    });
    if (!response.ok) {
      throw new Error(
        "Failed to delete rich menu alias: " + response.statusText,
      );
    }
  } catch (err) {
    console.log("error deleting rich menu alias");
    console.error(err);
    throw err;
  }
};

export const setDefaultRichMenu = async ({
  channelToken,
  richMenuId,
}: {
  channelToken: string;
  richMenuId: string;
}) => {
  try {
    const response = await fetch(`/api/richmenu/${richMenuId}/default`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${channelToken}`,
      },
    });
    if (!response.ok) {
      throw new Error(
        "Failed to set rich menu default: " + response.statusText,
      );
    }
  } catch (err) {
    console.log("error setting default rich menu");
    console.error(err);
    throw err;
  }
};

export const getRichMenuJsonFromLocal = () => {
  const {
    appEvent,
    appEventNew,
    home,
    //old
    eventBoard,
    me,
    newCarer,
    newEvent,
    newFeeder,
    carerMyBookedEvents,
    carerMyEvents,
    feederMyEvents,
  } = config.liffUrl;
  if (
    !eventBoard ||
    !me ||
    !newCarer ||
    !newEvent ||
    !newFeeder ||
    !home ||
    !carerMyBookedEvents ||
    !carerMyEvents ||
    !feederMyEvents
  ) {
    console.log("config: ", config);
    throw new Error("LIFF URL not found in config");
  }
  const mainBody = getMainBody({
    papaiPlatformUrl: home,
    appEventNewUrl: appEventNew,
    appEventUrl: appEvent,
  });
  //old
  const carerBody = getCarerBody({
    eventBaordUrl: eventBoard,
    meUrl: me,
    myEventsUrl: carerMyEvents,
    myBookedEventsUrl: carerMyBookedEvents,
  });

  const feederBody = getFeederBody({
    createNewEventUrl: newEvent,
    meUrl: me,
    myEventsUrl: feederMyEvents,
  });
  const homeBody = getHomeBody({
    createNewCarerUrl: newCarer,
    createNewFeederUrl: newFeeder,
    createNewEventUrl: newEvent,
    papaiPlatformUrl: home,
  });
  const testBody = test as RichMenuBodyType;
  return {
    main: mainBody,
    //old
    home: homeBody,
    carer: carerBody,
    feeder: feederBody,
    test: testBody,
  };
};

// export type RichMenuBodyType = ReturnType<
//   typeof getRichMenuJsonFromLocal
// >[keyof ReturnType<typeof getRichMenuJsonFromLocal>];

export const getRichMenuList = async (channelToken: string) => {
  try {
    const response = await fetch("https://api.line.me/v2/bot/richmenu/list", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${channelToken}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      console.log("response not ok during rich menu list fetch");
      console.log("response status: ", response.status);
      console.log("response statusText: ", response.statusText);
      console.log(await response.json());
      throw new Error(response.statusText);
    }

    const data = (await response.json()) as {
      richmenus?: RichMenuReturnType[];
    };
    if (!data.richmenus) {
      throw new Error("richmenus not found in response");
    }
    return data.richmenus;
  } catch (err) {
    console.log("error fetching rich menu list");
    console.error(err);
    throw err;
  }
};

export const getRichMenuImage = async ({
  channelToken,
  richMenuId,
}: {
  channelToken: string;
  richMenuId: string;
}) => {
  try {
    const response = await fetch(
      `https://api-data.line.me/v2/bot/richmenu/${richMenuId}/content`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${channelToken}`,
        },
      },
    );

    if (!response.ok) {
      console.log("response not ok during rich menu image fetch");
      console.log("response status: ", response.status);
      console.log("response statusText: ", response.statusText);
      console.log(await response.json());
      throw new Error(response.statusText);
    }
    //return as blob
    const blob = await response.blob();
    return blob;
  } catch (err) {
    console.log("error fetching rich menu image");
    console.error(err);
    throw err;
  }
};

export type RichMenuReturnType = {
  richMenuId: string;
  name: string;
  size: {
    width: number;
    height: number;
  };
  chatBarText: string;
  selected: boolean;
  areas: {
    bounds: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
    action: any;
  }[];
};
