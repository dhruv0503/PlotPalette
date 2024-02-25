import React from 'react'
import Navbar from './Navbar'
import Footer from '../components/Footer'
import {Grid ,Box } from "@radix-ui/themes"
import { MdOutlineSportsScore, MdLocalMovies } from "react-icons/md";
import { FaInstagramSquare, FaGithub, FaLinkedin } from "react-icons/fa";
import { IoBookSharp } from "react-icons/io5";
function AccountPage() {
    return (
        <>
            <Navbar />
            <div className='bg-custom-30 grid-cols-4 grid mt-20 p-4'>
        
                <div className=' w-max h-max border rounded-lg bg-white m-1 '>
                    <img className='h-[400px] border border-black p-2 rounded-md' src="https://i.ibb.co/ncrXc2V/1.png" alt=" no im" />
                    <table className='border-separate m-1 text-center  w-[300px] border border-slate-500 '>
                        <tbody>
                            <tr>
                                <td class="border border-slate-700 ...">NAME</td>
                            </tr>
                            <tr>
                                <td class="border border-slate-700 ...">FRIEND LIST</td>
                            </tr>
                            <tr>
                                <td class="border border-slate-700 ...">JOINED ON</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='col-span-3 '>
                    <div>
                    <div className=' h-[150px] gap-3 ml-3 font-bold mr-3 text-custom-50 text-xl md:grid md:grid-cols-4 font-mono border border-black rounded-lg bg-custom-40 p-3'>
                <div className='p-4  border border-gray-900 rounded-lg bg-custom-20'>
                    <FaInstagramSquare  color='black' size={32} />
                   <p >Liked Movies  </p></div>
                <div className='p-4 border border-gray-900 rounded-lg bg-custom-20'>
                    <FaInstagramSquare  color='black' size={32}  />
                    <p>Recently Watched </p></div>
                <div className='p-4 border border-gray-900 rounded-lg bg-custom-20'>
                    <FaInstagramSquare color='black' size={32} />
                    <p>Watchlist </p></div>
                <div className='p-4 border border-gray-900 rounded-lg bg-custom-20' >
                    <FaInstagramSquare color='black' size={32} />
                    <p>yet to watch </p></div>
                        </div>
                            <div className="grid grid-cols-3 p-3">
                              
                                <div className="w-1/1 p-1 m-1 bg-black  border border-black rounded-lg">
                                    <div className="bg-gray-200 h-32">Item 1</div>
                                </div>
                                <div className="w-1/1 p-1 m-1 bg-black  border border-black rounded-lg">
                                    <div className="bg-gray-200 h-32">Item 2</div>
                                </div>
                                <div className="w-1/1 p-1 m-1 bg-black  border border-black rounded-lg">
                                    <div className="bg-gray-200 h-32">Item 3</div>
                                </div>
                                <div className="w-1/1 p-1 m-1 bg-black  border border-black rounded-lg">
                                    <div className="bg-gray-200 h-32">Item 4</div>
                                </div>
                                <div className="w-1/1 p-1 m-1 bg-black  border border-black rounded-lg">
                                    <div className="bg-gray-200 h-32">Item 5</div>
                                </div>
                                <div className="w-1/1 p-1 m-1 bg-black  border border-black rounded-lg">
                                    <div className="bg-gray-200 h-32">Item 6</div>
                                </div>
                                <div className="w-1/1 p-1 m-1 bg-black  border border-black rounded-lg">
                                    <div className="bg-gray-200 h-32">Item 4</div>
                                </div>
                                <div className="w-1/1 p-1 m-1 bg-black  border border-black rounded-lg">
                                    <div className="bg-gray-200 h-32">Item 5</div>
                                </div>
                                <div className="w-1/1 p-1 m-1 bg-black  border border-black rounded-lg">
                                    <div className="bg-gray-200 h-32">Item 6</div>
                                </div>
                           
                </div>
            </div>
                </div>
            </div>
            
        
            <Footer/>
        </>
    )
}

export default AccountPage