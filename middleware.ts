import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: "/:path*",
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  // Extract the hostname (e.g., "insu.funroad.com" or "john.localhost:3000")
  const hostname = req.headers.get("host") || "";

  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "";

  if (hostname.endsWith(`.${rootDomain}`)) {
    const tenantSlug = hostname.replace(`.${rootDomain}`, "");
    console.log("REWRITE:", `/tenants/${tenantSlug}${url.pathname}`);
    return NextResponse.rewrite(
      new URL(`/tenants/${tenantSlug}${url.pathname}`, req.url)
    );
  }

  return NextResponse.next();
}
