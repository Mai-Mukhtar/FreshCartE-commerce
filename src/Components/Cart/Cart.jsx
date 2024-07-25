import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../CartContext/CartContext';
// import styles from './Cart.module.css';
import { ColorRing } from 'react-loader-spinner';
import { Link } from 'react-router-dom';


export default function Cart() {
  let {GetLoggedUserCart , DeleteProductFromCart , updateProductCart ,setCartId , productCart , setProductCart } = useContext(CartContext);
  

  async function updateItem(productId, count) {
    try {
        let { data } = await updateProductCart(productId, count);
        
        setProductCart(data);
        
        if (count === 0 || count < 1) {
            removeItem(productId);
        }
    } catch (error) {
        console.error('Error updating item:', error);
        // Handle errors that occur during the update
    }
}

  

  async function removeItem(productId) {
    try {
        let { data } = await DeleteProductFromCart(productId);
        
        setProductCart(data);
        
        // console.log(data);
    } catch (error) {
        console.error('Error removing item:', error);
        // Handle errors that occur during the removal process
    }
}

 

  async function userCart() {
    try {
        let { data } = await GetLoggedUserCart();
        
        setProductCart(data);
    } catch (error) {
        console.error('Error fetching user cart:', error);
        // Handle errors that occur during fetching the user cart
    }
}



  useEffect(() => {
    userCart()
  
    
  }, [])
  return <>
  <div className='container py-3'>
    {productCart? <div className='bg-main-light w-75 mx-auto p-3'>
        <h3 className='fw-bolder'>Shop Cart</h3>
        <h4 className='h6 text-success'>Cart Items: {productCart.numOfCartItems} </h4>
        <h4 className='h6 text-success'> Total Cart Price: {productCart.data.totalCartPrice} EGP </h4>
    
        {productCart.data.products.map( (product) => <div key={product.product._id} className="row border-bottom py-4">

          <div className="col-md-1 py-2 ">
           <img className='w-100' src={product.product.imageCover} alt="" />  
          </div>
          <div className="col-md-11 py-2">
            <div className="d-flex justify-content-between align-items-center">
              <div  >
                <h2 className=' h6 fw-bolder font-sm'>{product.product.title.split(' ').slice(0 , 3).join(' ')}</h2>
                <h6 className='text-main'>{product.price}</h6>
                <button onClick={() => removeItem(product.product._id)} className='btn p-0'> <i className='fas fa-trash text-danger'></i> Remove</button>
              </div>

              <div>
              <button onClick={() => updateItem(product.product._id ,product.count +1 ) } className='btn  btn-outline-success'>+ </button>
              <span className='px-2'>{product.count}</span>
              <button onClick={() => updateItem(product.product._id ,product.count -1 ) } className='btn btn-outline-success '>- </button>

            </div>

            </div>
            
            
          </div>

          
          
        </div> )}

        
        <div className='py-3'>
          <Link to={('/adress')} >
          <button  className='btn mx-3 btn-outline-success '> Online Payment </button>
        
          </Link>
          <button className='btn btn-outline-success'> Cash On Delivery </button>
        
      </div>
        
        
      </div>

      
      
      : <div className='vh-100 d-flex justify-content-center align-items-center'>
    <ColorRing
  visible={true}
  height="80"
  width="80"
  ariaLabel="color-ring-loading"
  wrapperStyle={{}}
  wrapperClass="color-ring-wrapper"
  colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
  />
     </div> }
      
      
      
  </div>
    
  </>
}
