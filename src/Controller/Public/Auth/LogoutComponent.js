/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import LoadingComponent from '../../Additional/LoadingComponent';
function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

function LogoutComponent() {
    const navigate = useNavigate()
    const token = sessionStorage.getItem('token')
    const random = generateRandomString(100)
    const [isLoading,setIsLoading] = useState(true)
    useEffect(()=>{
        const tokenlogout = `${token}${random}`
        localStorage.setItem('token',tokenlogout)
        localStorage.removeItem('us')
        navigate('/')
        const timer = setTimeout(() => {
          setIsLoading(false)
        }, 3000);
        return () => clearTimeout(timer);
    },[])
  return (
    <>
        {isLoading &&<LoadingComponent/>}
    </>
  )
}

export default LogoutComponent
