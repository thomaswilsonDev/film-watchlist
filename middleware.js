import {createMiddlewareClient} from '@supabase/auth-helpers-nextjs';
import {NextResponse} from 'next/server'

//define middleware to handle authentication
export async function middleware(req){
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({req, res})

    //get user data from supabase authentication
    const {data: {user}} = await supabase.auth.getUser();

    //check if user authenticated and url is homepage
    if (user && req.nextUrl.pathname === '/'){
        //if true redirect to film-list
        return NextResponse.redirect(new URL('/film-list', req.url))
    }

    //if user not authenticated and url not homepage
    if (!user && req.nextUrl.pathname !== '/'){
        //redirect to homepage
        return NextResponse.redirect(new URL('/', req.url))
    }

    //return the response
    return res;
}

export const config = {
    //specify applicable URLs
    matcher: ['/', '/film-list']
}