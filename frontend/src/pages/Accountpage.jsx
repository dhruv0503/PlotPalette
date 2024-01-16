import React from 'react'
import Navbar from './Navbar'
import AccountSidebar from '../Sections/AccountSidebar'
function AccountPage() {
    return (
        <>
            <Navbar />
            <div className='bg-red-300 max-w-lg max-h-screen '>
                <AccountSidebar />
            </div >
        </>
    )
}

export default AccountPage
