import {NextRequest, NextResponse} from 'next/server';
import {ROLE_OPTIONS} from "../../utils/enums";

export async function middleware(req: NextRequest) {

    let url = req.nextUrl.clone();
    url.pathname = '/';

    if (req.cookies.userInfo) {
        const userInfo = JSON.parse(req.cookies.userInfo)
        if (userInfo.role !== ROLE_OPTIONS.CUSTOMER) {
            return NextResponse.json({message: 'Not authenticated.', status: 401})
        }
        return NextResponse.next();
    }
    return NextResponse.redirect(url)
}