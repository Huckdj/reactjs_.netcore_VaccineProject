import React from 'react'
import AdminComponent from '../Controller/Private/AdminComponent'
import { Routes,Route } from 'react-router-dom'

function PrivateRoute() {
  return (
    <Routes >
        <Route path='/adminmadu' element={<AdminComponent/>}/>
    </Routes>
  )
}

export default PrivateRoute
