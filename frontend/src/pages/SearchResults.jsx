import React, { useEffect, useState } from 'react'
import { useApi } from '../Context/Contxt';
import { useParams } from 'react-router-dom';
import axios from 'axios'
function SearchResults() {
    const [Search, setSearch] = useState([]);
    // const { searchResults } = useApi()
    // const {searchID} = useParams()
    const searchID = "Batman"
    useEffect(() => { 
        const SearchBarResults = async () => {
            try {
                const SearchBarRes = await axios.get('http://localhost:5000/api/movies/search', {
                        name: 'Batman'
                    
                });
                console.log("hello")
                console.log(SearchBarRes.data)
                setSearch(SearchBarRes.response);
            } catch (error) {
                console.error('Error fetching movies:', error.message);
            }
        };
        SearchBarResults();
    }, [])

    console.log(Search)
  return (
    <div>
      hello
    </div>
  )
}

export default SearchResults
