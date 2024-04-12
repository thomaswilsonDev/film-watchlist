'use client'

import { addFilm } from "../server-actions/addFilm";
import { motion } from "framer-motion";

export default function FilmForm(){
    return (
    <motion.div
    initial={{opacity:0, y:-20}}
    animate={{ opacity: 1, y:0}}
    transition={{ duration: 0.5 }}
    >
        <form action={addFilm} className="mb-6 mt-6">
            <div className="mb-4">
                <label htmlFor="title" className="block text-gray-800 mb-2">Title</label>
                <input 
                    type="text"
                    id="title"
                    name="title"
                    className="shadow appearance-none border border-slate-400 bg-slate-500 rounded-full w-full py-2 px-3 text-white"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="actor" className="block text-gray-800 mb-2">Director</label>
                <input 
                    type="text"
                    id="actor"
                    name="actor"
                    className="shadow appearance-none border border-slate-400 bg-slate-500 rounded-full w-full py-2 px-3 text-white"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="ratingNumber" className="block text-gray-800 mb-2">Personal Rating</label>
                <input 
                    type="text"
                    id="ratingNumber"
                    name="ratingNumber"
                    className="shadow appearance-none border border-slate-400 bg-slate-500 rounded-full w-full py-2 px-3 text-white"
                />
            </div>

            <motion.div 
            className="flex justify-center m-6"
            initial={{opacity:0}}
            animate={{ opacity: 1}}
            transition={{ duration: 2.5 }}
            >
                <button type="submit" className="bg-slate-600 hover:bg-slate-800 text-white font-bold text-xl py-2 px-6 rounded-full">
                    Add Film
                </button>
            </motion.div>
        </form>
        </motion.div>  
    )
}