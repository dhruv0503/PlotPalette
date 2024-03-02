import React, { useState  ,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import Navbar from './Navbar';
import Footer from '../components/Footer';
import LoadingPage from '../components/LoadingPage';
import { MovieCard } from '../components/CustomCard';

function Actors() {
    const [ActorInfo, setActorInfo] = useState([]);
    const { ActorId } = useParams();
    const [showAll, setShowAll] = useState(false);
    const toggleShowAll = () => {
        setShowAll(prevShowAll => !prevShowAll);
    };
    const [showMore, setShowMore] = useState(false);

    const toggleShowMore = () => {
        setShowMore(prevShowMore => !prevShowMore);
    };
    const words = ActorInfo.biography?.split(' ');
    

    useEffect(() => {
        const MovieDetails = async () => {
            try {
                const ActDetails = await axios.get(`http://localhost:5000/api/movies/person/${ActorId}`);
               
                setActorInfo(ActDetails.data);
            } catch (error) {
                console.error('Error fetching movi:', error.message);
            }
        };
        MovieDetails();

    }, [])
    
 


    return (
    
    <div className='bg-custom-30 h-full'>
            
            <h1 className='font-bold justify-center flex p-2'>{ActorInfo.name}</h1>
            <div className='grid grid-cols-4' >
                
                <div className='items-center' >
                    <img className=' justify-center flex  max-h-[300px] m-3 rounded-lg border border-custom-40 ' src={`https://image.tmdb.org/t/p/original${ActorInfo.profile_path}`} alt="" />
                    <p className='m-3 p-2 ' >{words?.slice(0, showMore ? words.length : 100).join(' ')}
                        {!showMore && '...'}</p>
                    {!showMore && (
                        <button className='text-blue-500 ml-10 bg-black p-2' onClick={toggleShowMore}>
                            {showMore ? 'Show Less' : 'Read More'}
                        </button>
                    )}
                </div>   
                <div className='grid grid-cols-4 col-span-3' >
                    {ActorInfo.cast?.length > 0 ? (
                        ActorInfo.cast?.length < 10 ? (
                            ActorInfo.cast.map((movie, index) => (
                                <MovieCard key={index} {...movie} />
                            ))
                        ) : (
                            ActorInfo.cast.slice(0, showAll ? ActorInfo.cast.length : 20).map((movie, index) => (
                                <MovieCard key={index} {...movie} />
                            ))
                        )
                    ) : (
                        <LoadingPage />
                    )}

                    <div className='flex justify-center min-w-[100px] bg-black m-3 p-3 rounded-lg '>
                        <button className='text-custom-10' onClick={toggleShowAll}>
                            {showAll ? 'Show Less Movies' : 'SHOW ALL MOVIES'}
                        </button>
                    </div>
                </div>
                
            </div>
           
        <Footer/>
    </div>
  )
}

export default Actors
