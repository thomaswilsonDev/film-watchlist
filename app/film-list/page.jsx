import { cookies } from "next/headers";
import FilmForm from "../components/FilmForm";
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import FilmCard from "../components/FilmCard";
import Countdown from "../components/Countdown"
import Nav from "../components/Nav";

export default async function FilmList(){
    const cookieStore = cookies();
    const supabase = createServerComponentClient({cookies: () => cookieStore});
    const {data: {session}} = await supabase.auth.getSession();
    const user = session?.user;

    //get data from database
    const {data: films, error} = await supabase
        .from('films')
        .select('*')
        .eq('user_id', user.id)
        .order('title', {ascending: true})
    if (error){
        console.error('Error fetching films')
    }

    console.log(user)

    return (
        <div className="min-h-screen bg-slate-200 text-gray-800 max-w-screen">
            <div className="container mx-auto p-6 sm:p-12">
                <Nav user={user}/>
                <div className="flex flex-col text-center mt-6 mb-6 space-y-4">
                <h1>Time Left To Watch Films For The Year</h1>
                <Countdown />
                </div>
                <div className="border-t-2 border-gray-800 mt-10">
                <FilmForm />
                </div>
                <div className="mt-6 border-t-2 border-gray-800 p-6">
                    {films.map((film, index) => (
                       <FilmCard film={film} index={index} key={film.id}/> 
                    ))}
                </div>
            </div>
        </div>
    )
}