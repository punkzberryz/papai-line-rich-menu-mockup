import { NextRequest, NextResponse } from "next/server";
import { errorResponse } from "../../errorResponse";

// Delete rich menu
export async function DELETE(
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
      `https://api.line.me/v2/bot/richmenu/${richMenuId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${channelToken}`,
        },
      }
    );
    if (!response.ok) {
      const message = `Failed to delete rich menu: ${response.statusText}`;
      return errorResponse({ message, statusCode: response.status });
    }
    return NextResponse.json({ message: "success" });
  } catch (err) {
    return errorResponse({ message: "Something went wrong", statusCode: 500 });
  }
}
