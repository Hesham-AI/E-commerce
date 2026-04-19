// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Layout from './components/layout'
import Login from './components/Login'
import Register from './components/Register'
import Notfound from './components/notfound'
import Products from './components/Products'
import AuthContext from './context/AuthContext'
import Cart from './components/Cart'
import Categories from './components/Categories'
import Protected from './components/protection/Protected'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Brand from './components/Brand'
import ProductDetails from './components/ProductDetails'
import CartContextProvider from './context/CartContext'
 import { Toaster } from 'react-hot-toast';
import Payment from './components/Payment'
import { Offline } from 'react-detect-offline'
// import toast from 'react-hot-toast';
import { BallTriangle } from 'react-loader-spinner'

// import { BallTriangle } from "react-loader-spinner";
import { FaWifi } from "react-icons/fa";
// import { Offline } from 'react-detect-offline'

// import toast from 'react-hot-toast'
// import Navbar from './components/Navbar'

const queryClient = new QueryClient()

 const router= createBrowserRouter([
  { path: '', element: <Layout/>, children: [ 
// {index: true, element: <Login/>},
    { path: 'register', element: <Register/> },
{ path: 'Login', element:<Login/>},
   {path: 'Logout', element: <Login/>}
,{path: '*', element: <Notfound/>},



{path: 'products', element: <Protected>
<Products/>
</Protected> }
,{path: 'Cart', element:  <Protected>
<Cart/> 
</Protected>  },
{path : 'categories', element: <Protected>
<Categories/>
</Protected>},
{path: 'brands', element: <Protected><Brand/></Protected>},
{path: 'Payment', element: <Protected><Payment/></Protected>},

{path:'ProductDetails/:id', element: <Protected><ProductDetails/></Protected>}


  ],}
])

 function App() {
  
  return (
   <>

   <AuthContext>

<QueryClientProvider client={queryClient}>



<CartContextProvider>
 <Offline>
  <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

    <div className="bg-white shadow-2xl rounded-2xl p-10 text-center max-w-md w-full space-y-6">

      {/* ICON */}
      <div className="flex justify-center text-red-500 text-5xl">
        <FaWifi className="rotate-45" />
      </div>

      {/* LOADER */}
      <div className="flex justify-center">
        <BallTriangle
          height={60}
          width={60}
          color="#ef4444"
          ariaLabel="loading"
          visible={true}
        />
      </div>

      {/* TEXT */}
      <h2 className="text-xl font-bold text-gray-800">
        You are offline
      </h2>

      <p className="text-gray-500">
        Please check your internet connection and try again.
      </p>

      {/* BUTTON (optional UX upgrade) */}
      <button
        onClick={() => window.location.reload()}
        className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl transition"
      >
        Retry
      </button>

    </div>

  </div>
</Offline>
<RouterProvider router={router}/>
<Toaster/>


</CartContextProvider>



</QueryClientProvider>
  
</AuthContext>

   </>
    
  )
}

export default App
