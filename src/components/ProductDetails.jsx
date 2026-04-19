import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useContext } from 'react'
import { BallTriangle } from 'react-loader-spinner'
import { useParams } from 'react-router-dom'
import { CartContext } from '../context/CartContext'
import toast from 'react-hot-toast'
// import 'bootstrap/dist/css/bootstrap.min.css'
export default function ProductDetails() {
 const { id } = useParams()
 const {  addToCart} = useContext(CartContext)



  async function AddToProduct(id){
 const resFalg= await addToCart(id)
 console.log("result" , resFalg);
 

 if(resFalg){
  toast.success("Product added to cart successfully!",{
    duration: 3000,
  })
 }
 else{
  toast.error("Failed to add product to cart.",{
    duration: 3000,
  })
 }
 }



  function getProducts(){
 return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
 
}

 const { data , isError , isLoading }  = useQuery({
    queryKey: ['AllproductDetails', id],
    queryFn: getProducts
   })
 
   if(isError){
    return <h2 className='text-center text-red-500 mt-10'>Error fetching Details products</h2>
   }

if(isLoading){
  return <div className="flex justify-center items-center h-screen">
      <BallTriangle
        height={100}
        width={100}
        color="#4fa94d"
        ariaLabel="loading"
        visible={true}
      />
    </div>
}
 
    return (
    

   <div className="container mx-auto px-4 py-10">

  <div className="flex flex-col lg:flex-row gap-10 items-start">

    {/* IMAGE */}
    <div className="lg:w-1/2 w-full bg-white rounded-2xl shadow p-6">
      <img
        src={data.data.data.imageCover}
        alt={data.data.data.title}
        className="w-full h-[400px] object-contain rounded-xl"
      />
    </div>

    {/* DETAILS */}
    <div className="lg:w-1/2 w-full bg-white rounded-2xl shadow p-6 space-y-6">

      {/* TITLE */}
      <h1 className="text-2xl font-bold text-gray-800">
        {data.data.data.title}
      </h1>

      {/* DESCRIPTION */}
      <p className="text-gray-600 leading-relaxed">
        {data.data.data.description}
      </p>

      {/* PRICE + RATING */}
      <div className="flex items-center justify-between">

        <span className="text-2xl font-bold text-emerald-600">
          ${data.data.data.price}
        </span>

        <span className="flex items-center gap-1 text-yellow-500 font-semibold">
          {data.data.data.ratingsAverage}
          <i className="fa-solid fa-star"></i>
        </span>

      </div>

      {/* ADD TO CART */}
      <button
        onClick={() => AddToProduct(id)}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2"
      >
        Add To Cart
        <i className="fa-solid fa-cart-plus"></i>
      </button>

    </div>

  </div>

</div>
 
 )
}
