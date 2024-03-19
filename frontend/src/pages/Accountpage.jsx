import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "../components/Footer";
import { Button, Text, TextArea } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom"
import { useApi } from "../Context/Contxt";
import { CardStackPlusIcon, EyeOpenIcon, PlusIcon } from '@radix-ui/react-icons';


import {
  PersonIcon,
  HeartFilledIcon,
  StarFilledIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";

export default React.memo(function AccountPage() {
  const [searchResults, setSearchResults] = useState();
  const [bio, setUserBio] = useState();
  const [findUser, setFindUser] = useState();
  const [finduserData, setFinduserData] = useState([]);

  const handleBio = async () => {
    try {
      const response = await axios.post(
        `${process.env.BACKEND_URL}api/users/bio`, { bio }
      );
      window.location.reload();
      console.log(response);
    } catch (error) {
      console.error("Error fetching movies:", error.message);
    }
  };





  useEffect(() => {
    const searchUserData = async () => {
      try {
        const UserSearch = await axios.get(
          `${process.env.BACKEND_URL}api/users/search?userName=${findUser}`
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
      {localStorage.getItem("uid") ? (
        <section className="bg-custom-30">
          <div className="bg-gray-900">
            <Navbar />
          </div>

          <div className="col-span-full lg:col-span-2  overflow-hidden flex relative p-8 rounded-xl  border  border-gray-800 " >
            <div class="relative flex flex-col bg-clip-border rounded-xl bg-gray-900 text-custom-20 h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
              <div class="mb-2 p-4">
                <h5 class="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug ">User Profile</h5>
              </div>
              <nav class="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700">
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
                <div role="button" onClick={() => navigate("/collections/favourite")} tabindex="0" class="flex items-center w-full p-3  text-custom-20 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">
                  <div class="grid place-items-center mr-4">
                    <HeartFilledIcon height={24} width={24} />
                  </div> Favourites
                </div>
                <div onClick={() => navigate("/collections/rating")} role="button" tabindex="0" class="flex items-center w-full p-3  text-custom-20 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">
                  <div class="grid place-items-center mr-4">
                    <StarFilledIcon height={24} width={24} />
                  </div> Rated
                </div>
                <div onClick={() => navigate("/collections/watchLater")} role="button" tabindex="0" class="flex items-center w-full p-3  text-custom-20 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">
                  <div class="grid place-items-center mr-4">
                    <CardStackPlusIcon height={24} width={24} />
                  </div> WatchLater
                </div>
                <div onClick={() => navigate("/collections/watched")} className="flex items-center w-full p-3  text-custom-20 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">
                  <div class="grid place-items-center mr-4" onClick={() => navigate("/collections/watched")} >
                    <EyeOpenIcon height={24} width={24} />
                  </div> Watched
                </ div>
                {isopen && <div className="flex" >

                  <TextArea className="bg-custom-20 h-[40px] rounded-lg border border-custom-20" placeholder="Type new Bio…" onChange={(e) => setUserBio(e.target.value)} value={bio} />
                  <button className="bg-gray-900 m-2 border border-custom-20 flex justify-center p-2 rounded-lg text-custom-20" onClick={handleBio} >submit</button>
                </div>}
                <div role="button" onClick={() => setisopen(!isopen)} tabindex="0" class="flex items-center w-full p-3  text-custom-20 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">
                  <div class="grid place-items-center mr-4">
                    <PlusIcon height={24} width={24} />
                  </div> Edit bio
                </div>

                <div onClick={() => navigate('/signin/reset')} role="button" tabindex="0" class="flex items-center w-full p-3 text-custom-20 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">
                  <div class="grid place-items-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="h-5 w-5">
                      <path fill-rule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" clip-rule="evenodd"></path>
                    </svg>
                  </div> Reset Password
                </div>

              </nav>
            </div>
            <div class="py-15">
              <div class="mx-auto px-6 max-w-6xl text-gray-500">
                <div class="relative">
                  <div class="relative z-10 grid gap-3 grid-cols-6">
                    <div class="col-span-full lg:col-span-3  overflow-hidden flex relative p-8 rounded-xl  border  border-gray-800 bg-gray-900 ">
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

                        </div>
                      </div>
                    </div>
                    <div class="col-span-full lg:col-span-3  overflow-hidden flex relative p-8 rounded-xl  border  border-gray-800 bg-gray-900  justify-center ">
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

                    <div className="text-custom-20  col-span-6  overflow-hidden relative p-8 rounded-xl  border-gray-800 bg-gray-900 flex justify-center " > <Text size={"7"} >Favourites </Text> </div>
                    {userData?.movies?.map((movie, index) => (
                      <>
                        {movie.favourite ? (
                          <div onClick={() => navigate(`/movies/${movie.tmdbId}`)} class=" text-custom-20 md:col-span-2 col-span-3  overflow-hidden relative p-8 rounded-xl  border-gray-800 bg-gray-900 ">
                            <img alt="Poster" className="border border-custom-20" src={`https://image.tmdb.org/t/p/original/${movie.poster}`} />

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
        </section>
      ) : (
        <>
          <div className="bg-custom-30 h-screen"></div>
        </>
      )}
    </>
  );
});
