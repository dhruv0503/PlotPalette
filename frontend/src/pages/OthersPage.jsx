import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from './Navbar'
import Footer from '../components/Footer'
import { Flex, Button, Grid, Box, Text, Strong } from '@radix-ui/themes'
import { MdOutlineSportsScore, MdLocalMovies } from "react-icons/md";
import { FaInstagramSquare, FaGithub, FaLinkedin } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';
import { IoBookSharp } from "react-icons/io5";
import { useApi } from '../Context/Contxt';
import * as Avatar from '@radix-ui/react-avatar';
import { MagicWandIcon, PersonIcon, BookmarkIcon, FileTextIcon, HeartFilledIcon, EyeClosedIcon, StarIcon, StarFilledIcon, PlusIcon } from '@radix-ui/react-icons'
import { CardStackPlusIcon, EyeOpenIcon, MixerHorizontalIcon,  } from '@radix-ui/react-icons';
import NoPage from './NoPage'

export default React.memo(function OthersPage() {

    const { setUserDataId, otheruserData, setotheruserData } = useApi();

    const { UserID } = useParams()
    const [searchResults, setSearchResults] = useState()
  

   
    const handleSearchChange = (e) => {
        setSearchResults(e.target.value);
    };
    useEffect(() => {
        const allUsers = async (e) => {

            try {
                const response = await axios.get(`https://plot-palette-server.vercel.app/api/users/search?userName=${UserID}`);
                setotheruserData(response.data);
            } catch (error) {
                console.error('Error in getting all users:', error.message)
            }
        };
        allUsers();
    }, []);

    setUserDataId(otheruserData?.id);
            
            


    const handleAddfriend = async () => {
     
        try {
            const response = await axios.post(`https://plot-palette-server.vercel.app/api/friend/send?userId=${otheruserData.id}`);
           
        } catch (error) {
            console.error('Error in getting all users:', error.message)
        }
    };


 
    const navigate = useNavigate();
    console.log(otheruserData)

    function formatDate(dateString) {
        try {
            // Split the date string into components with validation
            const parts = dateString.split(", ");
            if (parts.length !== 2) {
                throw new Error("Invalid date format. Missing components.");
            }
            const date = parts[0].split("/");
            if (date.length !== 3) {
                throw new Error("Invalid date format. Missing date components.");
            }

            // Extract day, month, and year as integers
            const day = parseInt(date[0], 10);
            const month = parseInt(date[1], 10);
            const year = parseInt(date[2], 10);

            // Validate date components
            if (day < 1 || day > 31 || month < 1 || month > 12) {
                throw new Error("Invalid date components. Day or month out of range.");
            }

            // Month names array (adjust for desired language)
            const monthNames = ["January ", "February ", "March ", "April ", "May ", "June ",
                "July ", "August ", "September ", "October ", "November ", "December "];

            // Validate month and get month name in proper case
            const monthName = monthNames[month - 1].charAt(0).toUpperCase() + monthNames[month - 1].slice(1).toLowerCase();

            return [monthName, year];
        } catch (error) {
            console.error("Error: Invalid date format. Please provide a string in the format 'DD/MM/YYYY, HH:MM:SS pm'.", error);
            return null;
        }
    }

    return (
    <>
            {
                otheruserData ?
                    <>
                        < section className='bg-custom-30' >
                            <div className='bg-gray-900'  ><Navbar className /></div>
                            <div className='col-span-full lg:col-span-2  overflow-hidden flex relative p-8 rounded-xl  border  border-gray-800' >
                                <div class="relative flex flex-col bg-clip-border rounded-xl bg-gray-900 text-custom-20 h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
                                    <div class="mb-2 p-4">
                                        <h5 class="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug ">User Profile</h5>
                                    </div>
                                    <nav class="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700">
                       
                                        <div role="button" onClick={() => navigate(`/account/${UserID}/favourite`)} tabindex="0" class="flex items-center w-full p-3  text-custom-20 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">
                                            <div class="grid place-items-center mr-4">
                                                <HeartFilledIcon height={24} width={24} />
                                            </div> Favourite
                                        </div>
                                        <div onClick={() => navigate(`/account/${UserID}/rating`)} role="button" tabindex="0" class="flex items-center w-full p-3  text-custom-20 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">
                                            <div class="grid place-items-center mr-4">
                                                <StarFilledIcon height={24} width={24} />
                                            </div> Rated
                                        </div>
                                        <div onClick={() => navigate(`/account/${UserID}/watchLater`)} role="button" tabindex="0" class="flex items-center w-full p-3  text-custom-20 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">
                                            <div class="grid place-items-center mr-4">
                                                <CardStackPlusIcon height={24} width={24} />
                                            </div> WatchLater
                                        </div>
                                        <div onClick={() => navigate(`/account/${UserID}/watched`)} className="flex items-center w-full p-3  text-custom-20 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">
                                            <div class="grid place-items-center mr-4" onClick={() => navigate("/collections/watched")} >
                                                <EyeOpenIcon height={24} width={24} />
                                            </div> Watched
                                        </ div>
                                    </nav>
                                </div>
                                <div class="py-15">

                                    <div class="mx-auto px-6 max-w-6xl text-gray-500">
                                        <div class="relative">
                                            <div class="relative z-10 grid gap-3 grid-cols-6">
                                                <div class="col-span-full lg:col-span-3  overflow-hidden flex relative p-8 rounded-xl  border  border-gray-800 bg-gray-900  justify-center  ">
                                                    <div class="size-fit m-auto relative">
                                                        <div class="relative h-28 w-56 flex flex-col items-center">
                                                            <Text size={"7"} className='text-custom-20' >{otheruserData?.name}</Text>                                                   <Button
                                                                variant='outline' onClick={() => navigate(`/account/${UserID}/friend`)} className=' text-custom-20  p-2 rounded-lg p-1 m-2 border border-custom-30'   > <Text>
                                                                    FriendCount: {otheruserData?.friendCount}</Text>
                                                            </Button>
                                                            <Text className='' >{formatDate(otheruserData?.joinedOn)}</Text>
                                                            <button onClick={handleAddfriend} className='bg-custom-20 rounded-lg p-1 text-custom-30 flex items-center' >Add Friend <PlusIcon height={20} width={20} /></button>

                                                        </div>

                                                    </div>
                                                </div>
                                                <div class="col-span-full lg:col-span-3  overflow-hidden flex relative p-8 rounded-xl  border  border-gray-800 bg-gray-900  justify-center  ">
                                                    <div className='relative' >
                                                        <div class=" items-center justify-center relative aspect-square rounded-full size-32 flex border mx-auto bg-white bg-white/5 border-white/10 before:absolute before:-inset-2 before:border before:border-white/5 before:bg-white/5 before:rounded-full">
                                                            <PersonIcon className='text-custom-10' height={96} width={96} />
                                                        </div>
                                                        <div class="mt-6 text-center relative z-10 space-y-2">
                                                            <h2 class="text-lg font-medium  transition group-hover:text-purple-950 text-white">{otheruserData?.name} BIO</h2>
                                          
                                                            <p className=" text-custom-20">{otheruserData?.bio}</p>
                                         
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* map this area */}
                                                <div className="text-custom-20  col-span-6  overflow-hidden relative p-8 rounded-xl  border-gray-800 bg-gray-900 flex justify-center " > <Text size={"7"} >Favourites </Text> </div>
                                                {otheruserData?.movies?.map((movie, index) => (
                                                    <>
                                                        {movie.favourite ? (
                                                            <div onClick={()=>navigate(`/movies/${movie.tmdbId}`)} class=" text-custom-20 md:col-span-2 col-span-3  overflow-hidden relative p-8 rounded-xl  border-gray-800 bg-gray-900 ">
                                                                <img className="border border-custom-20" src={`https://image.tmdb.org/t/p/original/${movie.poster}`} />

                                                            </div>
                                                        ) : (
                                                            <></>
                                                        )}
                                                    </>
                                                ))}
                                            
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Footer />
                        </section >
              
                    </> :
    
                    <>
                        <NoPage />
                    </>
            }
    </>

    )
});
