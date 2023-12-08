import React, { useState } from 'react';
import user from '../assets/user.svg';
import { Link } from 'react-router-dom';

export const Navbar = () => {

  return (
    <div className="" id="navbar-container">
        <nav className='bg-gradient-to-r from-orange-400 to-softorange' id='navbar'>
            <ul>
                <li className='flex flex-row w-[30rem] sm:w-[40rem] md:w-[47rem] lg:w-[60rem]
                xl:w-[75rem] 2xl:w-[90rem] m-auto px-2'>
                    <div className="flex items-center justify-center" id="logo">
                        <h1 className='font-mono  md:text-[2.5rem]
                        text-yellow-200 font-bold'>Sweetie</h1>
                    </div>

                    <div className="flex flex-row space-x-5 px-8 md:px-[7rem] lg:px-[10rem]
                    xl:px-[18rem] sm:px-[5rem]" id="left-side">
                        <div className="flex space-x-2 lg:space-x-[5rem] 2xl:space-x-[15rem] items-center" id="navbar-buttons">
                            <button className='shadow-xl shadow-red-500 w-[10rem]
                            bg-yellow-500 rounded-md text-white font-medium h-[2rem]
                            duration-200 ease-linear hover:text-black hover:bg-white 
                            xl:h-[3rem]'>
                                <Link to='/register'>
                                    CREATE ACCOUNT
                                </Link>
                            </button>

                            <button className='text-white font-medium shadow-xl shadow-red-500
                            rounded-md w-[5rem] h-[2rem] bg-yellow-500 ease-linear
                            hover:bg-white xl:h-[3rem] hover:text-black duration-200
                            2xl:w-[10rem]'>
                                <Link to='/login'>
                                    LOGIN
                                </Link>
                            </button>
                        </div>
                    </div>

                    <div className="flex-row items-center w-[8rem] m-auto justify-center
                    " id="right-side">
                        <div className="ml-[-.5rem]" id="profile">
                            <button className='hover:border-b-solid duration-75
                            hover:animate-pulse'>
                                <img src={user} alt="user" className='w-[3rem]'/>
                            </button>
                        </div>
                    </div>
                </li>
            </ul>
        </nav>
    </div>
  )
}
