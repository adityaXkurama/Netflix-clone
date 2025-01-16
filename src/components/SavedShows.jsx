import React, { useEffect, useState } from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { UserAuth } from '../context/AuthContext'
import { db } from '../firebase'
import { onSnapshot,doc,updateDoc } from 'firebase/firestore'
import { AiOutlineClose } from 'react-icons/ai'

const SavedShows = () => {
    const { user } = UserAuth();
    const [movies, setMovies] = useState([])

    
    const slideLeft = () => {
        var slider = document.getElementById('slider')
        slider.scrollLeft = slider.scrollLeft - 500;
    }
    const slideRight = () => {
        var slider = document.getElementById('slider')
        slider.scrollLeft = slider.scrollLeft + 500;
    }

    useEffect(() => {
    onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
           setMovies(doc.data()?.savedShows)
       })
}, [user?.email,setMovies])

const movieRef = doc(db, 'users',`${user?.email}`)
const deleteShow = async (passedId)=>{
    try {
        const result = movies.filter((item)=>item.id!== passedId);
        await updateDoc(movieRef,{
            savedShows: result 
        })
    } catch (error) {
        console.log(error);
        
    }
}
return (
    <>
        <h2 className="text-white font-bold md:text-xl p-4">My shows</h2>
        <div className="relative flex items-center group">
            <MdChevronLeft
                onClick={slideLeft}
                className='left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 group-hover:block hidden' size={40} />
            <div className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide" id={'slider'}>
                {movies.map((item) => (
                    <div key={item?.id}
                    className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2 text-white">
                        <img
                            className='' src={`https://image.tmdb.org/t/p/w500/${item?.img}`} alt={item?.title} />
                        <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100">
                            <p className='whitespace-normal text-xs md:text-sm text-bold flex justify-center items-center h-full text-center'>{item?.title}</p>
                            <p 
                            onClick={()=>deleteShow(item.id) }
                            className="absolute top-4 right-4"><AiOutlineClose/></p>

                        </div>
                    </div>
                ))}
            </div>
            <MdChevronRight
                onClick={slideRight}
                className='right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 group-hover:block hidden' size={40} />
        </div>
    </>
)
}

export default SavedShows
