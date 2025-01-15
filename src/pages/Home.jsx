import React from 'react'
import Main from '../components/Main'
import Row from '../components/Row'
import requests from '../Requests'
import Rows from '../components/Rows'

function Home() {
  return (
    <div className='text-white'>
      <Main/>
      <Rows/>
    </div>
  )
}

export default Home
