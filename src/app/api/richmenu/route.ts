import { NextRequest, NextResponse } from "next/server";
import { errorResponse } from "../errorResponse";
import { RichMenuBodyType } from "@/app/schema/richmenu";

//Create new rich menu
export async function POST(req: NextRequest) {
  const channelToken = req.headers.get("Authorization")?.replace("Bearer ", "");
  if (!channelToken) {
    return errorResponse({
      message: "Channel Access Token is not found",
      statusCode: 401,
    });
  }
  const body = (await req.json()) as RichMenuBodyType;
  const bodyString = JSON.stringify(body);

  try {
    const response = await fetch("https://api.line.me/v2/bot/richmenu", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${channelToken}`,
      },
      body: bodyString,
    });

    if (!response.ok) {
      const message = `Failed to create rich menu: ${response.statusText}`;
      console.error(message);
      return NextResponse.json({ message }, { status: response.status });
    }

    const json = (await response.json()) as { richMenuId?: string };
    if (!json.richMenuId) {
      throw new Error("richMenuId not found in response");
    }

    return NextResponse.json({ richMenuId: json.richMenuId });
  } catch (err) {
    console.error(err);
    return errorResponse({ message: "Something went wrong", statusCode: 500 });
  }
}
