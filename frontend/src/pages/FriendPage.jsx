import React from 'react'
import Navbar from './Navbar'
import axios from 'axios';

function FriendPage() {
//   const handlefriendList = async ({id}) => {
//     try {
//         const response = await axios.post(`http://localhost:5000/api/friend/friendList`)
//         console.log(response);
//     } catch (error) {
//         console.error('Error fetching movies:', error.message);
//     }
// };

const handleFriendRequest = async () => {
  try {
      const response = await axios.get(`http://localhost:5000/api/friend/requestList`)
      console.log(response);
  } catch (error) {
      console.error('Error fetching movies:', error.message);
  }
};
handleFriendRequest();


  return (
      <div className='bg-custom-30' >
          <div className='bg-gray-900' ><Navbar /></div>
          <div>
              USER FRIEND LIST
        </div>
      
    </div>
  )
}

export default FriendPage
