import React from 'react'
import Navbar from './Navbar'
import Footer from '../components/Footer'
import { MdOutlineSportsScore, MdLocalMovies } from "react-icons/md";
import { IoBookSharp } from "react-icons/io5";
function AccountPage() {
    return (
        <>
            <Navbar />
            <div className='bg-custom-10 grid-cols-4 grid mt-20 p-4'>
               
                <div className=' col-span-3 flex m-3 gap-2 '>
                    <div className='grid grid-rows-3 gap-2 bg-custom-50 p-5'>
                        <div className='row-span-2 text-custom-30 bg-custom-40'>
                           <h1>enter collections</h1>
                        </div>
                        <div className=' bg-custom-40'>
                            <h1>Recent likes</h1>
                            <h1>Liked movies</h1>
                        </div>

                    </div>

                  
                </div>

                <div className=' w-max h-max border rounded-lg bg-white m-1 '>
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