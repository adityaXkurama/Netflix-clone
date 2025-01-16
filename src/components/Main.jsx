import React, { useEffect, useState } from 'react'
import requests from '../Requests'
import axios from 'axios'

const Main = () => {

  const [movies, setMovies] = useState([])

  const movie = movies[Math.floor(Math.random() * movies.length)]

  useEffect(() => {
    axios.get(requests.requestPopular).then((res) => { setMovies(res.data.results) })
  }, [])
  // console.log(movie);

  const truncateString = (str,num)=>{
    if(str?.length>num){
      return str.slice(0,num)+'...'
    }
    else{
      return str
    }
  }


  return (
    <div className='w-full h-[550px] text-white'>
      <div className="w-full h-full">
        <div className="absolute w-full h-[550px] bg-gradient-to-r  from-black"></div>
        <img className='w-full h-full object-cover' src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} alt={movie?.title} />
        <div className="absolute top-[20%] p-5 md:p-8">
          <h1 className='text-3xl md:text-4xl font-bold my-2'>{movie?.title}</h1>
          <div className="p-2">
            <button className='border border-gray-300 px-5 py-2 text-black bg-gray-300'>Play</button>
            <button className='border border-gray-300 px-2 py-2 bg-black ml-4'>Watch Later</button>
          </div>
          <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%]">{truncateString(movie?.overview,150)}</p>
        </div>
      </div> 
    </div>
  )
}

export default Main
