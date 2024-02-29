import { NextResponse } from "next/server";

export const errorResponse = ({
  message,
  statusCode,
}: {
  message: string;
  statusCode: number;
}) => {
  return NextResponse.json(null, { status: statusCode, statusText: message });
};
