import React from 'react'
import Navbar from './Navbar'
import { useParams } from 'react-router-dom'
import { useApi } from '../Context/Contxt';
import { Text } from '@radix-ui/themes';

function OtherFriend() {
    const { UserID } = useParams();
    const { otheruserData } = useApi();
    
  return (
      <div className='bg-custom-30' >
          <div className='bg-gray-900' ><Navbar /></div>
          <div className='m-3  '>
              <Text className='text-custom-20 flex justify-center m-2 ' size={"7"}>Friend List</Text>
            
              { otheruserData?.friendList?.map((friend , index)=>(
                  <div className='bg-custom-20 rounded-lg m-2 p-3 ' key={index}>
                      
                              <div class="flex-1 min-w-0">
                                  <Text size={"6"} class="text-sm font-bold text-custom-50 flex justify-center ">
                                     {friend?.userName}
                                  </Text>

                              </div>
                              
                     
                      
                </div>
              ))}
              

          </div>
      </div>
  )
}

export default OtherFriend
