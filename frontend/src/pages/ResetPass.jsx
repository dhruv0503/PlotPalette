import React from 'react'
import Navbar from './Navbar'

function ResetPass() {
  return (
      <>
        <div className='bg-gray-900' ><Navbar/></div>
      <div class="p-6 container bg-custom-30 ">
               
              <div class="flex justify-center mt-12">
                  <input class="bg-gray-100 rounded-lg  text-base leading-none text-gray-800 p-5 w-4/5 border border-transparent focus:outline-none focus:border-gray-500" type="email" placeholder="Email" />
                  
              </div>
              <div class="flex justify-center mt-12">
                  <input class="bg-gray-100 rounded-lg  text-base leading-none text-gray-800 p-5 w-4/5 border border-transparent focus:outline-none focus:border-gray-500" type="email" placeholder=" password" />
          
              </div>
              <div class="flex justify-center mt-12">
                  <input class="bg-gray-100 rounded-lg  text-base leading-none text-gray-800 p-5 w-4/5 border border-transparent focus:outline-none focus:border-gray-500" type="email" placeholder="confirm Password" />
                  

              </div>
              <div className='justify-center flex m-7' >
                  <button className='bg-gray-900 p-5 text-custom-20 rounded-lg border border-custom-20 ' >Reset Password</button>
              </div>
              
        
          </div>
        </>
  )
}

export default ResetPass
