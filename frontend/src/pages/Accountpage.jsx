import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from './Navbar'
import Footer from '../components/Footer'
import {Grid ,Box } from "@radix-ui/themes"
import { MdOutlineSportsScore, MdLocalMovies } from "react-icons/md";
import { FaInstagramSquare, FaGithub, FaLinkedin } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { IoBookSharp } from "react-icons/io5";
import { useApi } from '../Context/Contxt';
export default React.memo(function AccountPage() {
    const [searchResults, setSearchResults] = useState()
    const [alluser, setalluser] = useState([]);
    const handleSearchChange = (e) => {
        setSearchResults(e.target.value);
    };
    useEffect(() => {
        const allUsers = async (e) => {
          
            try {
                const response = await axios.get('http://localhost:5000/api/users/all');
                setalluser(response.data);

            } catch (error) {
                console.error('Error in getting all users:', error.message)
            }
        };
        allUsers();
    }, []);
    console.log(alluser)

    const { userData } = useApi();
    const navigate = useNavigate();
    return (
        <>
            {localStorage.getItem("uid")?
                <>
                    <Navbar />
                    <div className='bg-custom-30 grid gri md:grid-cols-4 md:grid mt-20 p-4'>
        
                        <div className=' w-max max-h-[500px] border rounded-lg bg-white m-1 '>
                            <div className='relative'>
                                <form onSubmit={() => navigate(`/search/${searchResults}`)} className='flex items-center text-gray-600'>
                                    <input type="text" name='search' placeholder='Search' className='pl-10 pr-5 py-2 placeholder-gray-500 text-black rounded-full' value={searchResults} onChange={handleSearchChange} />
                                    <svg className='absolute left-3 top-2' width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
                                    </svg>

                                </form>


                            </div>
           

                            <img className='h-[400px] border border-black p-2 rounded-md' src="https://i.ibb.co/ncrXc2V/1.png" alt=" no im" />
                            <table className='border-separate m-1 text-center  w-[300px] border border-slate-500 '>
                                <tbody>
                                    <tr>
                                        <td class="border border-slate-700 ...">{userData?.name}</td>
                                    </tr>
                                    <tr>
                                        <td class="border border-slate-700 ...">Friends: {userData?.friendCount}</td>
                                    </tr>
                                    <tr>
                                        <td class="border border-slate-700 ...">JOINED ON:{userData?.joinedOn}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className='col-span-3 '>
                            <div>
                                <div className=' h-[150px] gap-3 ml-3 font-bold mr-3 text-custom-50 text-xl grid grid-cols-4 md:grid md:grid-cols-4 font-mono border border-black rounded-lg bg-custom-40 p-3'>
                                    <div className='p-4  border border-gray-900 rounded-lg bg-custom-20'>
                   
                                        <p >Liked Movies </p>
                                        <button onClick={() => navigate('/account/favlist')} className=' bg-black rounded-md p-3 m-1 text-white '>Watch</button></div>
                                    <div className=' p-4 border border-gray-900 rounded-lg bg-custom-20'>
                                        <p>Recently Watched </p>
                                        <button onClick={() => navigate('/account/favlist')} className='bg-black rounded-md p-3 m-1 text-white '>Watch</button>
                                    </div>
                                    <div className='p-4 border border-gray-900 rounded-lg bg-custom-20'>
                                        <p>Watchlist </p>
                                        <button onClick={() => navigate('/account/favlist')} className='bg-black rounded-md p-3 m-1 text-white '>Watch</button></div>
                                    <div className='p-4 border border-gray-900 rounded-lg bg-custom-20' >
                                        <p>yet to watch </p>
                                        <button onClick={() => navigate('/account/favlist')} className='bg-black rounded-md p-3 m-1 text-white '>Watch</button>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-3 p-3">
                              
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
            
        
                    <Footer />
                </> :
                <p>LOGIN FIRST</p>
            }
    </>
    )
});
