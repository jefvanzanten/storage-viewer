import { NextResponse, NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/admin") {
    return NextResponse.redirect(new URL("/admin/add_storage", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin",
};
