import {NextRequest, NextResponse} from 'next/server';
import {ROLE_OPTIONS, USER_STATUS} from "../../utils/enums";

export async function middleware(req: NextRequest) {
  let url = req.nextUrl.clone();
  url.pathname = '/';

  if (req.cookies.userInfo) {
    const userInfo = JSON.parse(req.cookies.userInfo)
    if (userInfo.role === ROLE_OPTIONS.CUSTOMER || userInfo.status === USER_STATUS.LOCKED) {
      return NextResponse.json({status: 401, message: 'Not authenticated.'})
    }
    return NextResponse.next();
  }
  return NextResponse.redirect(url)
}
