import React from 'react'
import Navbar from './Navbar'
import axios from 'axios';
import { Text } from '@radix-ui/themes';
import { CheckIcon, Cross2Icon } from '@radix-ui/react-icons';
import { useApi } from '../Context/Contxt';

function FriendPage() {
  const { userData } = useApi();
  const handleAccept = async ({ id }) => {
    try {
      const response = await axios.post(
        `${process.env.BACKEND_URL}api/friend/accept?userId=${id}`
      );
      window.location.reload();
      console.log(response);
    } catch (error) {
      console.error("Error fetching movies:", error.message);
    }
  };

  const handleDeny = async ({ id }) => {
    try {
      await axios.delete( `${process.env.BACKEND_URL}api/friend/deny?userId=${id}` );
   
      window.location.reload();
    } catch (error) {
      console.error("Error fetching movies:", error.message);
    }
  };
  console.log(userData)

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
