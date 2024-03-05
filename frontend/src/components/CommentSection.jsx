import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CommentSection = ({ props }) => {
  const [moviedata, setmoviedata] = useState([]);
  const [reviewText, setreviewText] = useState('');
  const [reviewid, setreviewid] = useState('');
  const [updateReviewData, setUpdateReviewData] = useState(null); // State for review update data

  useEffect(() => {
    MovieDetails();
  }, [props]);

  const MovieDetails = async () => {
    try {
      const MovDetails = await axios.get(`http://localhost:5000/api/movies/reviews/${props}`);
      setmoviedata(MovDetails.data);
    } catch (error) {
      console.error('Error fetching movies:', error.message);
    }
  };

  const handlePost = async (e) => {
    e.preventDefault();

    if (!reviewText) {
      console.error('Review text is empty.');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:5000/api/reviews/${props}`, { reviewText });
      console.log('Comment posted:', response.data);
      setreviewText('');

      // Optionally, fetch updated movie data and update moviedata state
    } catch (error) {
      console.error('Error posting comment:', error.message);
    }
  };

  const handleUser = async ({ id }) => {
    try {
      const userDetails = await axios.get(`http://localhost:5000/api/users/${id}`);
      // Handle user details (e.g., display username)
    } catch (error) {
      console.error('Error fetching user:', error.message);
    }
  };

  const handleform = async ({ rid }) => {
    setreviewid(rid);
    try {
      // Fetch review details for update
      const response = await axios.get(`http://localhost:5000/api/reviews/${props}/${rid}`);
      console.log(response.data);
      setUpdateReviewData(response.data); // Set updateReviewData state

      // Pre-populate form with retrieved review text
      setreviewText(updateReviewData.text);
    } catch (error) {
      console.error('Error fetching review:', error.message);
    }
  };

  const handleUpdateReview = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    console.log(reviewid);

    if (!reviewText) {
      console.error('Review text is empty.');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:5000/api/reviews/${props}/${reviewid}/update`,
        { reviewText }
      );
      console.log('Review updated:', response.data);
      setreviewText(''); // Clear the review text input

      // Optionally, fetch updated movie data and update moviedata state

      // Reset updateReviewData state
      setUpdateReviewData(null); // Clear update data
    } catch (error) {
      console.error('Error updating review:', error.message);
    }
  };


  const handleDelete = async ({ rid }) => {
    try {
        const response = await axios.delete(`http://localhost:5000/api/reviews/${props}/${rid}/delete`);
        console.log(response.data);
        }
           catch (error) {
      console.error('Error deleting review:', error.message);
    }
  };

  return (
    <div className="container p-1 mx-auto mt-8">
      <div className="bg-custom-10 p-6 rounded-lg shadow-md">
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
                    <button  onClick={handlePost} className="mt-2 px-4 py-2 bg-custom-50 text-white rounded hover:bg-black">
                        Post Comment
                    </button>
                    </form> 
                    
        <div className="space-y-4">
          {moviedata.map((movie, index) => (
            <div key={index}>
              <img
                src="https://via.placeholder.com/40"
                alt="User Avatar"
                className="rounded-full w-8 h-8 mr-2"
              />
              <button onClick={() => handleUser({ id: movie.userId })}>{movie.reviewer}</button>
              <p>{movie.text}</p>
              {updateReviewData && updateReviewData.movieId === movie.movieId && (
                 <form method="get">
                 <textarea
                            value={reviewText}
                            onChange={(e) => setreviewText(e.target.value)}
                            name="updateText"
                            id="updateText"
                            rows="2"
                            placeholder="Add a comment..."
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        <button onClick={handleUpdateReview} className="mt-2 px-4 py-2 bg-custom-50 text-white rounded hover:bg-black">
                            Update
                        </button>
                        </form> 
                
              )}
              
              <button onClick={() => handleform({ rid: movie.reviewId })} className="mt-2 px-4 py-2 bg-custom-50 text-white rounded hover:bg-black">
                            Update
                        </button>
                        <button onClick={() => handleDelete({ rid: movie.reviewId })} className="mt-2 px-4 py-2 bg-custom-50 text-white rounded hover:bg-black">
                           Delete
                        </button>
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommentSection;










// import React, { useEffect, useState } from 'react';
// import axios from 'axios';




// const CommentSection = ({props}) => {

//     const [moviedata, setmoviedata] = useState([]);
//     const [reviewText, setreviewText] = useState([]);
//     const [user, setuser] = useState([]);
    

//     // console.log(props);
    
//         const MovieDetails = async () => {
//             try {
//                 const MovDetails = await axios.get(`http://localhost:5000/api/movies/reviews/${props}`);
//                 setmoviedata(MovDetails.data);
//                 // console.log(MovDetails.data);
                
//             } catch (error) {
//                 console.error('Error fetching movi:', error.message);
//             }
//         };
        
//         useEffect(() => {
//             MovieDetails();

//         }, [props])


        
//         const handleform =  async ({ id }) => {

//             <div className="container p-1 mx-auto mt-8">
//             <div className="bg-custom-10 p-6 rounded-lg shadow-md">
              
//               <form method="get">
//             <textarea
//                         value={reviewText}
//                         onChange={(e) => setreviewText(e.target.value)}
//                         name="reviewText"
//                         id="reviewText"
//                         rows="4"
//                         placeholder="Add a comment..."
//                         className="w-full p-2 border border-gray-300 rounded"
//                     />
//                     <button  onClick={() => handleUpdate({ id})} className="mt-2 px-4 py-2 bg-custom-50 text-white rounded hover:bg-black">
//                         Post Comment
//                     </button>
//                     </form> 
//                     </div>
//                 </div>
//         }
//             // e.preventDefault();
//             // setuser(movie.userId);
//             const handleUpdate =  async ({ id }) => {
//             try {
//                 const response = await axios.put(`http://localhost:5000/api/reviews/${props}/${id}/update`,{reviewText});
//                 // setmoviedata(userDetails.data);
//                 // console.log(userDetails.data);
                
//             } catch (error) {
//                 console.error('Error fetching movi:', error.message);
//             }
//         };
      


//         const handlePost = async (e) => {
//             e.preventDefault(); // Prevent default form submission behavior
          
//             if (!reviewText) {
//               // Handle empty review text (e.g., display an error message)
//               console.error('Review text is empty.');
//               return; // Exit if reviewText is empty
//             }
          
//             try {
//               const response = await axios.post(`http://localhost:5000/api/reviews/${props}`, { reviewText });
          
//               // Handle successful response (e.g., clear review text, display success message, update local state or UI)
//               console.log('Comment posted:', response.data);
//               setreviewText(''); // Clear the review text input
          
//               // Optionally, fetch updated movie data (if API endpoint supports it)
//               // and update the moviedata state
//             } catch (error) {
//               console.error('Error posting comment:', error.message);
//             }
//           };
          
    
 



//     const handleUser =  async ({ id }) => {
//         // e.preventDefault();
//         // setuser(movie.userId);
//         try {
//             const userDetails = await axios.get(`http://localhost:5000/api/users/${id}`);
//             // setmoviedata(userDetails.data);
//             // console.log(userDetails.data);
            
//         } catch (error) {
//             console.error('Error fetching movi:', error.message);
//         }
//     };
   
 





//     return (
//         <div className="container p-1 mx-auto mt-8">
//             <div className="bg-custom-10 p-6 rounded-lg shadow-md">
              
//               <form method="get">
//             <textarea
//                         value={reviewText}
//                         onChange={(e) => setreviewText(e.target.value)}
//                         name="reviewText"
//                         id="reviewText"
//                         rows="4"
//                         placeholder="Add a comment..."
//                         className="w-full p-2 border border-gray-300 rounded"
//                     />
//                     <button  onClick={handlePost} className="mt-2 px-4 py-2 bg-custom-50 text-white rounded hover:bg-black">
//                         Post Comment
//                     </button>
//                     </form> 
                

                
//                 <div className="space-y-4">
//                      <div className="flex">
                       
//                         <div>
//                       {moviedata.map((movie, index) => (
//                         <div>
//                             <img src="https://via.placeholder.com/40" alt="User Avatar" className="rounded-full w-8 h-8 mr-2" />
//                             <button onClick={() => handleUser({ id: movie.userId })}>{movie.reviewer}</button>
//                            <p>{movie.text}</p>
//                            <button onClick={() => handleform({ id: movie.reviewId })}>update</button>
//                            {/* <button onClick={() => handleDelete({ id: movie.reviewId })}>delete</button> */}
//                         </div>
                         
//                         ))}

                  
//                             {/* <p className="font-semibold">John Doe</p>
//                             <p className="text-gray-600">An epic tale of power, loyalty, and the irresistible allure of the underworld, 'The Godfather' remains an unshakable cornerstone of cinematic greatness.</p> */}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CommentSection;
