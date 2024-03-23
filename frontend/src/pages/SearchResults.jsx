import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { MovieCard } from '../components/CustomCard';
import LoadingPage from '../components/LoadingPage';
import axios from 'axios'
import Navbar from './Navbar';
import AvatarSlider from '../components/AvatarSlider';
import { Text } from '@radix-ui/themes';
function SearchResults() {
  const [Search, setSearch] = useState([]);
  const [searchperson, setsearchperson] = useState([]);
  const [startPage, setStartPage] = useState(1)

  const { searchID } = useParams()

  useEffect(() => {
    const SearchBarResults = async () => {
      try {
        const SearchBarRes = await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/movies/search/person?name=${searchID}&pageNo=${startPage}`)
        setsearchperson(SearchBarRes.data);
      } catch (error) {
        console.error('Error fetching movies:', error.message);
      }
    };
    SearchBarResults();
  }, [startPage])


  useEffect(() => {
    const SearchBarResults = async () => {
      try {
        const SearchBarRes = await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/movies/search/movie?name=${searchID}&pageNo=${startPage}`)
        console.log(SearchBarRes.data)
        setSearch(SearchBarRes.data);
      } catch (error) {
        console.error('Error fetching movies:', error.message);
      }
    };
    SearchBarResults();
  }, [startPage])

  return (
    <div className='bg-custom-30' >
      <div className='bg-gray-900'  ><Navbar className /></div>

      <Text className='text-custom-10 m-10 p-6 ' size={"8"}>search results for {searchID}</Text>
      <hr className='m-5' />

      <div className='p-5 bg-custom-30 text-custom-20'>
        <AvatarSlider props={searchperson} />
      </div>


      <Text className='text-custom-10 m-3' size={"8"}>Movie results for {searchID}</Text>
      <hr className='m-5' />
      <div className=" flex flex-col justify-center items-center  sm:grid sm:grid-cols-3 md:grid-cols-5 sm:justify-around ">
        {
          Search?.length ?
            (Search.filter(movie => movie.poster_path).map((movie, index) => (
              <MovieCard key={index} {...movie} />
            ))) :
            <LoadingPage />
        }
      </div>
    </div>
  )
}

export default SearchResults
