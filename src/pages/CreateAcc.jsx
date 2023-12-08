import React, { useState } from 'react'
import warning from '../assets/warning.svg';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const CreateAcc = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  const navigate = useNavigate(); 

  const handleInput = (input) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setIsValid(emailRegex.test(input));

    setIsEmpty(input.trim('') === '');
  }

  const handleRegister = async () => {
    try {
        const response = await axios.post('/register', { email, password });

        if (response.status === 200) {
            console.log('Registration successful');
            navigate('/login')

        } else {
            console.log('Registration failed');
        }

    } catch (error) {
        console.error('Error during registration:', error.message);
    }
  }

  return (
    <div className='flex flex-col items-center lg:pb-[8rem]' id='container-create-acc'>
        <div className="" id="content-table-create-acc">
            <div className="text-center" id="header-text">

                <Link to='/'>
                    <h1 className='text-yellow-200 font-bold tracking-widest text-[2.5rem]'>
                        Sweetie
                    </h1>
                </Link> 
            </div>

            <div
            className="flex items-center flex-col space-y-7 shadow-md w-[20rem] shadow-yellow-200
            py-10 rounded-md border-solid border-[1px] border-yellow-300"
            id="input-table-create-acc">
                <div 
                className="flex flex-col space-y-1 text-start"
                id="email-input-create-acc">
                    <label htmlFor="text" 
                    className='text-white font-mono font-medium'>
                        Email
                    </label>
                    
                    <input 
                    onChange={(e) => {
                        handleInput(e.target.value);
                        setEmail(e.target.value);
                    }}
                    value={email}
                    type="text" 
                    placeholder='example@email.com.'
                    className={`w-[15rem] h-[2.5rem] rounded-md pl-3 focus:outline-none
                    focus:border-solid focus:border-[1px] focus:border-yellow-600
                    duration-75 ${!isValid || isEmpty ? 'border-red-600 border-solid border-2 text-red-400' : ''}`}/>

                    {isEmpty && (
                        <h4 className='text-sm text-red-600 font-medium'>
                            Email is required.
                        </h4>
                    )}
                    {!isValid && !isEmpty && (
                        <h4 className='text-sm text-red-600 font-medium'>Please enter a valid email.</h4>
                    )}
                    
                </div>

                <div 
                className="flex flex-col space-y-1 text-start"
                id="password-input-create-acc">
                    <label htmlFor="text" 
                    className='text-white font-mono font-medium'>
                        Password
                    </label>
                    
                    <input 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password" 
                    placeholder='Password'
                    className='w-[15rem] h-[2.5rem] rounded-md pl-3 focus:outline-none
                    focus:border-solid focus:border-[1px] focus:border-yellow-600
                    duration-75'/>
                </div>

                <hr className='w-full opacity-[30%] relative top-4'/>

                <div className="flex flex-row items-center p-5 space-x-3" id="privacy-policy">
                    <img src={warning} alt="warning" className='w-[2.5rem]'/>

                    <p className='leading-relaxed text-[#ecebeb]'>
                    Your personal data will be used to support your experience throughout this website,
                    to manage access to your account, and for other purposes described in our privacy policy.
                    </p>
                </div>

                <div className="" id="sign-up-button">
                    <button 
                    onClick={handleRegister}
                    className='bg-gradient-to-r from-green-500 to-green-600
                    w-[7rem] h-[2.5rem] rounded-md text-white font-bold tracking-wide
                    active:from-gray-300 active:to-gray-400 hover:animate-pulse duration-300'>
                        Sign up
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}
