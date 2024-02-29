import { errorResponse } from "@/app/api/errorResponse";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
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
    const response = await fetch(
      `https://api.line.me/v2/bot/user/all/richmenu/${richMenuId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${channelToken}`,
        },
      }
    );
    if (!response.ok) {
      const message = `Failed to set rich menu default: ${response.statusText}`;
      return errorResponse({ message, statusCode: response.status });
    }

    return NextResponse.json({ message: "success" });
  } catch (err) {
    return errorResponse({ message: "Something went wrong", statusCode: 500 });
  }
}
