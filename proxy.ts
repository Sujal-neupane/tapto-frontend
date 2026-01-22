import {NextRequest, NextResponse} from "next/server";

export async function proxy(req:Request){

}
export const config = {
    matcher: [
        "/admin/:path*",
        "/user/:path*",
        "/login",
        "/signup"
    ]
}
