// import { useState , useEffect} from "react";
// import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BallTriangle } from "react-loader-spinner";
// import { useQuery } from "@tanstack/react-query";
import useAllCategories from "../customeHoks/useAllCategories";


export default function CategoriesSlider() { 

//  const [categories, setCategories] = useState(null);

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 2,
    
  };
  
  // 
  const { data, isLoading, isError} = useAllCategories();


// console.log(categories ,"cat");



  if(isError){
    return <h2 className="text-center text-red-500 mt-10">Error fetching Categories</h2>
  }

  if(isLoading){

      <div className="flex justify-center items-center h-50">
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
// getCategories();

// }, [])
  return (

<>


<Slider {...settings} >


{data?.data?.data?.map((cat)=>(
  <div key={cat.id} className="m-8">
    <img className="w-full h-30 p-2" src={cat.image} alt={cat.name} />
  </div>
))}

  
    </Slider> 
    
   
     



</>


  )}