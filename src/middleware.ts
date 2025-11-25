import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Check for POST, PUT, DELETE, PATCH on API routes
  if (request.nextUrl.pathname.startsWith("/api/")) {
    if (["POST", "PUT", "DELETE", "PATCH"].includes(request.method)) {
      const apiKey = request.headers.get("x-api-key");

      if (!apiKey || apiKey !== process.env.API_KEY) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*", "/admin/:path*"],
};
