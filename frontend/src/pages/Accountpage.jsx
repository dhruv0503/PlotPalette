import React from 'react'
import Navbar from './Navbar'
import Footer from '../components/Footer'
import { MdOutlineSportsScore, MdLocalMovies } from "react-icons/md";
import { IoBookSharp } from "react-icons/io5";
function AccountPage() {
    return (
        <>
            {/* <Navbar /> */}
            <div className='bg-custom-10 grid-cols-4 grid '>
               
                <div className=' col-span-3 flex m-3 gap-2'>
                    <div className='gap-2'>
                        <div className='p-10 justify-center   border border-gray-900 rounded-lg bg-custom-30'>
                            <div className='justify-center items-center'>
                            <h1>1000</h1>
                            <MdOutlineSportsScore size={64} /> 
                            </div>
                            <div className='flex justify-around gap-3'>
                                <div>
                                    <MdLocalMovies size={32} /> 100
                                    movies</div>
                                <div>
                                    <IoBookSharp size={32} />
                                    900
                                    books</div>
                            </div>
                        </div>

                        <div className='p-10 justify-center   border border-gray-900 rounded-lg bg-custom-30'>
                            <div className='justify-center items-center'>
                                <h1>1000</h1>
                                <MdOutlineSportsScore size={64} />
                            </div>
                            <div className='flex justify-around gap-3'>
                                <div>
                                    <MdLocalMovies size={32} /> 100
                                    movies</div>
                                <div>
                                    <IoBookSharp size={32} />
                                    900
                                    books</div>
                            </div>
                        </div>

                    </div> 
                    <div className=' '>
                    <div className='p-10  border border-gray-900 rounded-lg bg-custom-30'>
                           
                            <p >Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut ratione nisi veritatis velit iure! Ipsum atque quod ducimus cum rerum suscipit molestias qui aperiam? </p></div>
                        <div className='p-10  border border-gray-900 rounded-lg bg-custom-30'>

                            <p >Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut ratione nisi veritatis velit iure! Ipsum atque quod ducimus cum rerum suscipit molestias qui aperiam? </p></div>
                        <div className='p-10  border border-gray-900 rounded-lg bg-custom-30'>

                            <p >Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut ratione nisi veritatis velit iure! Ipsum atque quod ducimus cum rerum suscipit molestias qui aperiam? </p></div>
                        <div className='p-10  border border-gray-900 rounded-lg bg-custom-30'>

                            <p >Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut ratione nisi veritatis velit iure! Ipsum atque quod ducimus cum rerum suscipit molestias qui aperiam? </p></div>
                    </div>
                    
                </div>

                <div className=' w-max h-max border rounded-lg bg-white m-1'>
                    <img className='h-[400px] border border-black p-2 rounded-md' src="https://i.ibb.co/ncrXc2V/1.png" alt=" no im" />
                    <table className='border-separate m-1 text-center  w-[300px] border border-slate-500 '>
                        <tbody>
                            <tr>
                                <td class="border border-slate-700 ...">NAME</td>
                            </tr>
                            <tr>
                                <td class="border border-slate-700 ...">GENDER</td>
                            </tr>
                            <tr>
                                <td class="border border-slate-700 ...">JOINED ON</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div >
        
            <Footer/>
        </>
    )
}

export default AccountPage