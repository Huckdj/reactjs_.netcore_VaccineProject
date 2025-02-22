/* eslint-disable react-hooks/exhaustive-deps */
import React,{useEffect, useState} from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
// import component
import NotFoundComponent from "./Controller/Public/NotFoundComponent"
import AdminComponent from './Controller/Private/AdminTabComponent';
import HomeComponent from './Controller/Public/HomeComponent';
import PostDetailComponent from './Controller/Public/PostDetailComponent';
import PostVaccineEverything from './Controller/Public/Post/PostVaccineEverything';
import LoginComponent from './Controller/Public/Auth/LoginComponent';
import RegisterComponent from './Controller/Public/Auth/RegisterComponent.js'
import LogoutComponent from './Controller/Public/Auth/LogoutComponent.js';
import InfoUserComponent from './Controller/Public/InfoUserComponent.js'
import LoadingComponent from './Controller/Additional/LoadingComponent.js';
import FindCenterComponent from './Controller/Public/Home/FindCenterComponent.js';
import BookingComponent from './Controller/Public/BookingComponent.js';
import ThanksOrderComponent from './Controller/Public/ThanksOrderComponent.js'
import SearchResultComponent from './Controller/Public/SearchResultComponent.js';
import NewsComponent from './Controller/Public/NewsComponent.js';
import VaccineComponent from './Controller/Public/VaccineComponent.js'
import ProductDetail from './Controller/Public/ProductVaccineDetail.js';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ResetPassword from './Controller/Public/Auth/ResetPassword.js'
function App() {
  const urlapi = process.env.REACT_APP_API_BASE_URL
  const [allowAdmin, setAllowAdmin] = useState('')
  const [isLoading,setIsLoading] = useState(true)
  const [blocklogin, setBlocklogin] = useState()
  useEffect(() => {
    setBlocklogin(localStorage.getItem('us'))
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`${urlapi}/api/AuthUser/GetUserInfo`, {
          headers: {
            Authorization: `Bearer ` + token,
          },
        })
        .then((res) => {
          setAllowAdmin(res.data.role)
          setBlocklogin(true)
          setIsLoading(false)
        })
        .catch(err =>{
          setAllowAdmin('User')
          setIsLoading(false)
          setBlocklogin(false)
        })
    }else{
      setIsLoading(false)
      setBlocklogin(false)
    }
  },[]);
  if(isLoading){
    return(
    <div>
      <LoadingComponent/>
    </div>)
  }
  return (
    <GoogleOAuthProvider clientId="454080178023-lthmoagt7fcd4pe086olq14od0ba9t0b.apps.googleusercontent.com">
    <Routes>
      <Route path='/' element={<HomeComponent />} />
      {allowAdmin !== 'Admin' ? (
        <Route path='/adminmadu' element={<NotFoundComponent />} />
      ):
      (
        <Route path='/adminmadu' element={<AdminComponent />} />
      )}
      <Route path="/post/:LinkRoute" element={<PostDetailComponent />}/>
      <Route path="tat-ca-bai-viet-vaccine" element={<PostVaccineEverything />}/>
      <Route path="*" element={<NotFoundComponent />} />
      <Route path="/404" element={<NotFoundComponent />} />
      {blocklogin ? (
        <>
          <Route path='/dang-nhap-hoac-dang-ky' element={<HomeComponent/>}/>
          <Route path='/dang-ky-tai-khoan' element={<HomeComponent/>}/>
        </>
      ):(
        <>
          <Route path='/dang-nhap-hoac-dang-ky' element={<LoginComponent/>}/>
          <Route path='/dang-ky-tai-khoan' element={<RegisterComponent/>}/>
        </>
      )}
      <Route path='/dang-xuat' element={<LogoutComponent/>}/>
      <Route path='/thong-tin-nguoi-dung' element={<InfoUserComponent/>}/>
      <Route path='/tim-kiem-trung-tam' element={<FindCenterComponent/>}/>
      <Route path='/dat-lich-tiem-chung' element={<BookingComponent/>}/>
      <Route path='/cam-on' element={<ThanksOrderComponent/>}/>
      <Route path='/search' element={<SearchResultComponent/>}/>
      <Route path='/tin-tuc' element={<NewsComponent/>}/>
      <Route path='/goi-vac-xin' element={<VaccineComponent/>}/>
      <Route path="/vaccine/:route" element={<ProductDetail />}/>
      <Route path="/quen-mat-khau" element={<ResetPassword />}/>
    </Routes>
    </GoogleOAuthProvider>
  );
}

export default App;
