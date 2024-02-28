import React from 'react'
import { FaInstagramSquare, FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"
function Footer() {
    return (
      <div className=' bg-custom-50 p-10 '>
            
            <div className=' m-10  justify-between md:flex'>
                <div className='text-2xl text-custom-10 font-bold m-2' >CONNECT WITH US</div>
                <div className=' text-custom-10 gap-4 flex m-2'>
                    <FaGithub size={32}/>
                    <FaLinkedin size={32}/>
                    <FaXTwitter  size={32}/>
                </div>
            </div>
            <hr className='h-px my-8 border-0 dark:bg-custom-10 m-7 border-dashed ' />
        <div className='h-[35px] ml-20 mr-20 text-custom-10 font-serif text-center'>PLOT_PALETTE </div>    
    </div>
  )
}

export default Footer
