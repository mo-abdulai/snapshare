import {React, useState, useEffect} from 'react'
import GoogleLogin from 'react-google-login'
import { useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import shareVideo from '../assets/share.mp4'
import logo from '../assets/logowhite.png'
import { gapi } from "gapi-script";


import { client } from '../client'

const Login = () => {

    const [email, setEmail] = useState('');
 
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        // You can handle form submission here, for example, sending email and password to a backend server
        console.log('Email:', email);
       
      };
 
    const navigate = useNavigate();
    const responseGoogle = (response) => {
    if(response && response.profileObj){

    localStorage.setItem('user', JSON.stringify(response.profileObj))
    
    const { name, googleId, imageUrl } = response.profileObj
    const doc = {
      _id: googleId,
      _type: 'user',
      userName: name,
      image: imageUrl
    }
    
      client.createIfNotExists(doc)
       .then(() => {
        navigate('/', {replace: true})
      }).catch((error) => {
        console.error('Error creating user:', error);
      })
      }else{
            console.error('Google login failed or user canceled the operation.');
      }
  }


  return (
    <div className='flex justify-start items-center flex-col h-screen'>
      <div className='relative w-full h-full'>
        <video 
          src={shareVideo} 
          type='video/mp4' 
          loop 
          controls={false} 
          muted 
          autoPlay
          className='w-full h-full object-cover'
          />

          <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
            <div className='p-5'>
              <img src={logo} width='130px' alt='logo' />
           </div>

            <form onSubmit={handleSubmit} className='shadow-2xl flex flex-col items-center'>
            <input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={handleEmailChange} 
              className='bg-gray-200 px-4 py-2 rounded-md mb-4'
            />
           
            <button type='submit' className='bg-blue-500 flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none'>
              Sign in with Email
            </button>
          </form>

            <div className='shadow-2xl p-4' >
              <GoogleLogin 
                clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
                render={(renderProps) => (
                  <button
                    type='button'
                    className='bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none'
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    >
                      <FcGoogle className='mr-4'/> Sign in with Google
                  </button>
                  
                )}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy='single_host_origin'
              />
            </div>
          
          </div>
      </div>
    </div>
  )
}

export default Login
