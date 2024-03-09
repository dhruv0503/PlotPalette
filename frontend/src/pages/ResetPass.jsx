import React,{useState,useEffect} from 'react'
import Navbar from './Navbar'
import axios from 'axios';






function ResetPass() {
  const [email, setEmail] = useState('');

  // const handleInputChange = (event) => {
  //   setEmail(event.target.value);
  // };
    

  const handleInputChange = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/forgetPassword', { email });
     console.log(response); 
    } catch (error) {
      console.error('Error signing in:', error.message);
      
    }
  };

  return (
      <>
        <div className='bg-gray-900' ><Navbar/></div>
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
        </>
  )
  }
export default ResetPass
