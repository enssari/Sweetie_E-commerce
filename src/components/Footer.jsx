import React from 'react';
import email from '../assets/email-svgrepo-com.svg';
import phone from '../assets/phone-svgrepo-com.svg';
import location from '../assets/location-pin-alt-1-svgrepo-com.svg';
import face from '../assets/face.svg';
import youtube from '../assets/youtube-svgrepo-com.svg';
import pinterest from '../assets/pinterest-svgrepo-com.svg';
import insta from '../assets/instagram-svgrepo-com.svg';

export const Footer = () => {
  return (
    <div className='bg-gradient-to-r from-orange-500 to-orange-700 mt-[9rem] lg:mt-0' id='footer-wrapper'>
        <div className="flex flex-row justify-between lg:p-10" id="footer-content">
            <div className="flex flex-col space-y-6 py-8 w-[15rem] lg:w-[25rem] lg:p-4" id="left-side">
                <div className="flex flex-row space-x-8 lg:pl-[1.5rem]" id="email">
                    <div className="ml-6 lg:m-0" id="email-icon">
                        <img src={email} alt="email" className='w-[2rem]'/>
                    </div>

                    <div className="pt-1" id="email-text">
                        <p className='text-white'>terdodios@gmail.com</p>
                    </div>
                </div>

                <div className="flex flex-row space-x-8 p-6" id="phone">
                    <div className="" id="phone-icon">
                        <img src={phone} alt="phone" className='w-[2rem]'/>
                    </div>

                    <div className="" id="phone-text">
                        <p className='text-white'>123-456-7891</p>
                    </div>
                </div>

                <div className="flex flex-row space-x-8 p-6" id="location">
                    <div className="" id="location-icon">
                        <img src={location} alt="location" className='w-[7rem] lg:w-[4rem]'/>
                    </div>

                    <div className="" id="location-text">
                        <p className='text-white leading-relaxed'>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                        Vero quis.
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-row space-x-2 p-4" id="right-side">
                <button>
                    <img src={insta} alt="insta" className='hover:bg-yellow-200 hover:rounded-full w-[2.5rem]
                    hover:animate-bounce'/>
                </button>

                <button>
                    <img src={face} alt="face" className='hover:bg-yellow-200 hover:rounded-full w-[2.7rem]
                    hover:animate-bounce'/>
                </button>

                <button>
                    <img src={pinterest} alt="pinterest" className='hover:bg-yellow-200 hover:rounded-full w-[2.5rem]
                    hover:animate-bounce'/>
                </button>

                <button>
                    <img src={youtube} alt="youtube" className='hover:bg-yellow-200 hover:rounded-full w-[2.5rem]
                    hover:animate-bounce'/>
                </button>
            </div>
        </div>
    </div>
  )
}
