import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Movie from './Movie'

import {MdChevronRight, MdChevronLeft} from 'react-icons/md'

const Row = ({title,fetchUrl,rowId}) => {

    const [movies,setMovies] = useState([])

    useEffect(()=>{
        axios.get(fetchUrl).then((res)=>{
            setMovies(res.data.results)
        })
    },[fetchUrl])

    const slideLeft=()=>{
      var slider=document.getElementById('slider'+rowId)
      slider.scrollLeft=slider.scrollLeft-500;
    }
    const slideRight=()=>{
      var slider=document.getElementById('slider'+rowId)
      slider.scrollLeft=slider.scrollLeft+500;
    }


  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4">{title}</h2>
      <div className="relative flex items-center group">
        <MdChevronLeft
        onClick={slideLeft}
         className='left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 group-hover:block hidden' size={40}/>
        <div className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide" id={'slider'+rowId}>
            {movies.map((item)=>(
                <Movie item={item}/>
            ))}
        </div>
        <MdChevronRight
        onClick={slideRight}
         className='right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 group-hover:block hidden' size={40}/>
      </div>
    </>
  )
}

export default Row
