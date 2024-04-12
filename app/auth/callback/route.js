//File for redirecting user to film-list page if their logged in

import {createRouteHandlerClient} from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import {NextResponse} from 'next/server';

 
export async function GET(req){
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({cookies: () => cookieStore});

    //get parameters from request url
    const {searchParams} = new URL(req.url)

    //get code value from parameters
    const code = searchParams.get('code')

    //if code is present exchance for supabase authentication session
    if (code){
        await supabase.auth.exchangeCodeForSession(code)
    }

    //if user present redirect to 'film-list page
    return NextResponse.redirect(new URL('/film-list', req.url))
}