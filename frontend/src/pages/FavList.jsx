import React ,{useState,useEffect} from 'react'
import axios from 'axios'
import Navbar from './Navbar'
import { useApi } from '../Context/Contxt'
import { BookmarkIcon, StarIcon } from '@radix-ui/react-icons'
import { Link ,useNavigate, useParams } from 'react-router-dom'
function FavList() {
    const { userData ,upcomingMovies } = useApi();
    const [favlist, setfavlist] = useState([]);
    const { collectionid } = useParams();
    const [userFav, setuserFav] = useState([]);
    const handlefavlist = async () => {
        try {
            //change userDATAID
            const response = await axios.get(`http://localhost:5000/api/users/options?parameter=${collectionid}&userId=${userData.id}`)
            setuserFav(response.data)
            console.log(response)

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
            <div className='bg-custom-30  p-3' >
                <div className="m-10">
                    {userFav?.map((movie, index) => (
                        <div key={index} className=" items-center bg-custom-10 text-custom-50 sm:flex justify-between rounded-lg m-5 p-3 shadow-md">
                            <div className="rounded-md p-2">
                                <div className="font-bold">{movie.title}</div>
                                <p>{movie.release_date}</p>
                            </div>
                            <div className="flex md:items-center md:justify-center">
                                <BookmarkIcon height={32} width={32} />
                                <StarIcon height={32} width={32} />
                          
                          
                            <Link
                                to={`/movies/${movie.tmdbId}`}
                                className="block bg-custom-50 border border-black p-2 rounded-b-lg text-center text-white hover:bg-custom-30 transition duration-300"
                            >
                                View Details
                            </Link>
                           </div>
                        </div>
                    ))}
                </div>


               
            </div>
        </div>
    )
}




export default FavList
