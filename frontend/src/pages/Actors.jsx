import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import Navbar from './Navbar';
import Footer from '../components/Footer';
import LoadingPage from '../components/LoadingPage';
import { MovieCard } from '../components/CustomCard';
import { Text, Link } from '@radix-ui/themes';

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
                const ActDetails = await axios.get(`https://plot-palette-server.vercel.app/api/movies/person?castId=${ActorId}`);

                setActorInfo(ActDetails.data);
            } catch (error) {
                console.error('Error fetching movi:', error.message);
            }
        };
        MovieDetails();

    }, [])
    console.log(ActorInfo)


    return (

        <div className='bg-custom-30 h-full'>
            <div className='bg-gray-900'  ><Navbar className /></div>


            <Text size={"8"} className='font-bold text-custom-10 justify-center flex p-2'>{ActorInfo.name}</Text>
            <hr className='m-5' />
            <div className='md:grid md:grid-cols-4' >

                <div className='items-center sm:flex sm:flex-row md:flex-col ' >
                    <img className=' ml-5  flex  max-h-[300px] m-3 rounded-lg border border-custom-40 ' src={`https://image.tmdb.org/t/p/original${ActorInfo.profile_path}`} alt="" />
                    <div className='m-3 ml-10 gap-2 flex'>
                        <Text className='  text-custom-10  ' >{words?.slice(0, showMore ? words.length : 100).join(' ')}

                            {!showMore && (<Link onClick={toggleShowMore} >{showMore ? 'show Less' : 'read more...'}</Link>)}</Text>

                    </div>
                </div>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:col-span-3' >
                    {ActorInfo.cast?.length ? (
                        ActorInfo.cast?.length < 10 ? (
                            ActorInfo.cast.map((movie, index) => (
                                <MovieCard key={index} {...movie} />
                            ))
                        ) : (
                            ActorInfo.cast.filter(movie => movie.poster_path).
                                slice(0, showAll ? ActorInfo.cast.length : 12).map((movie, index) => (
                                    <MovieCard key={index} {...movie} />
                                ))
                        )
                    ) : (
                        <LoadingPage />
                    )}
                    {ActorInfo.cast?.length > 10 &&
                        <div className='flex justify-center min-w-[100px] bg-black m-3 p-3 rounded-lg '>

                            <button className='text-custom-10' onClick={toggleShowAll}>
                                {showAll ? 'Show Less Movies' : 'SHOW ALL MOVIES'}
                            </button>
                        </div>
                    }
                </div>

            </div>

            <Footer />
        </div>
    )
}

export default Actors
