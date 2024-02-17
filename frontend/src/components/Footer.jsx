import React from 'react'
import { FaInstagramSquare, FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"
function Footer() {
    return (
      <div className=' bg-custom-50 p-10 '>
            <div className=' gap-3 ml-3 font-bold mr-3 text-custom-50 text-xl md:grid md:grid-cols-4 font-mono border border-black rounded-lg bg-custom-40 p-3'>
                <div className='p-4  border border-gray-900 rounded-lg bg-custom-20'>
                    <FaInstagramSquare  color='black' size={32} />
                   <p >Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut ratione nisi veritatis velit iure! Ipsum atque quod ducimus cum rerum suscipit molestias qui aperiam? </p></div>
                <div className='p-4 border border-gray-900 rounded-lg bg-custom-20'>
                    <FaInstagramSquare  color='black' size={32}  />
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut ratione nisi veritatis velit iure! Ipsum atque quod ducimus cum rerum suscipit molestias qui aperiam? </p></div>
                <div className='p-4 border border-gray-900 rounded-lg bg-custom-20'>
                    <FaInstagramSquare color='black' size={32} />
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut ratione nisi veritatis velit iure! Ipsum atque quod ducimus cum rerum suscipit molestias qui aperiam? </p></div>
                <div className='p-4 border border-gray-900 rounded-lg bg-custom-20' >
                    <FaInstagramSquare color='black' size={32} />
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut ratione nisi veritatis velit iure! Ipsum atque quod ducimus cum rerum suscipit molestias qui aperiam? </p></div>

            </div>
            <div className=' m-10  justify-between flex'>
                <div className='text-2xl text-custom-10 font-bold' >CONNECT WITH US ON</div>
                <div className=' text-custom-10 gap-4 flex'>
                    <FaGithub size={32}/>
                    <FaLinkedin size={32}/>
                    <FaXTwitter  size={32}/>
                </div>
            </div>
            <hr className='h-px my-8 border-0 dark:bg-custom-10 m-7 border-dashed ' />
        <div className='h-[35px] ml-20 mr-20 text-custom-10 font-serif'>Lorem ipsum  sit  adipisicing elit. Repellendus iusto cum exped. enim quam id. In non consequatur soluta incidunt? Dolor, qui facere.</div>    
    </div>
  )
}

export default Footer
