import React, { useEffect, useState } from 'react';
import {
  CardStackIcon,
  EyeOpenIcon,
  HeartIcon,
  PaperPlaneIcon,
  StarIcon,
} from '@radix-ui/react-icons';
import CommentSection from './CommentSection';
import { useParams } from 'react-router-dom';
import { Blockquote, Em, Quote, Tabs, Text } from '@radix-ui/themes';
import axios from 'axios';
import { useApi } from '../Context/Contxt.jsx';
import AvatarSlider from './AvatarSlider.jsx';

export default React.memo(function Booktemplate() {
  const { all_movie, userData } = useApi();
  const [moviedata, setmoviedata] = useState({}); // Initial state
  const { movieId } = useParams();
  const [number, setNumber] = useState(); 
  const [rating, setrating] = useState(1);
  const handleChange = (event) => {
      const value = parseInt(event.target.value);
      if (value >= 1 && value <= 5) {
          setNumber(value);
      }
  };

  useEffect(() => {
    const MovieDetails = async () => {
      try {
        const MovDetails = await axios.get(`http://localhost:5000/api/movies/${movieId}`);
        setmoviedata(MovDetails.data);
      } catch (error) {
        console.error('Error fetching movie:', error.message);
      }
    };
    MovieDetails();
  }, []);


  useEffect(() => {
  handleRating()
  },[rating])
    


  const handleWatched= async () => {
    try {
        const response = await axios.patch(`http://localhost:5000/api/movies/${movieId}`);
        console.log(response.data);
        moviedata.watchedByUser("true");
        
    } catch (error) {
        console.error('Error fetching movi:', error.message);
    }
};
            const movieWatchedLater= async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/api/movies/watchLater?tmdbId=${movieId}&watchLater=${true}`);
                    console.log(response.data);
                } catch (error) {
                    console.error('Error fetching movi:', error.message);
                }
            };
         


    
    
    const handleRating= async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/movies/rating?tmdbId=${movieId}&rating=${number}`);
           setrating(rating+1)
            // console.log(response.data);
        } catch (error) {
            console.error('Error fetching movi:', error.message);
        }
    };
      const handlefav= async () => {
                    try {
                        const response = await axios.get(`http://localhost:5000/api/movies/favourite?tmdbId=${movieId}&favourite=${true}`);
                        console.log(response);
                    } catch (error) {
                        console.error('Error fetching movi:', error.message);
                    }
                };


                


   

    

   




  return (
    <div className="relative">
      <div className="bg-cover bg-center p-10 gap-3 md:grid sm:grid-cols-3">
        <div className="bg-custom-20">
          <div className="shadow-md rounded-lg overflow-hidden relative border border-white">
            <img
              src={`https://image.tmdb.org/t/p/original/${moviedata.poster_path}`}
              alt="Bold typography"
              className="py-10 px-1 h-[500px] w-full rounded-md object-cover"
            />
            <div className="absolute bottom-0 left-5 flex gap-3 rounded-lg mb-1 mr-10 text-custom-50">
              {moviedata.watchedByUser ? (
                <>
                  <button onClick={handlefav}>
                    <HeartIcon height={32} width={32} />
                  </button>
                  <button onClick={handleRating}>
                    <div className='flex' onChange={handleChange} >
                      <StarIcon height={32} width={32} />
            <input
                type="number"
                min="1"
                max="5"
                value={number}
                
            />
        </div>
                    
                  </button>
                </>
              ) : (
                <>
                  <button >
                      <EyeOpenIcon  onClick={handleWatched}  height={32} width={32} />
                  </button>
                  <button onClick={movieWatchedLater}>
                    <CardStackIcon height={32} width={32} />
                  </button>
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
          <div className=' p-4 flex flex-col border border-gray-800 '>
                      <Em className='text-custom-10 mb-2'>RELEASED ON: {moviedata.release_date}</Em>
                       <Em className='text-custom-10 mb-2'> Runtime :{moviedata.runTime} minutes</Em>
                        <Blockquote size={"5"} >{ moviedata.overview}</Blockquote>
                    </div>
                    <div className='flex m-2'>
                        <Em className='text-custom-10' >Watch on : </Em>
                        {moviedata.platforms?.buy?.slice(0,3).map((comp) => {
                            return <>
                                <h1 className='text-custom-20 ml-3'>{comp.provider_name}</h1>
                            </>
                            
                        })}
                   </div>
        </div>
      </div>

      <div className="p-5 bg-custom-30 text-custom-10">
        <AvatarSlider props={moviedata.cast} />
      </div>

      <div className="p-4 bg-custom-50 gap-3 items-center relative flex shadow-lg">
        {/* // pass the function handleWatched */}
        <CommentSection props={movieId} watched={moviedata.watchedByUser}  />
      </div>
    </div>
  );
});










