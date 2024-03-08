import React from 'react'
import Navbar from './Navbar'
import { useParams } from 'react-router-dom'

function OtherFriend() {
    const { UserID } = useParams();
  return (
      <div className='bg-custom-30' >
          <div className='bg-gray-900' ><Navbar /></div>
          <div>
              USER FRIEND LIST
          </div>
      </div>
  )
}

export default OtherFriend
