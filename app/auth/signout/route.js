//Checks session and signs out a user redirecting them to home page where they can login

import {createRouteHandlerClient} from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import {NextResponse} from 'next/server';

export async function POST(req){
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({cookies: () => cookieStore});

    //get session data for current user
    const {data: {session}} = await supabase.auth.getSession();

    //if a user is signed in, call signout function from supabase
    if (session){
        await supabase.auth.signOut()
    }

    //when successful redirect user back to home page
    return NextResponse.redirect(new URL('/', req.url), {status: 302})
}