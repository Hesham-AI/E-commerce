import React from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { BallTriangle } from "react-loader-spinner";
export default function Brand() {
 
 function getbrand(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/brands')
 }
 
 const { data, isLoading, isError } =  useQuery({
queryKey:["Allbrand"],
queryFn: getbrand

 })

 if(isError){
    return <h2 className='text-center text-red-500 mt-10'>Error fetching brand</h2>
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

    return (
      <div className='container mx-auto py-10'>
  
  <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
    
    {data.data.data.map(prand => (
      
      <div 
        key={prand._id} 
        className='bg-white rounded-2xl shadow-md overflow-hidden 
                   hover:shadow-2xl transition duration-300 group cursor-pointer'
      >

        {/* Image */}
        <div className='overflow-hidden bg-gray-100'>
          <img 
            src={prand.image} 
            alt={prand.name} 
            className='w-full h-48 object-contain p-4 
                       group-hover:scale-110 transition duration-300'
          />
        </div>

        {/* Text */}
        <div className='p-4 text-center'>
          
          <h2 className='text-lg font-semibold text-gray-800 
                         group-hover:text-blue-600 transition capitalize'>
            {prand.name}
          </h2>

          {/* line */}
          <div className='w-12 h-1 bg-blue-500 mx-auto mt-2 rounded-full'></div>

        </div>

      </div>

    ))}

  </div>

</div>
  )
}
