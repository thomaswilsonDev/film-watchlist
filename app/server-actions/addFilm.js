'use server'
import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import {revalidatePath} from 'next/cache';
import {cookies} from 'next/headers';

//function to add films to supabase table
export async function addFilm(formData){
    //get film title, actor and rating number from form submission
    const title = formData.get('title')
    const actor = formData.get('actor')
    const ratingNumber = formData.get('ratingNumber')

    //use cookies to create supabase client
    const cookieStore = cookies();
    const supabase = createServerComponentClient({cookies: () => cookieStore})
    
    //get session data for current user
    const {data: {session}} = await supabase.auth.getSession();
    const user = session?.user
    
    //if no user log error and return
    if (!user){
        console.error("User not authenticated within addFilm server action ")
        return;
    }

    //Insert created film into 'films' table
    const {data, error} = await supabase
        .from('films')
        .insert([
            {
                title,
                actor,
                rating_number: ratingNumber,
                user_id: user.id
            }
        ])
    
    //if error with insert log error
    if (error){
        console.error('Error inserting data', error)
        return;
    }

    //revalidate path to reload screen and display updated list
    revalidatePath('/film-list')
    return {message: 'Success'}
}