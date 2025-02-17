import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'


function Navbar() {

  const { user, logOut } = UserAuth()
  console.log(user?.email)

  const navigate = useNavigate()

  const handleLogout=async()=>{
    try {
      await logOut();
      navigate('/')
    } catch (error) {
      console.log(error);
      
    }
  }



  return (
    <div className='flex justify-between p-4 z-[100] absolute w-full'>
      <Link to='/'>
        <h1 className='text-red-600 text-4xl font-bold cursor-pointer'>NETFLIX</h1>
      </Link>
      {user?.email ? <div className="flex justify-between">
        <Link to='/account'>
          <button className='text-white pr-4 py-2'>Account</button>
        </Link>
          <button onClick={handleLogout} className='bg-red-600 px-6 py-2 rounded cursor-pointer text-white'>logout</button>
      </div> :
        <div className="flex justify-between">
          <Link to='/login'>
            <button className='text-white pr-4 py-2'>Sign In</button>
          </Link>
          <Link to='/signup'>
            <button className='bg-red-600 px-6 py-2 rounded cursor-pointer text-white'>Sign Up</button>
          </Link>
        </div>}

    </div>
  )
}

export default Navbar

{/* <div className="flex justify-between">
        <Link to='/login'>
          <button className='text-white pr-4 py-2'>Sign In</button>
        </Link>
        <Link to='/signup'>
          <button className='bg-red-600 px-6 py-2 rounded cursor-pointer text-white'>Sign Up</button>
        </Link>
      </div> */}