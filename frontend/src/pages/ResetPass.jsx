import React, { useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { Callout } from '@radix-ui/themes';
import { useNavigate } from 'react-router-dom';
function ResetPass() {
  const [email, setEmail] = useState('');
  const [error, seterror] = useState(false);
  const navigate = useNavigate();
  const handleInputChange = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}api/forgetPassword`, { email });
      navigate('/')

    } catch (error) {
      console.error('Error signing in:', error.message);
      seterror(true);
    }
  };
  return (
    <div className='h-screen w-screen bg-custom-30'>
      <div className='bg-gray-900' ><Navbar /></div>
      {error && (<div className="p-7" > <Callout.Root>
        <Callout.Icon>
          <InfoCircledIcon />
        </Callout.Icon>
        <Callout.Text>
          No User with this email address exists
        </Callout.Text>
      </Callout.Root></div>)}

      <div class="p-6 container bg-custom-30 ">

        <div class="flex justify-center mt-12">
          <input
            className="bg-gray-100 rounded-lg text-base leading-none text-gray-800 p-5 w-4/5 border border-transparent focus:outline-none focus:border-gray-500"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className='justify-center flex m-7' >
          <button onClick={handleInputChange} className='bg-gray-900 p-5 text-custom-20 rounded-lg border border-custom-20 ' >Reset Password</button>
        </div>
      </div>
    </div>
  )
}
export default ResetPass
