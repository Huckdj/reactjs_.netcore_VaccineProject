import React from 'react'
import {Route, Routes} from "react-router-dom";
import HomeComponent from '../Controller/Public/HomeComponent';

function PublicRoute() {
  return (
    <Routes >
        <Route path='/' element={<HomeComponent/>}/>
    </Routes>
  )
}

export default PublicRoute
