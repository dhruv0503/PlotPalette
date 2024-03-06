import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from './Navbar'
import Footer from '../components/Footer'
import { Flex, Button, Grid, Box, Text ,Strong } from '@radix-ui/themes'
import { MdOutlineSportsScore, MdLocalMovies } from "react-icons/md";
import { FaInstagramSquare, FaGithub, FaLinkedin } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { IoBookSharp } from "react-icons/io5";
import { useApi } from '../Context/Contxt';
import * as Avatar from '@radix-ui/react-avatar';

import { MagicWandIcon, PersonIcon, BookmarkIcon, FileTextIcon, HeartFilledIcon, EyeClosedIcon, StarIcon, StarFilledIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons'


export default React.memo(function AccountPage() {
    const [searchResults, setSearchResults] = useState()
    const [alluser, setalluser] = useState([]);
    const [findUser, setFindUser] = useState();
    const [finduserData, setFinduserData] = useState([]);
    const handleSearchChange = (e) => {
        setSearchResults(e.target.value);
    };

    useEffect(() => {
        const searchUserData = async () => {
            try {
                const UserSearch = await axios.get(`http://localhost:5000/api/users/search?userName=${findUser}`)
                
                setFinduserData(UserSearch.data);
            } catch (error) {
                console.error('Error fetching movies:', error.message);
            }
        };
        searchUserData();
    }, [findUser])


    const { userData } = useApi();
    const navigate = useNavigate();
    console.log(userData)
  

    useEffect(() => {
       
        if (!localStorage.getItem("uid")) {
            console.log("User not logged in. Navigating to signin page.");
            navigate('/signin');
        }
    }, [userData , navigate]);

   
    function formatDate(inputDate) {
        const date = new Date(inputDate);
        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear();
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const monthName = months[monthIndex];
        return `${day} ${monthName} ${year}`;
    }
   
 
    return (
        <>
            {localStorage.getItem("uid")?
              
                <section className='bg-custom-30'>
                    <div className='bg-gray-900'  ><Navbar className /></div>
                  
                <div class="p-2 relative mx-auto text-gray-600 ">
                    <div className='flex items-center' >
                    <input
                        className="border-2 border-gray-300 bg-white h-10 px-5  rounded-lg text-sm focus:outline-none"
                        value={searchResults}
                        onChange={(e) => setSearchResults(e.target.value)}
                        type="search"
                        name="search"
                        placeholder="Search User"
                    />
                    <button
                        type="button"
                        className=" m-3 "
                            onClick={() => navigate(`/account/${searchResults}`)}
                    >
                        <MagnifyingGlassIcon height={24} width={24} className="text-white" />
                    </button>
                      </div>
                    </div>
                <div class="py-16">
                        
        <div class="mx-auto px-6 max-w-6xl text-gray-500">
            <div class="relative">
                <div class="relative z-10 grid gap-3 grid-cols-6">
                    <div class="col-span-full lg:col-span-2  overflow-hidden flex relative p-8 rounded-xl bg-white border border-gray-200 dark:border-gray-800 dark:bg-gray-900">
                        <div class="size-fit m-auto relative">
                            <div class="relative h-24 w-56 flex flex-col items-center">
                                                <Text size={"7"} className='text-custom-20' >{userData?.name}</Text>                                                <Text>
                                                    FriendCount: {userData?.friendCount}</Text>
                                                <Text>{formatDate(userData?.joinedOn)}</Text>
                                 
                            </div>
                            
                        </div>
                    </div>
                    <div class="col-span-full sm:col-span-3 lg:col-span-2 overflow-hidden relative p-8 rounded-xl bg-white border border-gray-200 dark:border-gray-800 dark:bg-gray-900">
                        <div className='relative' >
                                            <div class=" items-center justify-center relative aspect-square rounded-full size-32 flex border mx-auto bg-white dark:bg-white/5 dark:border-white/10 before:absolute before:-inset-2 before:border dark:before:border-white/5 dark:before:bg-white/5 before:rounded-full">
                                            <PersonIcon className='text-custom-10' height={96} width={96} />            
                            </div>
                            <div class="mt-6 text-center relative z-10 space-y-2">
                                                <h2 class="text-lg font-medium text-gray-800 transition group-hover:text-purple-950 dark:text-white">{userData?.name} BIO</h2>
                                                <p class="dark:text-gray-300 text-gray-700">{userData?.bio}</p>
                            </div>
                        </div>
                    </div>
                                    <div class="col-span-full sm:col-span-3 lg:col-span-2 overflow-hidden relative p-8 rounded-xl bg-white border border-gray-200 dark:border-gray-800 dark:bg-gray-900">
                                        <Text size={"6"} className='justify-center text-custom-10 font-bold m-3 flex' >COLLECTION</Text>
                                        <Flex gap="3" className=' grid grid-cols-2'>
                                            <Button  onClick={()=>navigate('/collections/Watched')} className='bg-custom-30 p-7 ' variant="classic">
                                                <FileTextIcon height={32} width={32} />
                                                <Text><Strong>Watched</Strong></Text>
                                            </Button>
                                            <Button onClick={() => navigate('/collections/rated')}  className='bg-custom-30 p-7 ' variant='classic'  >
                                                <HeartFilledIcon width={24} height={24} />
                                                <Text><Strong>Rated</Strong></Text>
                                            </Button>

                                            <Button onClick={() => navigate('/collections/yettowatch')} className='bg-custom-30 p-7 ' variant="classic">
                                                <EyeClosedIcon width={24} height={24} />

                                                <Text><Strong>Yet To Watch</Strong></Text>
                                            </Button>
                                            <Button onClick={() => navigate('/collections/fav')} className='bg-custom-30 p-7' variant="classic">
                                                <StarFilledIcon width={24} height={24} />
                                                <Text><Strong>Fav</Strong></Text>

                                            </Button>

                                        </Flex>
                                    </div>
                                    {/* map this area */}
                                    
                                    {userData?.movies?.map((movie, index) => (
                                    <>
                                        {movie.favourite ?
                                        <div class=" md:col-span-2 col-span-3  overflow-hidden relative p-8 rounded-xl bg-white border border-gray-200 dark:border-gray-800 dark:bg-gray-900 ">
                                           {movie.title}
                                            </div> :
                                            <></>
                                            }
                                    </>
                                    )
                                
                            )}
                                        
                                           
                                  
                                      
                    
                </div>
            </div>
        </div>
                    </div>
                <Footer/>
</section>
                :
                <>
                  <div className='bg-custom-30 h-screen' ></div>
                   
                </>
            }
    </>
    )
});
