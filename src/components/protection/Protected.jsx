import React from 'react'
import { Navigate } from 'react-router-dom'

export default function Protected({children}) {

    if( localStorage.getItem('tkn')==null){

        return <Navigate  to="/Login" />
    }



  return (
    <div>{children}</div>
  )
}
