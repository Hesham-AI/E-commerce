// import React from 'react'
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Alert } from "flowbite-react";
    import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";
// import { HiInformationCircle } from "react-icons/hi";
export default function Register() {


 const [errRegister,setErrRegister]=useState(null)
 const [resRegister,setResRegister]=useState(false)
const [isClicked,setIsClicked]=useState(false)
 const navigate = useNavigate()



    let user=
    
{
    name:"",
    email:"",
    phone:"",  
      password: "",
  rePassword: "" 
}

  async function registerUser (values){
    setIsClicked(true)  
  await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup" , values)
.then( (res)=>{
console.log( "Registration successful:", res.data.user);
setResRegister(true)
// setIsClicked(false)
setTimeout( ()=>{
navigate("/login")
}
 , 2000)

}  )

.catch( (err)=>{
    console.log("Registration failed:", err.response.data.message);

    setErrRegister(err.response.data.message)
      setIsClicked(false)
    setTimeout( ()=>{
      setErrRegister(null)
    } , 2000)
})


}



 let registerFormik = useFormik({

initialValues:  user
,
onSubmit: registerUser
,

// validate:function(values){

//     let errors={}   
// const regexEmail=/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
// const regexPhone=/^01[0125][0-9]{8}$/;

// if(values.name.length<3 || values.name.length>10){
//     errors.name="Name must be between 3 and 10 characters"
// }
// if( !regexEmail.test(values.email) ){

//     errors.email="Email is not valid"
// }
// if( !regexPhone.test(values.phone) ){

//     errors.phone="Phone is not valid"
// }
// if(values.password.length<6 || values.password.length>15){
//     errors.password="Password must be between 6 and 15 characters"
// }
// if(values.password!==values.repeat_password){
//     errors.repeat_password="Password and repeat password must be the same"
// }
// console.log(errors);

// return errors}

validationSchema:  Yup.object().shape({
    name: Yup.string().min(3,"Name must be between 3 and 10 characters").max(10,"Name must be between 3 and 10 characters").required("Name is required"),
    email: Yup.string().email("Email is not valid").required("Email is required"),
    phone: Yup.string().matches(/^01[0125][0-9]{8}$/,"Phone is not valid").required("Phone is required"),
    password: Yup.string().min(6,"Password must be between 6 and 15 characters").max(15,"Password must be between 6 and 15 characters").required("Password is required"),
    rePassword: Yup.string().oneOf([Yup.ref('password') , null], 'Password and repeat password must be the same').required("Repeat password is required")   

})
 })


  return (
    
     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

  <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">

    {/* TITLE */}
    <h1 className="text-3xl font-bold flex items-center justify-center gap-3 mb-6 bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent">
      <FaUserPlus className="text-emerald-500" />
      Register
    </h1>

    {/* ERROR */}
    {errRegister && (
      <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-sm">
        {errRegister}
      </div>
    )}

    {/* SUCCESS */}
    {resRegister && (
      <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-4 text-sm flex items-center gap-2">
        <i className="fa-solid fa-check text-green-500"></i>
        Registration successful, you can login now
      </div>
    )}

    {/* FORM */}
    <form onSubmit={registerFormik.handleSubmit} className="space-y-5">

      {/* NAME */}
      <div>
        <input
          type="text"
          name="name"
          value={registerFormik.values.name}
          onBlur={registerFormik.handleBlur}
          onChange={registerFormik.handleChange}
          placeholder="Name"
          className="w-full border-b-2 border-gray-300 focus:border-emerald-500 outline-none py-2"
        />
        {registerFormik.errors.name && registerFormik.touched.name && (
          <p className="text-red-500 text-sm">{registerFormik.errors.name}</p>
        )}
      </div>

      {/* EMAIL */}
      <div>
        <input
          type="email"
          name="email"
          value={registerFormik.values.email}
          onBlur={registerFormik.handleBlur}
          onChange={registerFormik.handleChange}
          placeholder="Email address"
          className="w-full border-b-2 border-gray-300 focus:border-emerald-500 outline-none py-2"
        />
        {registerFormik.errors.email && registerFormik.touched.email && (
          <p className="text-red-500 text-sm">{registerFormik.errors.email}</p>
        )}
      </div>

      {/* PHONE */}
      <div>
        <input
          type="tel"
          name="phone"
          value={registerFormik.values.phone}
          onBlur={registerFormik.handleBlur}
          onChange={registerFormik.handleChange}
          placeholder="Phone number"
          className="w-full border-b-2 border-gray-300 focus:border-emerald-500 outline-none py-2"
        />
        {registerFormik.errors.phone && registerFormik.touched.phone && (
          <p className="text-red-500 text-sm">{registerFormik.errors.phone}</p>
        )}
      </div>

      {/* PASSWORD */}
      <div>
        <input
          type="password"
          name="password"
          value={registerFormik.values.password}
          onBlur={registerFormik.handleBlur}
          onChange={registerFormik.handleChange}
          placeholder="Password"
          className="w-full border-b-2 border-gray-300 focus:border-emerald-500 outline-none py-2"
        />
        {registerFormik.errors.password && registerFormik.touched.password && (
          <p className="text-red-500 text-sm">{registerFormik.errors.password}</p>
        )}
      </div>

      {/* CONFIRM PASSWORD */}
      <div>
        <input
          type="password"
          name="rePassword"
          value={registerFormik.values.rePassword}
          onBlur={registerFormik.handleBlur}
          onChange={registerFormik.handleChange}
          placeholder="Confirm password"
          className="w-full border-b-2 border-gray-300 focus:border-emerald-500 outline-none py-2"
        />
        {registerFormik.errors.rePassword && registerFormik.touched.rePassword && (
          <p className="text-red-500 text-sm">{registerFormik.errors.rePassword}</p>
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
