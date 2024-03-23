import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from './Navbar'
import { useApi } from '../Context/Contxt'
import { Link, useParams } from 'react-router-dom'
import { Text } from '@radix-ui/themes'
import { useNavigate } from 'react-router-dom'
function FavList() {
    const navigate = useNavigate();
    const { userData, upcomingMovies } = useApi();
    const { collectionid } = useParams();
    const [userFav, setuserFav] = useState([]);
    const handlefavlist = async () => {
        try {
            //change userDATAID
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/users/options?parameter=${collectionid}&userId=${userData.id}`)
            setuserFav(response.data)

        } catch (error) {
            console.error('Error fetching movies:', error.message);
        }
    };

    useEffect(() => {
        handlefavlist();
    }, [])

    return (
        < div className='bg-custom-30 h-screen' >
            <div className='bg-custom-50' ><Navbar /></div>
            <div className='flex justify-center items-center h-full'>
                <div className='bg-custom-30  p-3 ' >
                    <div className=" flex flex-col justify-center items-center sm:grid sm:grid-cols-3 md:grid-cols-5 sm:justify-around ">
                        {userFav.length === 0 ?
                            <div className='flex flex-col items-center justify-center'>
                                <Text className='text-custom-20 flex justify-center m-2' size={"7"} >Wow.. So Empty</Text>
                                <button className='bg-custom-20 rounded-lg text-custom-40 flex justify-center p-3' onClick={() => navigate(`/movies/toprated`)}>Look at Top Rated Movies</button>
                            </div> :
                            (userFav?.map((movie, index) => (
                                <div className="max-w-md min-h-sm p-4 overflow-hidden rounded-lg shadow-s m-2 relative">
                                    <div className="relative overflow-hidden w-sm h-sm">
                                        <img className="p-1 w-full h-full object-cover rounded-t-lg border-2 transition duration-300 transform hover:scale-125 " src={`https://image.tmdb.org/t/p/original${movie.poster}`} alt={`${movie.title} backdrop_path`} />
                                        <div className="absolute inset-0 flex flex-col justify-center items-center opacity-0 hover:opacity-95 m-5 lg:m-20 transition duration-300">
                                            <div className='mt-4 '>
                                                <Link to={`/movies/${movie.tmdbId}`} className='block bg-custom-50 border border-black p-2 rounded-b-lg text-center text-white hover:bg-custom-30 transition duration-300'>
                                                    View Details
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )))}
                    </div>
                </div>
            </div>
        </div>
    )
}


export default FavList
