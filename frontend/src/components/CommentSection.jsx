
import React, { useEffect, useState } from 'react';
import axios from 'axios';




const CommentSection = ({props}) => {

    const [moviedata, setmoviedata] = useState([]);
    const [reviewText, setreviewText] = useState([]);
    const [user, setuser] = useState([]);
    

    // console.log(props);
    
        const MovieDetails = async () => {
            try {
                const MovDetails = await axios.get(`http://localhost:5000/api/movies/reviews/${props}`);
                setmoviedata(MovDetails.data);
                // console.log(MovDetails.data);
                
            } catch (error) {
                console.error('Error fetching movi:', error.message);
            }
        };
        
        useEffect(() => {
            MovieDetails();

        }, [props])


        const handlePost = async (e) => {
            e.preventDefault(); // Prevent default form submission behavior
          
            if (!reviewText) {
              // Handle empty review text (e.g., display an error message)
              console.error('Review text is empty.');
              return; // Exit if reviewText is empty
            }
          
            try {
              const response = await axios.post(`http://localhost:5000/api/reviews/${props}`, {
                reviewText,
              });
          
              // Handle successful response (e.g., clear review text, display success message, update local state or UI)
              console.log('Comment posted:', response.data);
              setreviewText(''); // Clear the review text input
          
              // Optionally, fetch updated movie data (if API endpoint supports it)
              // and update the moviedata state
            } catch (error) {
              console.error('Error posting comment:', error.message);
            }
          };
          
    
 



    const handleUser =  async ({ id }) => {
        // e.preventDefault();
        // setuser(movie.userId);
        try {
            const userDetails = await axios.get(`http://localhost:5000/api/users/${id}`);
            // setmoviedata(userDetails.data);
            // console.log(userDetails.data);
            
        } catch (error) {
            console.error('Error fetching movi:', error.message);
        }
    };
   
 





    return (
        <div className="container p-1 mx-auto mt-8">
            <div className="bg-custom-10 p-6 rounded-lg shadow-md">
                <div className='m-3' >
                    <form method="get">
                        <textarea
                            value={reviewText}
                            onChange={(e) => setreviewText(e.target.value)}
                            name="reviewText"
                            id="reviewText"
                            rows="4"
                            placeholder="Add a comment..."
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        <button onClick={handlePost} className="mt-2 px-4 py-2 bg-custom-50 text-white rounded hover:bg-black">
                            Post Comment
                        </button>
                    </form> 
              </div>
              
                

                
                <div className=" overflow-y-auto space-y-4 h-[200px] ">
                     <div className="flex">
                        <div>
                      {moviedata.map((movie, index) => (
                          <div className=''>
                              <div className='flex' >
                            <img src="https://via.placeholder.com/40" alt="User Avatar" className="rounded-full w-8 h-8 mr-2" />
                                  <button onClick={() => handleUser({ id: movie.userId })}>{movie.reviewer}</button>
                             </div>
                           <p>{movie.text}</p>
                        </div>
                         
                        ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommentSection;
