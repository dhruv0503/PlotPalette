import React from 'react'
import Navbar from './Navbar'
import axios from 'axios';
import { Text } from '@radix-ui/themes';
import { CheckIcon, Cross2Icon } from '@radix-ui/react-icons';
import { useApi } from '../Context/Contxt';
import { useNavigate } from 'react-router-dom';

function FriendPage() {
  const navigate = useNavigate();
  const { userData } = useApi();
  const handleAccept = async ({ id }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}api/friend/accept?userId=${id}`
      );
      window.location.reload();
      console.log(response);
    } catch (error) {
      console.error("Error fetching movies:", error.message);
    }
  };

  const handleDeny = async ({ id }) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}api/friend/deny?userId=${id}`);

      window.location.reload();
    } catch (error) {
      console.error("Error fetching movies:", error.message);
    }
  };
  console.log(userData)

  return (
    <div className='bg-custom-30' >
      <div className='bg-gray-900' ><Navbar /></div>
      <div className='grid grid-cols-2'>
        <div>
          <Text className='text-custom-20 flex justify-center ' size={"7"} >Friend List</Text>
          {userData?.friendList?.map((friend, index) => (
            <div className='bg-custom-20 p-3 m-3 rounded-lg flex  justify-between' onClick={() => navigate(`/account/${friend?.userName}`)}>
              <Text size={"5"} >{friend?.userName}</Text>
            </div>
          ))}
        </div>

        <div>
          <Text className='text-custom-20 flex justify-center ' size={"7"} >Request List</Text>
          {userData?.requestList.length === 0 ?
            <div className='text-custom-20 p-3 m-3 rounded-lg flex justify-center' >
              <Text size={"5"} >No Request Pending</Text>
            </div>
            :
            (userData?.requestList?.map((friend, index) => (
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
            )))
          }
        </div>
      </div>
    </div>
  )
}

export default FriendPage
