import React from 'react'
import Footer from '../components/Footer';
import {PiBooksBold} from "react-icons/pi"

const im = "https://i.ibb.co/ncrXc2V/1.png";

function Aboutsus() {
    return (
        <>
        <div className='bg-custom-20 p-5 font-mono'>
            <h1 className='text-center text-custom-50 ml-2 mr-2 text-5xl italics underline underline-offset-4 mb-4'>ABOUT US</h1>
            <div className='flex ml-10 mr-10 gap-3 justify-between p-3 font-bold text-custom-50 underline underline-offset-4'>
                <div className='border bg-custom-40 p-3 border-black rounded-lg '><PiBooksBold size={32} /></div>
                <div className='flex gap-20'>
                <div>HOMEPAGE</div>
                <div>BOOKS</div>
                <div>MOVIES</div>
                 <div>CONTACT US</div>
                </div>
                <div >
                   <button className='p-2 bg-custom-40 rounded-lg border border-black'> ACCOUNT</button>
                </div>
            </div>
            
            <div className='flex justify-around '>
            <svg  width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.35248 4.90532C1.35248 2.94498 2.936 1.35248 4.89346 1.35248C6.25769 1.35248 6.86058 1.92336 7.50002 2.93545C8.13946 1.92336 8.74235 1.35248 10.1066 1.35248C12.064 1.35248 13.6476 2.94498 13.6476 4.90532C13.6476 6.74041 12.6013 8.50508 11.4008 9.96927C10.2636 11.3562 8.92194 12.5508 8.00601 13.3664C7.94645 13.4194 7.88869 13.4709 7.83291 13.5206C7.64324 13.6899 7.3568 13.6899 7.16713 13.5206C7.11135 13.4709 7.05359 13.4194 6.99403 13.3664C6.0781 12.5508 4.73641 11.3562 3.59926 9.96927C2.39872 8.50508 1.35248 6.74041 1.35248 4.90532Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.35248 4.90532C1.35248 2.94498 2.936 1.35248 4.89346 1.35248C6.25769 1.35248 6.86058 1.92336 7.50002 2.93545C8.13946 1.92336 8.74235 1.35248 10.1066 1.35248C12.064 1.35248 13.6476 2.94498 13.6476 4.90532C13.6476 6.74041 12.6013 8.50508 11.4008 9.96927C10.2636 11.3562 8.92194 12.5508 8.00601 13.3664C7.94645 13.4194 7.88869 13.4709 7.83291 13.5206C7.64324 13.6899 7.3568 13.6899 7.16713 13.5206C7.11135 13.4709 7.05359 13.4194 6.99403 13.3664C6.0781 12.5508 4.73641 11.3562 3.59926 9.96927C2.39872 8.50508 1.35248 6.74041 1.35248 4.90532Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.35248 4.90532C1.35248 2.94498 2.936 1.35248 4.89346 1.35248C6.25769 1.35248 6.86058 1.92336 7.50002 2.93545C8.13946 1.92336 8.74235 1.35248 10.1066 1.35248C12.064 1.35248 13.6476 2.94498 13.6476 4.90532C13.6476 6.74041 12.6013 8.50508 11.4008 9.96927C10.2636 11.3562 8.92194 12.5508 8.00601 13.3664C7.94645 13.4194 7.88869 13.4709 7.83291 13.5206C7.64324 13.6899 7.3568 13.6899 7.16713 13.5206C7.11135 13.4709 7.05359 13.4194 6.99403 13.3664C6.0781 12.5508 4.73641 11.3562 3.59926 9.96927C2.39872 8.50508 1.35248 6.74041 1.35248 4.90532Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.35248 4.90532C1.35248 2.94498 2.936 1.35248 4.89346 1.35248C6.25769 1.35248 6.86058 1.92336 7.50002 2.93545C8.13946 1.92336 8.74235 1.35248 10.1066 1.35248C12.064 1.35248 13.6476 2.94498 13.6476 4.90532C13.6476 6.74041 12.6013 8.50508 11.4008 9.96927C10.2636 11.3562 8.92194 12.5508 8.00601 13.3664C7.94645 13.4194 7.88869 13.4709 7.83291 13.5206C7.64324 13.6899 7.3568 13.6899 7.16713 13.5206C7.11135 13.4709 7.05359 13.4194 6.99403 13.3664C6.0781 12.5508 4.73641 11.3562 3.59926 9.96927C2.39872 8.50508 1.35248 6.74041 1.35248 4.90532Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
            </div>

            
            <hr className='h-px my-8 bg-gray-200  dark:bg-gray-700 m-7 border-dashed' />
            <div className='m-4 grid grid-cols-3 gap-10'>
                <img className=' border border-gray-900 h-[400px] w-[400px] rounded-lg shadow-2xl' src={im} alt='no im' />
                <img className=' border border-gray-900  h-[400px] w-[400px] rounded-lg shadow-2xl' src='https://i.ibb.co/XXR8kzF/3.png' alt='no im' />
                <img className='border border-gray-900  h-[400px] w-[400px] rounded-lg shadow-2xl' src='https://i.ibb.co/B3s7v4h/2.png' alt='no im' />
            </div>
            <hr className='h-px my-8 bg-gray-700  dark:bg-gray-700 m-7 border-dashed ' />
           <div className=' grid grid-cols-3 gap-3 m-3'>
         
                <div className='text-custom-50 italic text-xl   '>
             Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, ratione, cum quisquam tenetur possimus, rerum omnis nisi repellendus quibusdam dignissimos pariatur voluptatem in nobis modi facilis. Modi perferendis repudiandae sint. 
          </div>
                <div className='antialiased text-xl text-custom-50 italic '>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque dicta laudantium magnam vel. Velit dolorum molestias pariatur ipsa ex necessitatibus odio alias doloremque, accusamus, natus quibusdam iusto perspiciatis placeat laudantium?  
           </div>
                <div className=' text-xl text-custom-50 italic'>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque dicta laudantium magnam vel. Velit dolorum molestias pariatur ipsa ex necessitatibus odio alias doloremque, accusamus, natus quibusdam iusto perspiciatis placeat laudantium?
            </div>
            </div>
            <hr className='h-px my-8 bg-gray-200 border-0 dark:bg-gray-700 m-7 border-dashed' />
        </div>
        <Footer/>
        </>

  )
}

export default Aboutsus
