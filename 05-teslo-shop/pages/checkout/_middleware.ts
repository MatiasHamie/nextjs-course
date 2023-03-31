import { jwt } from "@/utils";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const token = req.cookies.get("token")?.value || "";
  const previousPage = req.nextUrl.pathname;

  try {
    await jwt.isValidToken(token);
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(
      new URL(`/auth/login?p=${previousPage}`, req.url)
    );
  }
}
