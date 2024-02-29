import { errorResponse } from "@/app/api/errorResponse";
import { NextRequest, NextResponse } from "next/server";

//Delete richmenu alias
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const richMenuAliasId = params.id;
  const channelToken = req.headers.get("Authorization")?.replace("Bearer ", "");
  if (!channelToken) {
    return errorResponse({
      message: "Channel Access Token is not found",
      statusCode: 401,
    });
  }
  try {
    const response = await fetch(
      `https://api.line.me/v2/bot/richmenu/alias/${richMenuAliasId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${channelToken}`,
        },
      }
    );
    if (!response.ok) {
      const message = `Failed to delete rich menu alias: ${response.statusText}`;
      return errorResponse({ message, statusCode: response.status });
    }
    return NextResponse.json({ message: "success" });
  } catch (err) {
    return errorResponse({ message: "Something went wrong", statusCode: 500 });
  }
}

//Create richmenu alias
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const channelToken = req.headers.get("Authorization")?.replace("Bearer ", "");
  if (!channelToken) {
    return errorResponse({
      message: "Channel Access Token is not found",
      statusCode: 401,
    });
  }
  try {
    const {
      richMenuAliasId,
    }: // richMenuId,
    {
      richMenuAliasId?: string;
      // richMenuId?: string;
    } = await req.json();
    const richMenuId = params.id;
    if (!richMenuAliasId || !richMenuId) {
      return errorResponse({
        message: "richMenuAliasId and richMenuId are required",
        statusCode: 400,
      });
    }
    console.log("richMenuAliasId: ", richMenuAliasId);
    console.log("richMenuId: ", richMenuId);
    const body = JSON.stringify({
      richMenuId,
      richMenuAliasId,
    });
    console.log(body);
    const response = await fetch("https://api.line.me/v2/bot/richmenu/alias", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${channelToken}`,
      },
      body,
    });

    if (!response.ok) {
      const message = `Failed to create rich menu alias: ${response.statusText}`;
      console.log(await response.json());
      return errorResponse({ message, statusCode: response.status });
    }
    return NextResponse.json({ message: "success" });
  } catch (err) {
    console.log("error creating rich menu alias");
    return errorResponse({ message: "Something went wrong", statusCode: 500 });
  }
}
