import React from 'react'
import Navbar from './Navbar'
import { useApi } from '../Context/Contxt'
import { BookmarkIcon, StarIcon } from '@radix-ui/react-icons'
import { Link, useNavigate, useParams } from 'react-router-dom'
function OtherFavList() {
    const { userData, upcomingMovies } = useApi();
    const { collectionid } = useParams();
    console.log(userData)



    return (
        < div className='bg-custom-30 h-screen' >
            <div className='bg-custom-50' ><Navbar /></div>
            <div className='bg-custom-30  p-3' >

                <div className='m-10'>
                    {(collectionid === "fav" &&
                        userData?.movies?.map((movie, index) => (

                            movie?.favourite && (
                                <div className='justify-center items-center '>
                                    <div className=' bg-custom-10 text-custom-50 sm:flex justify-between rounded-lg m-5 p-3 '>
                                        <div className=' rounded-md p-2'>
                                            <div key={index} className=' font-bold ' >{movie.title}</div>
                                            <p>{movie.release_date}</p>
                                        </div>
                                        <div>
                                            <div className='flex md:items-center md:justify-center '>
                                                <BookmarkIcon height={32} width={32} />
                                                <StarIcon height={32} width={32} />
                                            </div>
                                            <Link to={`/movies/${movie.tmdbId}`} className='block bg-custom-50 border border-black p-2 rounded-b-lg text-center text-white hover:bg-custom-30 transition duration-300'>
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                </div>)

                        ))) || (collectionid == 'yettowatch' && userData?.movies?.map((movie, index) => (

                            movie?.watchLater && (
                                <div className='justify-center items-center '>
                                    <div className=' bg-custom-10 text-custom-50 sm:flex justify-between rounded-lg m-5 p-3 '>
                                        <div className=' rounded-md p-2'>
                                            <div key={index} className=' font-bold ' >{movie.title}</div>
                                            <p>{movie.release_date}</p>
                                        </div>
                                        <div>
                                            <div className='flex md:items-center md:justify-center '>
                                                <BookmarkIcon height={32} width={32} />
                                                <StarIcon height={32} width={32} />
                                            </div>
                                            <Link to={`/movies/${movie.tmdbId}`} className='block bg-custom-50 border border-black p-2 rounded-b-lg text-center text-white hover:bg-custom-30 transition duration-300'>
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                </div>)

                        ))) || (collectionid == 'rated' && userData?.movies?.map((movie, index) => (

                            movie?.rating && (
                                <div className='justify-center items-center '>
                                    <div className=' bg-custom-10 text-custom-50 sm:flex justify-between rounded-lg m-5 p-3 '>
                                        <div className=' rounded-md p-2'>
                                            <div key={index} className=' font-bold ' >{movie.title}</div>
                                            <p>{movie.release_date}</p>
                                        </div>
                                        <div>
                                            <div className='flex md:items-center md:justify-center '>
                                                <BookmarkIcon height={32} width={32} />
                                                <StarIcon height={32} width={32} />
                                            </div>
                                            <Link to={`/movies/${movie.tmdbId}`} className='block bg-custom-50 border border-black p-2 rounded-b-lg text-center text-white hover:bg-custom-30 transition duration-300'>
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                </div>)

                        ))) || (collectionid == 'Watched' && userData?.movies?.map((movie, index) => (

                            movie?.watched && (
                                <div className='justify-center items-center '>
                                    <div className=' bg-custom-10 text-custom-50 sm:flex justify-between rounded-lg m-5 p-3 '>
                                        <div className=' rounded-md p-2'>
                                            <div key={index} className=' font-bold ' >{movie.title}</div>
                                            <p>{movie.release_date}</p>
                                        </div>
                                        <div>
                                            <div className='flex md:items-center md:justify-center '>
                                                <BookmarkIcon height={32} width={32} />
                                                <StarIcon height={32} width={32} />
                                            </div>
                                            <Link to={`/movies/${movie.tmdbId}`} className='block bg-custom-50 border border-black p-2 rounded-b-lg text-center text-white hover:bg-custom-30 transition duration-300'>
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                </div>)

                        )))}


                </div>

            </div>
        </div>
    )
}

export default OtherFavList
