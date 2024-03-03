import React from 'react'
import Navbar from './Navbar'
import Booktemplate from '../components/Booktemplate'

function Template() {
  return (
      <div className='bg-custom-30' >
      <div className='bg-gray-900'  ><Navbar className /></div>
      <Booktemplate /> 
      </div>
  )
}

export default Template
