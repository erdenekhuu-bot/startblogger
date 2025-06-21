import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  return NextResponse.next();
}
