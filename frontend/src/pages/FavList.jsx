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
            const response = await axios.get(`http://localhost:5000/api/users/options?parameter=favourited&userId=${userData.id}`)
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
            <div className='bg-custom-50' ><Navbar/></div>
            <div className='bg-custom-30  p-3' >
         
         
            </div>
    </div>
  )
}

export default FavList
