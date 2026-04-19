import axios from 'axios';
// import React, { useEffect ,useState } from 'react'
import { BallTriangle } from "react-loader-spinner";

import SimpleSlider from './HomeSlider';

import img1 from '../assets/images/blog-img-1.jpeg'
import img2 from '../assets/images/blog-img-2.jpeg'
import CategoriesSlider from './CategoriesSlied';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import toast from 'react-hot-toast';


export default function Products() {
const { addToCart } = useContext(CartContext);
  
async function handelAddProduct(id){
  const resFalg = await addToCart(id)
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



//  const [AllProducts, setProducts] = useState(null);



  function getProducts(){
 return axios.get("https://ecommerce.routemisr.com/api/v1/products")
 

}

 const { data , isError , isLoading }  = useQuery({
    queryKey: ['products'],
    queryFn: getProducts
   })

   if(isError){
    return <h2 className='text-center text-red-500 mt-10'>Error fetching products</h2>
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




// useEffect(() => {
// getProducts()

// }, [])






// console.log(AllProducts ,"pro");
  return (
<>
  <div className="mt-6 mx-auto w-[95%] space-y-10">

    {/* HERO SECTION */}
    <div className="flex flex-col lg:flex-row gap-6 items-center">

      {/* SLIDER */}
      <div className="lg:w-[75%] w-full rounded-2xl overflow-hidden shadow-lg">
        <SimpleSlider />
      </div>

      {/* SIDE BANNERS */}
      <div className="lg:w-[25%] w-full flex lg:flex-col gap-4">

        <img src={img1} className="w-full h-48 object-cover rounded-xl shadow" alt="" />
        <img src={img2} className="w-full h-48 object-cover rounded-xl shadow" alt="" />

      </div>

    </div>

    {/* CATEGORIES */}
    <CategoriesSlider />

    {/* PRODUCTS */}
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">

      {data.data.data.map((pro) => (

        <Link
          key={pro._id}
          to={`/ProductDetails/${pro._id}`}
          className="group bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden"
        >

          {/* IMAGE */}
          <div className="relative overflow-hidden">

            <img
              src={pro.imageCover}
              alt={pro.title}
              className="w-full h-44 object-cover group-hover:scale-110 transition duration-300"
            />

            {/* ADD BUTTON */}
            <button
              onClick={(e) => {
                e.preventDefault();
                handelAddProduct(pro._id);
              }}
              className="absolute top-2 right-2 bg-emerald-500 hover:bg-emerald-600 text-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition"
            >
              <i className="fa-solid fa-plus"></i>
            </button>

          </div>

          {/* CONTENT */}
          <div className="p-3 space-y-2">

            <h3 className="font-semibold text-emerald-600 text-sm">
              {pro.title.split(" ").slice(0, 2).join(" ")}
            </h3>

            <div className="flex justify-between items-center">

              <span className="text-gray-800 font-bold">
                ${pro.price}
              </span>

              <span className="text-yellow-500 text-sm flex items-center gap-1">
                {pro.ratingsAverage}
                <i className="fa-solid fa-star"></i>
              </span>

            </div>

          </div>

        </Link>

      ))}

    </div>

  </div>
</>

  )
}
