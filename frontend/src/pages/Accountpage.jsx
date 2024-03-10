import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "../components/Footer";
import { Flex, Button, Grid, Box, Text, Strong ,TextArea } from "@radix-ui/themes";
import { MdOutlineSportsScore, MdLocalMovies } from "react-icons/md";
import { FaInstagramSquare, FaGithub, FaLinkedin } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IoBookSharp } from "react-icons/io5";
import { useApi } from "../Context/Contxt";
import * as Avatar from "@radix-ui/react-avatar";
import * as Popover from '@radix-ui/react-popover';
import { MixerHorizontalIcon  } from '@radix-ui/react-icons';


import {
  MagicWandIcon,
  PersonIcon,
  BookmarkIcon,
  FileTextIcon,
  HeartFilledIcon,
  EyeClosedIcon,
  StarIcon,
  StarFilledIcon,
  MagnifyingGlassIcon,
  DotsVerticalIcon,
  CheckIcon,
  Cross2Icon,
} from "@radix-ui/react-icons";

export default React.memo(function AccountPage() {
  const [searchResults, setSearchResults] = useState();
  const [bio, setUserBio] = useState();
  const [alluser, setalluser] = useState([]);
  const [findUser, setFindUser] = useState();
  const [finduserData, setFinduserData] = useState([]);
  const handleSearchChange = (e) => {
    setSearchResults(e.target.value);
  };
  
    const handleBio = async () => {
      try {
        const response = await axios.post(
          `http://localhost:5000/api/users/bio`, {bio}
        );
        console.log(response);
      } catch (error) {
        console.error("Error fetching movies:", error.message);
      }
    };
  
  



  useEffect(() => {
    const searchUserData = async () => {
      try {
        const UserSearch = await axios.get(
          `http://localhost:5000/api/users/search?userName=${findUser}`
        );

        setFinduserData(UserSearch.data);
      } catch (error) {
        console.error("Error fetching movies:", error.message);
      }
    };
    searchUserData();
  }, [findUser]);

  const { userData } = useApi();
  const [isopen, setisopen] = useState(false);

  const navigate = useNavigate();
  console.log(userData);

  useEffect(() => {
    if (!localStorage.getItem("uid")) {
      console.log("User not logged in. Navigating to signin page.");
      navigate("/signin");
    }
  }, [userData, navigate]);

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const monthName = months[monthIndex];
    return `${day} ${monthName} ${year}`;
  }

  const handleAccept = async ({ id }) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/friend/accept?userId=${id}`
      );
      console.log(response);
    } catch (error) {
      console.error("Error fetching movies:", error.message);
    }
  };

  const handleDeny = async ({ id }) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/friend/deny?userId=${id}`
      );
      console.log(response);
    } catch (error) {
      console.error("Error fetching movies:", error.message);
    }
  };
  console.log(bio)

  return (
    <>
      {localStorage.getItem("uid") ? (
        <section className="bg-custom-30">
          <div className="bg-gray-900">
            <Navbar />
          </div>

          <div class="p-2 relative mx-auto text-gray-600 items-center ml-10 mr-10 flex justify-between ">
            <div className="flex items-center">
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
                <MagnifyingGlassIcon
                  height={24}
                  width={24}
                  className="text-white"
                />
              </button>
            </div>
            <div>
              {!isopen ?
                <Popover.Root>
                  <Popover.Trigger asChild>
                    <button
                      className="rounded-full w-[35px] h-[35px] inline-flex items-center justify-center text-violet11 bg-white shadow-[0_2px_10px] shadow-blackA4 hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black cursor-default outline-none"
                      aria-label="Update dimensions"
                    >
                      <MixerHorizontalIcon />
                    </button>
                  </Popover.Trigger>
                  <Popover.Portal>
                    <Popover.Content
                      className="rounded p-5 w-[150px] bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
                      sideOffset={5}
                    >
                      <div className="flex flex-col ">
            
                  
                        <button onClick={()=>navigate('/signin/reset')} className="text-[13px] flex justify-center border-custom-30 " htmlFor="width">
                          Rest Password
                        </button>
                        <hr className="text-black" />
                        <button className="text-[13px] flex justify-center text-custom-30  m-1 " htmlFor="height" onClick={() => setisopen(true)}>
                          Edit Bio
                        </button>
                        <hr />
                      
                  
                      
                      </div>
                      <Popover.Close
                        className="rounded-full h-[25px] w-[25px] inline-flex items-center justify-center text-violet11 absolute top-[5px] right-[5px] hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 outline-none cursor-default"
                        aria-label="Close"
                      >
                        <Cross2Icon />
                      </Popover.Close>
                      <Popover.Arrow className="fill-white" />
                    </Popover.Content>
                  </Popover.Portal>
                </Popover.Root>
                :<>
           
              <TextArea className="bg-custom-20 rounded-lg border border-custom-20" placeholder="Type new Bio…" onChange={(e) => setUserBio(e.target.value)} value={bio}  />
              <button className="bg-gray-900 m-2 border border-custom-20 flex justify-center p-2 rounded-lg text-custom-20" onClick={handleBio} >submit</button>
              </> }
            </div>
          </div>
          <div class="py-16">
            <div class="mx-auto px-6 max-w-6xl text-gray-500">
              <div class="relative">
                <div class="relative z-10 grid gap-3 grid-cols-6">
                  <div class="col-span-full lg:col-span-2  overflow-hidden flex relative p-8 rounded-xl  border  border-gray-800 bg-gray-900">
                    <div class="size-fit m-auto relative">
                      <div class="relative h-24 w-56 flex flex-col items-center">
                        <Text size={"7"} className="text-custom-20">
                          {userData?.name}
                        </Text>{" "}
                        <Button variant="outline text-custom-20"
                          onClick={() => navigate("/user/friends")}
                          className="rounded-lg p-2 "
                        >
                          {" "}
                         
                          <Text>FriendCount: {userData?.friendCount}</Text>
                        </Button>
                        <Text className="text-custom-20" >{formatDate(userData?.joinedOn)}</Text>
                        {userData?.requestList.map((request, index) => (
                          <div className="flex text-custom-20" >
                            {" "}
                            <button>{request.userName}</button>
                            <CheckIcon height={24} width={24}
                              onClick={() => handleAccept({ id: request.id })}
                            />
                            <Cross2Icon height={24} width={24}
                              onClick={() => handleDeny({ id: request.id })} />
                              deny
                           
                          </div>
                        ))} 
                      </div>
                    </div>
                  </div>
                  <div class="col-span-full sm:col-span-3 lg:col-span-2 overflow-hidden relative p-8 rounded-xl  border  border-gray-800 bg-gray-900">
                    <div className="relative">
                      <div class=" items-center justify-center relative aspect-square rounded-full size-32 flex border mx-auto bg-white bg-white/5 border-white/10 before:absolute before:-inset-2 before:border before:border-white/5 before:bg-white/5 before:rounded-full">
                        <PersonIcon
                          className="text-custom-10"
                          height={96}
                          width={96}
                        />
                      </div>
                      <div class="mt-6 text-center relative z-10 space-y-2">
                        <h2 class="text-lg font-medium  transition group-hover:text-purple-950 text-white">
                          {userData?.name} BIO
                        </h2>
                        <p class="text-gray-300">
                          {userData?.bio}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="col-span-full sm:col-span-3 lg:col-span-2 overflow-hidden relative p-8 rounded-xl  border  border-gray-800 bg-gray-900">
                    <Text
                      size={"6"}
                      className="justify-center text-custom-10 font-bold m-3 flex"
                    >
                      COLLECTION
                    </Text>
                    <Flex gap="3" className=" grid grid-cols-2">
                      <Button
                        onClick={() => navigate("/collections/watched")}
                        className="bg-custom-30 p-7 "
                        variant="classic"
                      >
                        <FileTextIcon height={32} width={32} />
                        <Text>
                          <Strong>Watched</Strong>
                        </Text>
                      </Button>
                      <Button
                        onClick={() => navigate("/collections/rating")}
                        className="bg-custom-30 p-7 "
                        variant="classic"
                      >
                        <HeartFilledIcon width={24} height={24} />
                        <Text>
                          <Strong>Rated</Strong>
                        </Text>
                      </Button>

                      <Button
                        onClick={() => navigate("/collections/watchLater")}
                        className="bg-custom-30 p-7 "
                        variant="classic"
                      >
                        <EyeClosedIcon width={24} height={24} />

                        <Text>
                          <Strong>Yet To Watch</Strong>
                        </Text>
                      </Button>
                      <Button
                        onClick={() => navigate("/collections/favourite")}
                        className="bg-custom-30 p-7"
                        variant="classic"
                      >
                        <StarFilledIcon width={24} height={24} />
                        <Text>
                          <Strong>Fav</Strong>
                        </Text>
                      </Button>
                    </Flex>
                  </div>
                  <div className="text-custom-20  col-span-6  overflow-hidden relative p-8 rounded-xl  border-gray-800 bg-gray-900 flex justify-center " > <Text size={"7"} >Favourites </Text> </div>
                  {userData?.movies?.map((movie, index) => (
                    <>
                      {movie.favourite ? (
                        <div class=" text-custom-20 md:col-span-2 col-span-3  overflow-hidden relative p-8 rounded-xl  border-gray-800 bg-gray-900 ">
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
          <Footer />
        </section>
      ) : (
        <>
          <div className="bg-custom-30 h-screen"></div>
        </>
      )}
    </>
  );
});
