import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {UserAuth} from '../context/AuthContext'

const Signup = () => {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate()

    const {user,signUp} = UserAuth()

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
            await signUp(email,password);
            navigate('/')
        } catch (error) {
            console.log(error);
            
        }
    }
    return (
        <>
            <div className="w-full h-screen">
                <img className='hidden md:block absolute w-full h-full object-cover' src="https://assets.nflxext.com/ffe/siteui/vlv3/e3e9c31f-aa15-4a8f-8059-04f01e6b8629/web/IN-en-20250113-TRIFECTA-perspective_febfa442-23d9-45f3-937e-72f8b971f7a9_small.jpg" alt="" />
                <div className="w-full h-screen bg-black/60 fixed top-0 left-0"></div>
                <div className="fixed w-full px-4 py-24  z-50">
                    <div className="max-w-[450px] h-[600px] mx-auto  bg-black/75 text-white">
                        <div className="max-w-[320px] mx-auto py-16">
                            <h1 className="text-white font-bold text-3xl">Sign Up</h1>
                            <form 
                            onSubmit={handleSubmit}
                            className='w-full flex flex-col py-4'>
                                <input 
                                onChange={(e)=>setEmail(e.target.value)}
                                className='p-3 my-2 bg-gray-700 rounded' type="email" placeholder='email or phone number' />
                                <input
                                onChange={(e)=>setPassword(e.target.value)}
                                 className='p-3 my-2 bg-gray-700 rounded' type="password" placeholder='password' />
                                <button className='bg-red-600 py-3 my-6 rounded font-bold'>Sign Up</button>
                                <div className="flex justify-between text-gray-600 text-sm">
                                    <p><input className='mr-2' type="checkbox"  />Remember me</p>
                                    <p>Need Help?</p>
                                    
                                </div>
                                <div className=" text-sm py-8 ">
                                    <p><span className='text-gray-600'>Already subscribed to Netflix?</span><Link to='/login'> Sign In</Link></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup
