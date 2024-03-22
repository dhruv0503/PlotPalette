import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as Avatar from '@radix-ui/react-avatar';
import { Cross2Icon, EyeOpenIcon, ThickArrowDownIcon, ThickArrowUpIcon, UpdateIcon } from '@radix-ui/react-icons';
import { ImArrowUp, ImArrowDown } from "react-icons/im";

const CommentSection = ({ props, watched , watch }) => {
  const [moviedata, setmoviedata] = useState([]);
  const [reviewText, setreviewText] = useState('');

  const [textArea, setTextArea] = useState(false);

  const [reviewid, setreviewid] = useState('');
  const navigate = useNavigate();


  function textfield(id) {
    setTextArea(true);
    setreviewid(id);
  }

  useEffect(() => {

    const MovieDetails = async () => {
      try {
        const MovDetails = await axios.get(`${process.env.BACKEND_URL}api/movies/reviews?tmdbId=${props}`);

        setmoviedata(MovDetails.data);
      } catch (error) {
        console.error('Error fetching movies:', error.message);
      }
    };

    MovieDetails();
  }, [props]);



  function getInitials(name) {
    const words = name?.split(/\s+/);
    let initials = "";
    words?.forEach(word => {
      if (word.length > 0) {
        initials += word[0].toUpperCase();
      }
    });
    return initials;
  }



  const handlePost = async (e) => {
    e.preventDefault();

    if (!reviewText) {
      console.error('Review text is empty.');
      return;
    }

    try {
     
      const response = await axios.post(`${process.env.BACKEND_URL}api/reviews?tmdbId=${props}`, { reviewText });
      console.log('Comment posted:', response.data);
      setreviewText('');
      window.location.reload();

    } catch (error) {
      console.error('Error posting comment:', error.message);
    }
  };

  const handleUser = async ({ id }) => {
    try {
      await axios.get(`${process.env.BACKEND_URL}api/users/${id}`);
    } catch (error) {
      console.error('Error fetching user:', error.message);
    }
  };



  const handleUpdateReview = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    console.log(props);

    if (!reviewText) {
      console.error('Review text is empty.');
      return;
    }
    
    try {
      const response = await axios.put(`${process.env.BACKEND_URL}api/reviews?tmdbId=${props}&reviewId=${reviewid.id}`,
        { reviewText }
      );
      console.log('Review updated:', response.data);
      setreviewText('');
      window.location.reload();
    } catch (error) {
     
      console.error('Error updating review:', error.message);
    }
  };



  const handleDelete = async ({ rid }) => {
    try {
        const response = await axios.delete(`${process.env.BACKEND_URL}api/reviews?tmdbId=${props}&reviewId=${rid}`);
      console.log(response.data);
      window.location.reload();
        }
           catch (error) {
      console.error('Error deleting review:', error.message);
    }
  };


  const handleUpvote = async ({ id }) => {
    try {
      const response = await axios.put(`${process.env.BACKEND_URL}api/reviews/upvote?reviewId=${id}`);
      // Handle user details (e.g., display username)
      console.log(response);
      window.location.reload();
    } catch (error) {
      console.error('Error fetching user:', error.message);
    }
  };

  const handleDownvote = async ({ id }) => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}api/reviews/downvote?reviewId=${id}`);
      console.log(response);
      // Handle user details (e.g., display username)
      window.location.reload();
    } catch (error) {
      console.error('Error fetching user:', error.message);
    }
  };

 


 

 
  return (
    <div className="container p-1 mx-auto mt-8">
      <div className="bg-custom-10 p-6 rounded-lg shadow-md">
        {localStorage.getItem("uid") ?
          <form method="get">
            {watched ?
              <textarea
                value={reviewText}
                onChange={(e) => setreviewText(e.target.value)}
                name="reviewText"
                id="reviewText"
                rows="4"
                placeholder="Add a comment..."
                className="w-full p-2 border border-gray-300 rounded"
              /> :
              <div class=" ">
                <div class="flex flex-row space-y-2 items-center justify-center h-full py-4 bg-gray-800 rounded-xl space-x-10">
                  <div class="w-2/3">
                    <p class="w-full text-2xl font-semibold text-white">Have you Watched this movie ?
                    </p>
                    <p class="w-full pb-8 text-sm tracking-wide leading-tight text-white">You can only comment if you have watched the movie</p>
                    <div class="rounded w-1/3">
                      <div class="opacity-95 border rounded-lg border-white px-4">
                        <button onClick={watch}  class=" flex  m-auto gap-3 items-center text-sm font-medium leading-normal  text-white py-2" >
                          <EyeOpenIcon height={24} width={24} />Yes I have
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            }
          { watched &&
            (<button onClick={handlePost} className="mt-2 px-4 py-2 bg-custom-50 text-white rounded hover:bg-black">
              Post Comment
            </button>) }
          </form> :
          <div class=" ">
            <div class="flex flex-row space-y-2 items-center justify-center h-full py-4 bg-gray-800 rounded-xl space-x-10">
              <div class="w-2/3">
                <p class="w-full text-2xl font-semibold text-white">Login to comment
                </p>
                <p class="w-full pb-8 text-sm tracking-wide leading-tight text-white">You can only comment if you are logged in</p>
                <div class="rounded w-1/3">
                  <div class="opacity-95 border rounded-lg border-white px-4">
                    <button onClick={()=>navigate('/signin')} class=" flex  m-auto gap-3 items-center text-sm font-medium leading-normal  text-white py-2" >
                      <EyeOpenIcon height={24} width={24} />
                      SIGN IN
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        }


        <div className="space-y-4">
          {moviedata.map((movie, index) => (
            <div key={index}>
              <div className='flex m-2 ' >
                <div className=' m-3' >
                  <Avatar.Root className="bg-blackA1 inline-flex h-[50px] w-[50px] select-none items-center justify-center overflow-hidden rounded-full align-middle border border-black ">
                    <Avatar.Fallback className="text-custom-20 bg-custom-30 leading-1 flex h-full w-full items-center justify-center text-[15px] font-bold ">
                      {getInitials(movie.reviewer)}
                    </Avatar.Fallback>
                  </Avatar.Root>
                </div>
                <div>

                  <button className='font-bold text-lg' onClick={() => handleUser(navigate(`/account/${movie?.reviewer}`)) }>{movie?.userName}</button>
                  <p>{movie?.text}</p>
                  <div className='flex   items-center gap-3 ' >
                    {movie?.vote == "upvote" ?
                      <ImArrowUp size={22} />
                     :
                      <ThickArrowUpIcon className='text-custom-30  ' height={24} width={24} onClick={() => handleUpvote({ id: movie.reviewId })} />
                    }
                    
                    {movie.vote == "downvote" ? 
                      <ImArrowDown size={22} />:
                    <ThickArrowDownIcon height={24} width={24} onClick={() => handleDownvote({ id: movie.reviewId })} />
                    
                  }
                    
                    {movie?.owner &&
                      (<>
                    <UpdateIcon height={24} width={24} onClick={() => textfield({ id: movie.reviewId })} />
                    <Cross2Icon height={24} width={24} onClick={() => handleDelete({ rid: movie.reviewId })} />
                      </>
                    )}
                  </div>
                </div>
                {movie?.owner && textArea && (
                  <form method="get">
                    <textarea
                      value={reviewText}
                      onChange={(e) => setreviewText(e.target.value)}
                      name="updateText"
                      id="updateText"
                      rows="2"
                      placeholder="Update review"
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                    <button onClick={handleUpdateReview} className="mt-2 px-4 py-2 bg-custom-50 text-white rounded hover:bg-black">
                      Update
                    </button>
                  </form>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommentSection;









