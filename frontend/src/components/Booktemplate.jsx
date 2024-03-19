import React, { useEffect, useState } from "react";
import {
  EyeOpenIcon,
  HeartIcon,
  InfoCircledIcon,
  StarIcon,
  StarFilledIcon,
  HeartFilledIcon,
} from "@radix-ui/react-icons";
import { Callout } from "@radix-ui/themes";
import CommentSection from "./CommentSection";
import { useParams } from "react-router-dom";
import { Blockquote, Em, Text } from "@radix-ui/themes";
import axios from "axios";
import AvatarSlider from "./AvatarSlider.jsx";
import { MdOutlinePlaylistAdd, MdOutlinePlaylistAddCheck } from "react-icons/md";

export default React.memo(function Booktemplate() {
  const [favor, setFavor] = useState(false);
  const [moviedata, setmoviedata] = useState({}); // Initial state
  const { movieId } = useParams();
  const [ratingn, setRating] = useState(0);

  useEffect(() => {
    const MovieDetails = async () => {
      try {
        const MovDetails = await axios.get(
          `${process.env.BACKEND_URL}api/movies?tmdbId=${movieId}`
        );
        console.log(MovDetails.data);
        setmoviedata(MovDetails.data);
      } catch (error) {
        console.error("Error fetching movie:", error.message);
      }
    };
    MovieDetails();
  }, []);




  const handleWatched = async () => {
    try {
      await axios.patch(
        `${process.env.BACKEND_URL}api/movies?tmdbId=${movieId}`
      );
      window.location.reload();
      moviedata.watchedByUser("true");

    } catch (error) {
      console.error("Error fetching movi:", error.message);
    }
  };

  const movieWatchedLater = async () => {

    try {
      await axios.get(
        `${process.env.BACKEND_URL}api/movies/watchLater?tmdbId=${movieId}&watchLater=${true}`
      );

      window.location.reload();
    } catch (error) {
      console.error("Error fetching movi:", error.message);
    }
  };
  const removeWatchedLater = async () => {

    try {
      await axios.get(
        `${process.env.BACKEND_URL}api/movies/watchLater?tmdbId=${movieId}&watchLater=${false}`
      );

      window.location.reload();
    } catch (error) {
      console.error("Error fetching movi:", error.message);
    }
  };

  const handleRating = async (starValue) => {
    setRating(starValue)
    try {
      await axios.get(
        `${process.env.BACKEND_URL}api/movies/rating?tmdbId=${movieId}&rating=${starValue}`
      );
      setRating(parseInt(moviedata.ratingByUser))

      window.location.reload();
    } catch (error) {
      console.error("Error fetching movi:", error.message);
    }
  };
  const handlefav = async () => {


    try {
      const response = await axios.get(
        `${process.env.BACKEND_URL}api/movies/favourite?tmdbId=${movieId}&favourite=${true}`
      );

      window.location.reload();
    } catch (error) {
      console.error("Error fetching movie:", error.message);
    }
  };
  const handleUnfav = async () => {


    try {
      const response = await axios.get(
        `${process.env.BACKEND_URL}api/movies/favourite?tmdbId=${movieId}&favourite=${false}`
      );

      window.location.reload();
    } catch (error) {
      console.error("Error fetching movie:", error.message);
    }
  };

  const handleClick = (newRating) => {
    setRating(newRating);

  };
  const handleFavor = () => {
    setFavor(!favor);
    handlefav();
  }


  return (
    <div className="relative">

      {!localStorage.getItem("uid") ?
        <div className="p-7" > <Callout.Root>
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>
            You have to login first
          </Callout.Text>
        </Callout.Root>
        </div>
        : (!moviedata.watchedByUser &&
          <div className="p-7" > <Callout.Root>
            <Callout.Icon>
              <InfoCircledIcon />
            </Callout.Icon>
            <Callout.Text>
              Click on the Eyebutton then you can comment
            </Callout.Text>
          </Callout.Root></div>)
      }

      <div className="bg-cover bg-center p-10 gap-3 md:grid sm:grid-cols-3">

        <div className="shadow-md bg-custom-20   ">
          <div className=" rounded-lg overflow-hidden h-[550px] relative border border-white">
            <img
              src={`https://image.tmdb.org/t/p/original/${moviedata.poster_path}`}
              alt="movie image"
              className="py-10 px-1 h-full w-full rounded-md object-cover"
            />
            <div className="absolute bottom-0 left-5 flex gap-3 rounded-lg mb-1 mr-10 text-custom-50">
              {moviedata?.watchedByUser ? (
                <>
                  {moviedata.favouriteByUser == "true" ?
                    <HeartFilledIcon onClick={handleUnfav} height={32} width={32} />
                    : <button onClick={handleFavor}>
                      <HeartIcon height={32} width={32} />
                    </button>
                  }
                  {moviedata.ratingByUser ?

                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((starValue) => (
                        (moviedata.rating >= starValue) && (
                          <span
                            key={starValue}
                            className="star cursor-pointer hover:text-yellow-500 active"
                            data-rating={starValue}
                          >
                            <StarFilledIcon height={32} width={32} />
                          </span>
                        )
                      ))}
                    </div>
                    :
                    <button >

                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((starValue) => (
                          <span
                            key={starValue}
                            className={`star cursor-pointer hover:text-yellow-500 ${ratingn >= starValue ? 'active' : ''
                              }`}
                            data-rating={starValue}

                            onClick={() => handleRating(starValue)}
                          >
                            <StarIcon height={32} width={32} />
                          </span>
                        ))}
                      </div>
                    </button>
                  }
                </>
              ) : (
                <>
                  <button>
                    <EyeOpenIcon
                      onClick={handleWatched}
                      height={32}
                      width={32}
                    />
                  </button>
                  {moviedata.watchLaterByUser == 'true' ?
                    <button onClick={removeWatchedLater}>
                       <MdOutlinePlaylistAddCheck size={32} />
                      
                    </button>
                    :
                    <MdOutlinePlaylistAdd onClick={movieWatchedLater} size={32} />


                  }
                </>
              )}
            </div>
          </div>
        </div>

        <div className="z-10 mt-20 col-span-2 p-5 rounded-lg px-10 text-custom-10 font-bold">
          <Text size="7" className="text-custom-10 font-bold m-2">
            {moviedata.title} ({moviedata.language})
          </Text>
          <Em className="text-custom-10 flex gap-2 m-2">
            {moviedata.genres?.map((genre) => (
              <div className="flex" key={genre.id}>
                <h1>{genre.name}</h1>
              </div>
            ))}
          </Em>
          <div className=" p-4 flex flex-col border border-gray-800 ">
            <Em className="text-custom-10 mb-2">
              RELEASED ON: {moviedata.release_date}
            </Em>
            <Em className="text-custom-10 mb-2">
              {" "}
              Runtime :{moviedata.runTime} minutes
            </Em>
            <Blockquote size={"5"}>{moviedata.overview}</Blockquote>
          </div>
          {
            moviedata.platforms?.buy &&
            (<div className="flex m-2">
              <Em className="text-custom-10">Watch on : </Em>
              {moviedata.platforms?.buy?.slice(0, 3).map((comp) => {
                return (
                  <>
                    <h1 className="text-custom-20 ml-3">{comp.provider_name} ,</h1>
                  </>
                );
              })}
            </div>)
          }
        </div>
      </div>

      <div className="p-5 bg-custom-30 text-custom-10">
        <AvatarSlider props={moviedata.cast} />
      </div>

      <div className="p-4 bg-custom-50 gap-3 items-center relative flex shadow-lg">
        {/* // pass the function handleWatched */}
        <CommentSection props={movieId} watched={moviedata.watchedByUser} watch={handleWatched} />
      </div>
    </div>
  );
});
