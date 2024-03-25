import { z } from "zod";

type RichMenuMessageAction = {
  type: string;
  label?: string;
  text: string;
};

type RichMenuUriAction = {
  type: string;
  label?: string;
  uri: string;
};

type RichMenuSwitchAction = {
  type: string;
  label?: string;
  richMenuAliasId: string;
  data: string;
};

export type RichMenuBodyType = {
  size: {
    width: number;
    height: number;
  };
  selected: boolean;
  name: string;
  chatBarText: string;
  areas: {
    bounds: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
    action: RichMenuUriAction | RichMenuMessageAction | RichMenuSwitchAction;
  }[];
};
