import { errorResponse } from "@/app/api/errorResponse";
import { getRichMenuImage } from "@/lib/rich-menu-api";
import { NextRequest, NextResponse } from "next/server";
// We create this route to avoid CORS when fetching richmenu image on the client side
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const richMenuId = params.id;
  const channelToken = req.headers.get("Authorization")?.replace("Bearer ", "");

  if (!channelToken) {
    return errorResponse({
      message: "Channel Access Token is not found",
      statusCode: 401,
    });
  }

  try {
    const blob = await getRichMenuImage({ channelToken, richMenuId });

    const response = new NextResponse(blob, {
      headers: {
        "Content-Type": blob.type,
        "Content-Length": blob.size.toString(),
      },
    });
    if (!response.ok) {
      return errorResponse({
        message: "Bad request to get richmenu image",
        statusCode: 400,
      });
    }
    return response;
  } catch (err) {
    return errorResponse({
      message: "Failed to get richmenu image",
      statusCode: 500,
    });
  }
}

//Upload richmenu image
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const richMenuId = params.id;
  const channelToken = req.headers.get("Authorization")?.replace("Bearer ", "");
  if (!channelToken) {
    return errorResponse({
      message: "Channel Access Token is not found",
      statusCode: 401,
    });
  }
  try {
    // get file from request
    const file = await req.blob();
    const response = await fetch(
      `https://api-data.line.me/v2/bot/richmenu/${richMenuId}/content`,
      {
        method: "POST",
        headers: {
          "Content-Type": "image/jpeg",
          Authorization: `Bearer ${channelToken}`,
        },
        body: file,
      },
    );
    if (!response.ok) {
      const data = await response.json();
      console.log({ error: data });

      return errorResponse({
        message: "Failed to upload richmenu image",
        statusCode: 400,
      });
    }
    return NextResponse.json({ message: "success" });
  } catch (err) {
    return errorResponse({ message: "Something went wrong", statusCode: 500 });
  }
}
