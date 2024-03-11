import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios';
import { Text } from '@radix-ui/themes';
import { CheckIcon, Cross2Icon } from '@radix-ui/react-icons';
import { useApi } from '../Context/Contxt';

function FriendPage() {
  const { userData } = useApi();
  const [friendData, setFriendData] = useState();
  const handleAccept = async ({ id }) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/friend/accept?userId=${id}`
      );
      window.location.reload();
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
   
      window.location.reload();
    } catch (error) {
      console.error("Error fetching movies:", error.message);
    }
  };
  console.log(userData)
  
  // useEffect(() => {
  //   const handleFriendRequest = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:5000/api/friend/requestList`)
  //       console.log(response.data);
  //       setFriendData(response.data)
  //     } catch (error) {
  //       console.error('Error fetching movies:', error.message);
  //     }
  //   };
  //   handleFriendRequest();
  // }, [])
  // console.log(friendData)


  return (
      <div className='bg-custom-30' >
          <div className='bg-gray-900' ><Navbar /></div>
      <div>
        
        <Text className='text-custom-20 flex justify-center ' size={"6"} >Request LIST</Text>
        {userData?.requestList?.map((friend , index) => (
          <div className='bg-custom-20 p-3 m-3 rounded-lg flex  justify-between' >
            <Text size={"5"} >{friend?.userName}</Text>
             <div className='flex  ' >
            <CheckIcon height={32} width={32} className='cursor-pointer'
              onClick={() => handleAccept({ id: friend.id })}
            />
              <Cross2Icon height={32} width={32} className='cursor-pointer'
              onClick={() => handleDeny({ id: friend.id })} />
            </div>
          </div>
        ))}

        <Text className='text-custom-20 flex justify-center ' size={"6"} >Friend LIST</Text>
        {userData?.friendList?.map((friend, index) => (
          <div className='bg-custom-20 p-3 m-3 rounded-lg flex  justify-between' >
            <Text size={"5"} >{friend?.userName}</Text>

            
          </div>
        ))}


        </div>
      
    </div>
  )
}

export default FriendPage
