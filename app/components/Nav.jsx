'use client'

import { motion } from "framer-motion"

export default function Nav({user}){
    return(

        <motion.div 
        className="flex justify-between items-center mb-6"
        initial={{ y:-150}}
        animate={{ y:0}}
        transition={{ ease: "easeInOut", duration: 1 }}  
        >
            <h1 className="font-extrabold text-gray-800">{user.email}'s Film List</h1>
            <form action="/auth/signout" method="post">
                <button 
                type="submit" 
                className="bg-slate-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
                >
                Sign out
                </button>
            </form>
        </motion.div>
    )
}