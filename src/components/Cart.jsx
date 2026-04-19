import React, { useContext } from 'react'
import { CartContext } from '../context/CartContext';
import { BallTriangle } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
export default function Cart() {

const { AllProduct , TotalCartPrice , NumofCartItems ,updateCart , deleteitemFromCart ,clearCart } = useContext(CartContext)
// console.log("all product" , AllProduct);


function handelUpdateCart(proId , count) {
  updateCart(proId , count)
}

function handelDeleteItem(productId) {
  deleteitemFromCart(productId)
}
function handelClearCart() {
  clearCart()
}

  return (
  <div className="max-w-6xl mx-auto py-10">

  {/* TABLE */}
  <div className="overflow-x-auto bg-white shadow-lg rounded-2xl border border-gray-200">

    <table className="w-full text-sm text-left text-gray-700">

      {/* HEADER */}
      <thead className="bg-gray-100 text-gray-800 text-base border-b">
        <tr>

          <th className="px-6 py-4">
            <button
              onClick={handelClearCart}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition flex items-center gap-2"
            >
              Clear All
              <i className="fas fa-trash"></i>
            </button>
          </th>

          <th className="px-6 py-4 font-semibold">Product</th>
          <th className="px-6 py-4 font-semibold">Qty</th>
          <th className="px-6 py-4 font-semibold">Price</th>
          <th className="px-6 py-4 font-semibold">Action</th>

        </tr>
      </thead>

      {/* BODY */}
      <tbody>

        {AllProduct ? AllProduct.map(pro => (

          <tr key={pro._id} className="border-b hover:bg-gray-50 transition">

            {/* IMAGE + NAME */}
            <td className="px-6 py-4">
              <div className="flex items-center gap-4">
                <img
                  src={pro.product.imageCover}
                  className="w-16 h-16 object-cover rounded-lg border"
                  alt={pro.name}
                />
                <span className="font-medium text-gray-800 md:hidden">
                  {pro.product.title}
                </span>
              </div>
            </td>

            {/* TITLE (desktop) */}
            <td className="px-6 py-4 font-medium text-gray-800 hidden md:table-cell">
              {pro.product.title}
            </td>

            {/* QTY */}
            <td className="px-6 py-4">

              <div className="flex items-center gap-2">

                <button
                  disabled={pro.count <= 1}
                  onClick={() => handelUpdateCart(pro.product._id, pro.count - 1)}
                  className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                >
                  -
                </button>

                <span className="w-8 text-center font-medium">
                  {pro.count}
                </span>

                <button
                  onClick={() => handelUpdateCart(pro.product._id, pro.count + 1)}
                  className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                >
                  +
                </button>

              </div>

            </td>

            {/* PRICE */}
            <td className="px-6 py-4 font-semibold text-emerald-600">
              {pro.price} EGP
            </td>

            {/* DELETE */}
            <td className="px-6 py-4">
              <button
                onClick={() => handelDeleteItem(pro.product._id)}
                className="text-red-500 hover:text-red-700 font-medium flex items-center gap-1"
              >
                Remove
                <i className="fas fa-trash"></i>
              </button>
            </td>

          </tr>

        )) : (
          <tr>
            <td colSpan="5" className="text-center py-10 text-gray-500">
              Loading...
            </td>
          </tr>
        )}

      </tbody>

    </table>
  </div>

  {/* SUMMARY */}
  <div className="mt-10 flex flex-col md:flex-row justify-between items-center gap-6">

    <div className="text-center md:text-left">
      <h2 className="text-2xl font-bold text-gray-800">
        Total Price: <span className="text-emerald-600">{TotalCartPrice}</span>
      </h2>

      <p className="text-gray-500 mt-2">
        Your cart includes <span className="font-semibold">{NumofCartItems}</span> items
      </p>
    </div>

    <Link to="/Payment">
      <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition flex items-center gap-2">
        Proceed To Payment
        <i className="fas fa-credit-card"></i>
      </button>
    </Link>

  </div>

</div>


  )
}
     {/* <tr className="bg-neutral-primary-soft border-b border-default hover:bg-neutral-secondary-medium">
        <td className="p-4">
          <img src="/docs/images/products/imac.png" className="w-16 md:w-24 max-w-full max-h-full" alt="Apple iMac" />
        </td>
        <td className="px-6 py-4 font-semibold text-heading">
          iMac 27
        </td>
        <td className="px-6 py-4">
          <form className="max-w-xs mx-auto">
            <label htmlFor="counter-input-2" className="sr-only">Choose quantity:</label>
            <div className="relative flex items-center">
              <button type="button" id="decrement-button-2" data-input-counter-decrement="counter-input-2" className="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary rounded-full text-sm focus:outline-none h-6 w-6">
                <svg className="w-3 h-3 text-heading" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" /></svg>
              </button>
              <input type="text" id="counter-input-2" data-input-counter className="shrink-0 text-heading border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center" placeholder defaultValue={12} required />
              <button type="button" id="increment-button-2" data-input-counter-increment="counter-input-2" className="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary rounded-full text-sm focus:outline-none h-6 w-6">
                <svg className="w-3 h-3 text-heading" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-7 7V5" /></svg>
              </button>
            </div>
          </form>
        </td>
        <td className="px-6 py-4 font-semibold text-heading">
          $2499
        </td>
        <td className="px-6 py-4">
          <a href="#" className="font-medium text-fg-danger hover:underline">Remove</a>
        </td>
      </tr>
      <tr className="bg-neutral-primary-soft border-b border-default hover:bg-neutral-secondary-medium">
        <td className="p-4">
          <img src="/docs/images/products/iphone-12.png" className="w-16 md:w-24 max-w-full max-h-full" alt="iPhone 12" />
        </td>
        <td className="px-6 py-4 font-semibold text-heading">
          IPhone 12 
        </td>
        <td className="px-6 py-4">
          <form className="max-w-xs mx-auto">
            <label htmlFor="counter-input-3" className="sr-only">Choose quantity:</label>
            <div className="relative flex items-center">
              <button type="button" id="decrement-button-3" data-input-counter-decrement="counter-input-3" className="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary rounded-full text-sm focus:outline-none h-6 w-6">
                <svg className="w-3 h-3 text-heading" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" /></svg>
              </button>
              <input type="text" id="counter-input-3" data-input-counter className="shrink-0 text-heading border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center" placeholder defaultValue={12} required />
              <button type="button" id="increment-button-3" data-input-counter-increment="counter-input-3" className="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary rounded-full text-sm focus:outline-none h-6 w-6 ">
                <svg className="w-3 h-3 text-heading" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-7 7V5" /></svg>
              </button>
            </div>
          </form>
        </td>
        <td className="px-6 py-4 font-semibold text-heading">
          $999
        </td>
        <td className="px-6 py-4">
          <a href="#" className="font-medium text-fg-danger hover:underline">Remove</a>
        </td>
      </tr> */}