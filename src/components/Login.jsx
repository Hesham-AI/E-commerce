// import React from 'react'
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Alert } from "flowbite-react";
    import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
// import { FaLock } from "react-icons/fa";
export default function Login() {

  const { Token, setToken } = useContext(authContext);
 const [errLogin,setErrLogin]=useState(null)
 const [ resLogin , setResLogin]=useState(false)
const { getUserCart } = useContext(CartContext);
const [isClicked,setIsClicked]=useState(false)
 const navigate = useNavigate()

let userLogin={
     email:"",
     password:""
}


async function LoginUser (values){

await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
.then((res)=>{
console.log("Login successful:", res);
localStorage.setItem("tkn",res.data.token)
setToken(res.data.token)
getUserCart()
setIsClicked(true)
setResLogin(true)
setTimeout(()=>{
    setResLogin(false)
    // localStorage.setItem("token",res.data.token)
    navigate("/products")
},2000)
})

.catch((err)=>{
    console.log("Login failed:", err);
   setIsClicked(true)
   
    setErrLogin(err.response.data.message)
    setTimeout(()=>{
setIsClicked(false)
      setErrLogin(null)
    },2000)
   
})
}

  let LoginFormik=useFormik({
    initialValues:userLogin,

onSubmit:LoginUser ,
validationSchema: Yup.object().shape({
    email:Yup.string().email("Invalid email format").required("Email is required"),
    password:Yup.string().required("password is required").min(6,"password must be at least 6 characters").max(15,"password must be less than 15 characters")
})


  })

  return (
<div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

  <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">

    {/* Title */}
    <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent mb-6">
      Login
    </h1>

    {/* ERROR */}
    {errLogin && (
      <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-sm flex items-center gap-2">
        <i className="fa-solid fa-triangle-exclamation text-red-500"></i>
        {errLogin}
      </div>
    )}

    {/* SUCCESS */}
    {resLogin && (
      <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-4 text-sm flex items-center gap-2">
        <i className="fa-solid fa-check text-green-500"></i>
        Login successful
      </div>
    )}

    {/* FORM */}
    <form onSubmit={LoginFormik.handleSubmit} className="space-y-6">

      {/* EMAIL */}
      <div>
        <input
          type="email"
          name="email"
          value={LoginFormik.values.email}
          onBlur={LoginFormik.handleBlur}
          onChange={LoginFormik.handleChange}
          placeholder="Email address"
          className="w-full border-b-2 border-gray-300 focus:border-emerald-500 outline-none py-2 text-gray-800"
        />

        {LoginFormik.errors.email && LoginFormik.touched.email && (
          <p className="text-red-500 text-sm mt-1">
            {LoginFormik.errors.email}
          </p>
        )}
      </div>

      {/* PASSWORD */}
      <div>
        <input
          type="password"
          name="password"
          value={LoginFormik.values.password}
          onBlur={LoginFormik.handleBlur}
          onChange={LoginFormik.handleChange}
          placeholder="Password"
          className="w-full border-b-2 border-gray-300 focus:border-emerald-500 outline-none py-2 text-gray-800"
        />

        {LoginFormik.errors.password && LoginFormik.touched.password && (
          <p className="text-red-500 text-sm mt-1">
            {LoginFormik.errors.password}
          </p>
        )}
      </div>

      {/* BUTTON */}
      <button
        type="submit"
        disabled={isClicked}
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2"
      >
        {isClicked ? (
          <>
            <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
            Loading...
          </>
        ) : (
          "Submit"
        )}
      </button>

    </form>

  </div>

</div>
  )

}
