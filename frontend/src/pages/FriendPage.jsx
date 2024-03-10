import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios';
import { Text } from '@radix-ui/themes';
import { CheckIcon, Cross2Icon } from '@radix-ui/react-icons';

function FriendPage() {
  const [friendData, setFriendData] = useState();
  const handleAccept = async ({ id }) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/friend/accept?userId=${id}`
      );
      console.log(response);
    } catch (error) {
      console.error("Error fetching movies:", error.message);
    }
  };

  const handleDeny = async ({ id }) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/friend/deny?userId=${id}`
      );
      console.log(response);
    } catch (error) {
      console.error("Error fetching movies:", error.message);
    }
  };
  
  useEffect(() => {
    const handleFriendRequest = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/friend/requestList`)
        console.log(response.data);
        setFriendData(response.data)
      } catch (error) {
        console.error('Error fetching movies:', error.message);
      }
    };
    handleFriendRequest();
  },[])


  return (
      <div className='bg-custom-30' >
          <div className='bg-gray-900' ><Navbar /></div>
          <div>
        USER FRIEND LIST
        {friendData?.reqList?.map((friend , index) => (
          <div className='bg-custom-20 p-3 m-1 rounded-lg justify-center' >
            <Text size={"5"} >{friend?.userName}</Text>
           
             
            <CheckIcon height={24} width={24}
              onClick={() => handleAccept({ id: friend.id })}
            />
            <Cross2Icon height={24} width={24}
              onClick={() => handleDeny({ id: friend.id })} />
            

         

          </div>
       ))}


        </div>
      
    </div>
  )
}

export default FriendPage
