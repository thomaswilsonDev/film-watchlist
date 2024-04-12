'use server'
import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import {revalidatePath} from 'next/cache';
import {cookies} from 'next/headers';

export async function deleteFilm(formData){
    //Get film id to delete correct film
    const filmID = formData.get('id')

    const cookieStore = cookies();
    const supabase = createServerComponentClient({cookies: () => cookieStore})
    
    //get session data for current user
    const {data: {session}} = await supabase.auth.getSession();
    const user = session?.user

    //if user not authenticated, log error and return
    if (!user){
        console.error("User not authenticated within deleteFilm server action ")
        return;
    }

    //Delete film from 'films' table
    const {error} = await supabase
        .from('films')
        .delete()
        //Match film ID and User ID to validate user permission
        .match({id: filmID, user_id: user.id})
    
    //If error deleting film, log error
    if (error){
        console.error('Error deleting data', error)
        return;
    }

    //revalidate path to reload screen and display updated list
    revalidatePath('/film-list')
    return {message: 'Success'}
}