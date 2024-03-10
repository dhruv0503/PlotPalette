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

export default React.memo(function OthersPage() {

    const { setUserDataId, otheruserData, setotheruserData } = useApi();

    const {UserID} = useParams()
    const [searchResults, setSearchResults] = useState()
  

   
    const handleSearchChange = (e) => {
        setSearchResults(e.target.value);
    };
    useEffect(() => {
        const allUsers = async (e) => {

            try {
                const response = await axios.get(`http://localhost:5000/api/users/search?userName=${UserID}`);
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
            const response = await axios.post(`http://localhost:5000/api/friend/send?userId=${otheruserData.id}`);
           
        } catch (error) {
            console.error('Error in getting all users:', error.message)
        }
    };


    // const { otheruserData } = useApi();
    const navigate = useNavigate();


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
                <section className='bg-custom-30'>
                    <div className='bg-gray-900'  ><Navbar className /></div>
                    <div class="py-16">

                        <div class="mx-auto px-6 max-w-6xl text-gray-500">
                            <div class="relative">
                                <div class="relative z-10 grid gap-3 grid-cols-6">
                                    <div class="col-span-full lg:col-span-2 overflow-hidden flex relative p-10 rounded-xl  border bord border-gray-800 bg-gray-900">
                                        <div class="size-fit m-auto relative">
                                            <div class="relative h-28 w-56 flex flex-col items-center">
                                            <Text size={"7"} className='text-custom-20' >{otheruserData?.name}</Text>                                                   <Button
                                              variant='outline'  onClick={() => navigate(`/account/${UserID}/friend`)} className= ' text-custom-20  p-2 rounded-lg p-1 m-2 border border-custom-30'   > <Text>
                                                FriendCount: {otheruserData?.friendCount}</Text>
                                            </Button>
                                            <Text className='' >{formatDate(otheruserData?.joinedOn)}</Text>
                                            <button onClick={handleAddfriend} className='bg-custom-20 rounded-lg p-1 text-custom-30 flex items-center' >Add Friend <PlusIcon height={20} width={20} /></button>

                                            </div>

                                        </div>
                                    </div>
                                    <div class="col-span-full sm:col-span-3 lg:col-span-2 overflow-hidden relative p-8 rounded-xl  border  border-gray-800 bg-gray-900">
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
                                    <div class="col-span-full sm:col-span-3 lg:col-span-2 overflow-hidden relative p-8 rounded-xl border-gray-800 bg-gray-900">
                                        <Text size={"6"} className='justify-center text-custom-10 font-bold m-3 flex' >COLLECTION</Text>
                                        <Flex gap="3" className=' grid grid-cols-2'>
                                        <Button onClick={() => navigate(`/account/${UserID}/watched`)} className='bg-custom-30 p-7 ' variant="classic">
                                                <FileTextIcon height={32} width={32} />
                                               <Text><Strong>Watched</Strong></Text>
                                            </Button>
                                        <Button onClick={() => navigate(`/account/${UserID}/rating`)} className='bg-custom-30 p-7 ' variant='classic'  >
                                                <HeartFilledIcon width={24} height={24} />
                                                <Text><Strong>Rated</Strong></Text>
                                            </Button>

                                        <Button onClick={() => navigate(`/account/${UserID}/watchLater`)} className='bg-custom-30 p-7 ' variant="classic">
                                            <EyeClosedIcon width={24} height={24} />

                                            <Text><Strong>Yet To Watch</Strong></Text>
                                            </Button>
                                        <Button onClick={() => navigate(`/account/${UserID}/favourite`)} className='bg-custom-30 p-7' variant="classic">
                                            <StarFilledIcon width={24} height={24} />
                                            <Text><Strong>Fav</Strong></Text>

                                            </Button>

                                        </Flex>
                                    </div>
                                 
                                

                                {/* map this area */}
                                <div class=" md:col-span-2 col-span-3  overflow-hidden relative p-8 rounded-xl  border  border-gray-800 bg-gray-900 ">

                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </section>
              
        </>
    )
});
