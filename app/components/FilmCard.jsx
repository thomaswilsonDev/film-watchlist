'use client'

import { deleteFilm } from "../server-actions/deleteFilm";
import EditFilm from "./EditFilm";
import { motion } from "framer-motion";


export default function FilmCard({film, index}){
    return(
        <motion.div
        key={film.id}
        className="mb-4 p-4 bg-gray-800 rounded-3xl shadow"
        initial={{opacity:0, y:20}}
        animate={{ opacity: 1, y:0}}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        >
        <div className="flex justify-between items-center">
        <h2 className="text-xl text-white mb-2">{index + 1}. {film.title} - {film.actor}</h2>
        <div className="flex space-x-2">
            <form action={deleteFilm}>
            <input type="hidden" name="id" value={film.id} />
            <button 
                type="submit"
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
                Delete
            </button>
            </form>
            <EditFilm film={film} />
        </div>
        </div>
        </motion.div>
    )
}