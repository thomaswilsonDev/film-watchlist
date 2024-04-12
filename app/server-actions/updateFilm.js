'use server'
import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import {revalidatePath} from 'next/cache';
import {cookies} from 'next/headers';

export async function updateFilm(formData){
    //get film id and new title/actor/rating
    const id = formData.get('id')
    const title = formData.get('title')
    const actor = formData.get('actor')
    const ratingNumber = formData.get('ratingNumber')

    const cookieStore = cookies();
    const supabase = createServerComponentClient({cookies: () => cookieStore})
    
    //get session data for current user
    const {data: {session}} = await supabase.auth.getSession();
    const user = session?.user

    //if user not authenticated, log error and return
    if (!user){
        console.error("User not authenticated within updateFilm server action ")
        return;
    }

    //update film in 'films' table
    const {data, error} = await supabase
        .from('films')
        .update(
            {
                title,
                actor,
                rating_number: ratingNumber,
            }
        //match film id and user id to check permission
        ).match({id, user_id: user.id})
    
    //if error updating film log error
    if (error){
        console.error('Error inserting data', error)
        return;
    }

    //revalidate path to reload screen and display updated list
    revalidatePath('/film-list')
    return {message: 'Success'}
}