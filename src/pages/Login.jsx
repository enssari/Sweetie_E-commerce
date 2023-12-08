import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Login = () => {
    const [isValid, setIsValid] = useState(true);
    const [isEmpty, setIsEmpty] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleInput = (input) => {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      setIsValid(emailRegex.test(input));
  
      setIsEmpty(input.trim('') === '');
    }

    const handleLogin = async () => {
        try {
            const response = await axios.post('/login', { email, password });

            if (response.status === 200) {
                console.log('Login successful');
                navigate('/');
            } else {
                setEmail('');
                setPassword('');
                console.log('Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error.message);
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
                  onBlur={(e) => handleInput(e.target.value)}
                  className="flex flex-col space-y-1 text-start"
                  id="email-input-create-acc">
                      <label htmlFor="text" 
                      className='text-white font-mono font-medium'>
                          Email
                      </label>
                      
                      <input 
                      onChange={(e) => setEmail(e.target.value)}
                      type="text" 
                      placeholder='example@email.com.'
                      className={`w-[15rem] h-[2.5rem] rounded-md pl-3 focus:outline-none
                      focus:border-solid focus:border-[1px] focus:border-yellow-600
                      duration-75 ${!isValid || isEmpty ? 'border-red-600 border-solid border-2 text-red-400' : ''}`}/>
  
                      {isEmpty && (
                          <h4 className='text-sm text-red-600 font-medium pl-3'>
                              Email is required.
                          </h4>
                      )}
                      {!isValid && !isEmpty && (
                          <h4 className='text-sm text-red-600 font-medium pl-3'>
                            Please enter a valid email.
                          </h4>
                      )}
                      
                  </div>
  
                  <div className="flex flex-col space-y-1 text-start"
                  id="password-input-create-acc">
                      <label htmlFor="text" 
                      className='text-white font-mono font-medium'>
                          Password
                      </label>
                      
                      <input 
                      onChange={(e) => setPassword(e.target.value)}
                      type="password" 
                      placeholder='Password'
                      className='w-[15rem] h-[2.5rem] rounded-md pl-3 focus:outline-none
                      focus:border-solid focus:border-[1px] focus:border-yellow-600
                      duration-75'/>
                  </div>
  
                  <hr className='w-full opacity-[30%] relative top-4'/>
  
                  <div className="" id="sign-up-button">
                      <button 
                      onClick={handleLogin}
                      className='bg-gradient-to-r from-green-500 to-green-600
                      w-[7rem] h-[2.5rem] rounded-md text-white font-bold tracking-wide
                      active:from-gray-300 active:to-gray-400 hover:animate-pulse duration-300'>
                          Log in
                      </button>
                  </div>
              </div>
          </div>
      </div>
    )
}
