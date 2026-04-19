import axios from 'axios'
// import { get } from 'flowbite-react/helpers/get'
import { createContext, useEffect, useState } from 'react'

export const CartContext = createContext()

export default function CartContextProvider({ children }) {
  const [AllProduct, setAllProduct] = useState(null)
  const [NumofCartItems, setNumofCartItems] = useState(0)
  const [TotalCartPrice, setTotalCartPrice] = useState(0)
  const [cartId, setCartId] = useState(null)
  let headers = {
    token: localStorage.getItem("tkn")
  }

  async function addToCart(productId) {
    return await axios.post("https://ecommerce.routemisr.com/api/v1/cart",
      {
        "productId": productId
      },
      {
        headers: {
          token: localStorage.getItem("tkn")
        }
      })


      .then((res) => {
        console.log(res.data)

        // setAllProduct(res.data.data.products)
        // setNumofCartItems(res.data.numOfCartItems)
        // setTotalCartPrice(res.data.data.totalCartPrice)
        getUserCart()
        return true
      })

      .catch((err) => {

        console.log(err)
        return false
      })


  }

function clearCartAfterPayment(){
  clearCart()

}

function updateCart(productId , count) {
  return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,

  {
  "count": count
},
  {
    headers
  }
)
.then((res)=>{

 setAllProduct(res.data.data.products)
        setNumofCartItems(res.data.numOfCartItems)
        setTotalCartPrice(res.data.data.totalCartPrice)

})
.catch((err)=>{
  console.log(err)
})




}

function deleteitemFromCart(productId) {
  return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
  {
    headers
  })
  .then((res)=>{

    setAllProduct(res.data.data.products)
          setNumofCartItems(res.data.numOfCartItems)
          setTotalCartPrice(res.data.data.totalCartPrice)
  })
  .catch((err)=>{
    console.log(err)
  })
}

function clearCart() {
  return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,
  {
    headers
  })
  .then((res)=>{
getUserCart()    
    // setAllProduct(res.data.data.products)
    //       setNumofCartItems(res.data.numOfCartItems)
    //       setTotalCartPrice(res.data.data.totalCartPrice)
  })
  .catch((err)=>{
    console.log(err)
  })
}


  function getUserCart() {
    return  axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
      headers
    })

      .then((res) => {
        console.log(res.data)
        setAllProduct(res.data.data.products)
        setNumofCartItems(res.data.numOfCartItems)
        setTotalCartPrice(res.data.data.totalCartPrice)
        setCartId(res.data.data._id)
      })

      .catch((err) => {
        console.log(err)

      })
  }
  useEffect(() => {
    getUserCart()
  }, [])



  // API
  return <CartContext.Provider value={
    {
      addToCart,
      AllProduct,
      NumofCartItems,
      TotalCartPrice,
      getUserCart,
      updateCart,
      deleteitemFromCart,
      clearCart,
      cartId,
      clearCartAfterPayment

    }
  }>

    {children}


  </CartContext.Provider>


}
