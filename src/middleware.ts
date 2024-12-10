import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
    console.log("middle ware excecute")

    const authToken = request.cookies.get('authToken')?.value;

    const loggedInUserNotAccessPath = request.nextUrl.pathname == '/login' || request.nextUrl.pathname == '/signup'

    if(request.nextUrl.pathname == '/api/login' || request.nextUrl.pathname == '/api/user'){
        return;
    }

    if(loggedInUserNotAccessPath){
        if(authToken){
            return NextResponse.redirect(new URL('/profile/user', request.url))
        }
    }else{
        if(!authToken){

                if(request.nextUrl.pathname.startsWith('/api')){
                    return NextResponse.json({
                        message:"Not Accessable",
                        success:true
                    },{
                        status:401
                    })
                }

            return NextResponse.redirect(new URL('/login', request.url))
        }
    }
    //   return NextResponse.redirect(new URL('/', request.url))
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/add-task',
    '/login',
    '/signup',
    '/show-task',
    '/profile/:path*',
    '/api/:path*'
],
}