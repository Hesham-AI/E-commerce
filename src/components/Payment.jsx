import axios from 'axios';
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { CartContext } from '../context/CartContext';
import toast from 'react-hot-toast';

export default function Payment() {
const { cartId ,clearCartAfterPayment } = useContext(CartContext);
 const [isOnLine, setIsOnLine] = useState(false);

function detectedPayMent(values){
if(isOnLine){
  // console.log("online payment");
  paymentOnLine(values)
}

else{
  // console.log("cash payment");
  creatCachOrder(values)
}

}


// 
function paymentOnLine(values){
  const backEndBody={
    shippingAddress: values
  }
   return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`, backEndBody,
    {
        headers:{
            token: localStorage.getItem('tkn')
        },
        params:{
            url:"http://localhost:5173"
        }


    }).then((res)=>{
    console.log( "success" , res);
window.open(res.data.session.url , "_self")
     toast.success("Products purchased successfully!",{
    duration: 3000,
  })
    clearCartAfterPayment()
   })
    .catch((err)=>{
        console.log("error" , err.response.data);
        toast.error("Failed to purchase products.",{
    duration: 3000,
  })
    //   console.log( "error" , );
    })}

// 

     function creatCachOrder(values){
  console.log(values);
  const backEndBody={
    shippingAddress: values
  }
   return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, backEndBody,
    {
        headers:{
            token: localStorage.getItem('tkn')
        }
    }).then((res)=>{
    console.log( "success" , res);
     toast.success("Products purchased successfully!",{
    duration: 3000,
  })
    clearCartAfterPayment()
   })
    .catch((err)=>{
        console.log(err.response.data);
        toast.error("Failed to purchase products.",{
    duration: 3000,
  })
    //   console.log( "error" , );
    })}

// 

    const paymentFormik = useFormik({
        initialValues:{
            details:"",
            phone:"",
            city:""
        },
        onSubmit:detectedPayMent
        })


  return(
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10">

  <form 
    onSubmit={paymentFormik.handleSubmit}  
    className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-xl"
  >

    {/* Title */}
    <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
      Checkout Details
    </h2>

    {/* DETAILS */}
    <div className="relative z-0 w-full mb-6 group"> 
      <input
        type="text"
        name="details"
        value={paymentFormik.values.details}
        onBlur={paymentFormik.handleBlur}
        onChange={paymentFormik.handleChange}
        className="block py-3 px-0 w-full text-sm text-gray-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
      />
      <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
        peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
        peer-focus:scale-75 peer-focus:-translate-y-6">
        Details
      </label>
    </div>

    {paymentFormik.errors.details && paymentFormik.touched.details && (
      <p className="text-red-500 text-sm mb-4">
        {paymentFormik.errors.details}
      </p>
    )}

    {/* PHONE */}
    <div className="relative z-0 w-full mb-6 group"> 
      <input
        type="tel"
        name="phone"
        value={paymentFormik.values.phone}
        onBlur={paymentFormik.handleBlur}
        onChange={paymentFormik.handleChange}
        className="block py-3 px-0 w-full text-sm text-gray-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
      />
      <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
        peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
        peer-focus:scale-75 peer-focus:-translate-y-6">
        Phone Number
      </label>
    </div>

    {paymentFormik.errors.phone && paymentFormik.touched.phone && (
      <p className="text-red-500 text-sm mb-4">
        {paymentFormik.errors.phone}
      </p>
    )}

    {/* CITY */}
    <div className="relative z-0 w-full mb-6 group"> 
      <input
        type="text"
        name="city"
        value={paymentFormik.values.city}
        onBlur={paymentFormik.handleBlur}
        onChange={paymentFormik.handleChange}
        className="block py-3 px-0 w-full text-sm text-gray-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
      />
      <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
        peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
        peer-focus:scale-75 peer-focus:-translate-y-6">
        City
      </label>
    </div>

    {paymentFormik.errors.city && paymentFormik.touched.city && (
      <p className="text-red-500 text-sm mb-4">
        {paymentFormik.errors.city}
      </p>
    )}

    {/* Buttons */}
    <div className="flex gap-4 mt-6">

      <button
        onClick={() => setIsOnLine(false)}
        type="submit"
        className="flex-1 bg-gray-800 hover:bg-gray-900 text-white py-3 rounded-lg font-semibold transition"
      >
        Cash
      </button>

      <button
        onClick={() => setIsOnLine(true)}
        type="submit"
        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
      >
        Pay Online
      </button>

    </div>

  </form>
</div>
  )}
