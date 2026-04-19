import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

export default function useAllCategories() {
  
  function getCategories(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
 }
 
 const resQueryCat =  useQuery({
queryKey:["AllCategories"],
queryFn: getCategories

 })
  

    return resQueryCat
   
  
}
