import {NextRequest, NextResponse} from 'next/server';
import {ROLE_OPTIONS, USER_STATUS} from "../../utils/enums";
import {hashMD5} from "../../utils/helpers";
import config from "../../config.json";

export async function middleware(req: NextRequest) {

  let url = req.nextUrl.clone();
  url.pathname = '/';

  const cookies = req.cookies;
  let cookieProfile = await cookies[hashMD5(config.cookies.profile)]

  if (cookieProfile) {
    const {role, status} = JSON.parse(cookieProfile)
    if (role !== ROLE_OPTIONS.CUSTOMER || status === USER_STATUS.LOCKED) {
      return NextResponse.json({message: 'Not authenticated.', status: 401})
    }
    return NextResponse.next();
  }
  return NextResponse.redirect(url)
}
