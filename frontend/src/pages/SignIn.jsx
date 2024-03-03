import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useApi } from '../Context/Contxt';
// import {getAuth,signInWithEmailAndPassword} from "firebase/auth"
// import {auth} from '../firebaseconfig/firebaseConfig.js'
import Footer from "../components/Footer"
import * as Tabs from '@radix-ui/react-tabs';
import Bookim from "../assets/Bookim.jpg"
import Lookim from "../assets/ImIM.svg"
import Navbar from "../pages/Navbar"
 

export default function SignIn() {
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [name, setname] = useState("");
  const [error, seterror] = useState(false);
  const navigate = useNavigate();
  const { setUserUid } = useApi();
  
 
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/signin', { email, password });
      setUserUid(response.data.signInObj.user.uid);
      localStorage.setItem("uid" , response.data.signInObj.user.uid)
      navigate('/');
    } catch (error) {
      console.error('Error signing in:', error.message);
      seterror(true)
    }
  };
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/signup', { email,name, password });
      console.log(response.data.msg);
      navigate('/');
    } catch (error) {
      console.error('Error signing in:', error.message);
      seterror(true)
      alert(error.message);
    }
  };


  return (
    <>
      <Navbar/>
      <div className='bg-custom-30 p-10 mt-20  '>
        <div>
        {
            error ? (<div class="bg-red-100 border p-3 mb-3 border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong class="font-bold">Bad Credentials!</strong>
              <span class="block sm:inline">  Try to sign Up again</span>
              <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
                <svg  class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
              </span>
            </div>
            ) :
            <div></div>
        }

      <h1 className='font-bold font-mono text-lg  text-custom-50 font-bold' >PLOT PALETTE.</h1>
          <div className=" md:grid md:grid-cols-2 p-3 flex flex-col justify-center items-center gap-3 sm:grid sm:grid-cols-2 sm:justify-around m-2 ">
      <div className='z-10 h-full flex  hidden md:block '>
        <img className='h-[410px] w-[500px] border-3 border-black rounded-lg sm:rounded-none ' src={Bookim} alt="" />
      </div>
      <div className='z-10  '>
        <Tabs.Root
          className="flex flex-col w-[400px] h-[410px]  "
          defaultValue="tab1"
        >
          <Tabs.List className="shrink-0 flex " aria-label="Manage your account">
            <Tabs.Trigger
              className="bg-black px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-white select-none first:rounded-tl-md last:rounded-tr-md hover:text-custom-30 data-[state=active]:text-custom-10 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black outline-none cursor-default"
              value="tab1"
            >
              LOGIN
            </Tabs.Trigger>
            <Tabs.Trigger
              className="bg-black px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-white select-none first:rounded-tl-md last:rounded-tr-md hover:text-custom-30 data-[state=active]:text-custom-10 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black outline-none cursor-default"
              value="tab2"
            >
              SIGN UP
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content
            className="grow p-5 bg-white  outline-none "
            value="tab1"
          >
            <p className="mb-5 text-mauve11 text-[15px] leading-normal">
              Make changes to your account here. Click save when you're done.
            </p>
            <fieldset className="mb-[15px] w-full flex flex-col justify-start">
              <label className="text-[13px] leading-none mb-2.5 text-violet12 block" htmlFor="name">
               Email
              </label>
                <input
                  value={email} onChange={(e)=>setemail(e.target.value)}
                  className="grow shrink-0 rounded px-2.5 text-[15px]  shadow-[0_0_0_1px] shadow-violet7 h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-violet8 leading-none text-violet11  h-[35px]  outline-none required "
                id="name" />
            </fieldset>
            <fieldset className="mb-[15px] w-full flex flex-col justify-start">
              <label className="text-[13px] leading-none mb-2.5 text-violet12 block" htmlFor="username">
                  Password
              </label>
                <input value={password} onChange={(e) => setpassword(e.target.value)}
                className="grow required shrink-0 rounded px-2.5 text-[15px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-violet8 outline-none"
                id="username"
              />
            </fieldset>
            <div className="flex justify-end mt-5">
              <button onClick={handleLogin} className="inline-flex items-center justify-center rounded px-[15px] text-[15px] leading-none font-medium h-[35px] bg-black text-white hover:bg-green5 focus:shadow-[0_0_0_2px] focus:shadow-green7 outline-none cursor-default">
                LOGIN
              </button>
            </div>
          </Tabs.Content>
          <Tabs.Content
            className="grow p-5 bg-white  "
            value="tab2"
          >
            <p className="mb-5 text-mauve11 text-[15px] leading-normal">
              Change your password here. After saving, you'll be logged out.
            </p>
            <fieldset className="mb-[15px] w-full flex flex-col justify-start">
              <label
                className="text-[13px] leading-none mb-2.5 text-violet12 block"
                htmlFor="currentPassword"
              >
                Email
              </label>
                <input 
                  value={email} onChange={(e) => setemail(e.target.value)}
                className="grow shrink-0 rounded px-2.5 text-[15px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-violet8 outline-none"
                id="currentPassword"
                
              />
            </fieldset>
            <fieldset className="mb-[15px] w-full flex flex-col justify-start">
              <label
                className="text-[13px] leading-none mb-2.5 text-violet12 block"
                htmlFor="newPassword"
              >
               UserName
              </label>
                <input
                  value={name} onChange={(e) => setname(e.target.value)}
                className="grow shrink-0 rounded px-2.5 text-[15px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-violet8 outline-none"
                id="newPassword"
                
              />
            </fieldset>
            <fieldset className="mb-[15px] w-full flex flex-col justify-start">
              <label
                className="text-[13px] leading-none mb-2.5 text-violet12 block"
                htmlFor="confirmPassword"
              >
              Password
              </label>
                <input
                  value={password} onChange={(e) => setpassword(e.target.value)}
                className="grow shrink-0 rounded px-2.5 text-[15px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-violet8 outline-none"
                id="confirmPassword"
                
              />
            </fieldset>
            <div className="flex justify-end mt-5">
              <button onClick={handleSignUp} className="inline-flex items-center justify-center rounded px-[15px] text-[15px] leading-none font-medium h-[35px] bg-black text-white hover:bg-green5 focus:shadow-[0_0_0_2px] focus:shadow-green7 outline-none cursor-default">
                SIGN UP
              </button>
            </div>

          </Tabs.Content>
        </Tabs.Root>

      </div>
      </div> 
    
      </div>
    </div>
    <Footer   /></>
  )
}


  



 
   
 
   
 
   