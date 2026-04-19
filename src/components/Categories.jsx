import React from 'react'
// import axios from 'axios'
// import { useQuery } from '@tanstack/react-query'
import { BallTriangle } from "react-loader-spinner";
import useAllCategories from '../customeHoks/useAllCategories';
export default function Categories() {
 
  const { data, isLoading, isError} = useAllCategories();

 if(isError){
    return <h2 className='text-center text-red-500 mt-10'>Error fetching Categories</h2>
 }
if(isLoading){
 return   <div className="flex justify-center items-center h-screen">
      <BallTriangle
        height={100}
        width={100}
        color="#4fa94d"
        ariaLabel="loading"
        visible={true}
      />
    </div>
}

    return ( <div className='container mx-auto py-10'>
<div className='grid grid-cols-4 gap-6'>
  {data.data.data.map(category => (
    
    <div 
      key={category._id} 
      className='bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 cursor-pointer group'
    >

      {/* Image */}
      <div className='overflow-hidden'>
        <img 
          src={category.image} 
          alt={category.name} 
          className='w-full h-48 group-hover:scale-110 transition duration-300'
        />
      </div>

      {/* Text */}
      <div className='p-4 text-center'>
        <h2 className='text-lg font-semibold text-gray-800 group-hover:text-emerald-600 transition'>
          {category.name}
        </h2>

        {/* خط بسيط تحت الاسم */}
        <div className='w-10 h-1 bg-emerald-500 mx-auto mt-2 rounded-full'></div>
      </div>

    </div>

  ))}
</div>


    </div>
  )
}
