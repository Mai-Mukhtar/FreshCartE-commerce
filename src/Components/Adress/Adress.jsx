import { useFormik } from 'formik';
import React, { useContext } from 'react';
import { CartContext } from '../../CartContext/CartContext';


export default function Adress() {
    let {getOnlineCart , cartId , setProductCart} = useContext(CartContext);
   
  //  async function onlinePayment(values){
  //       let {data} = await getOnlineCart(cartId , "http://localhost:3000" , values);
  //       console.log(data)
  //       console.log(data?.session.url);
  //       window.location.href=(data?.session.url);
       
        
  //   }
  async function onlinePayment(values) {
    try {
        const { data } = await getOnlineCart(cartId, "http://localhost:3000", values);
        
        console.log(data);
        console.log(data?.session.url);
        
        if (data && data.session && data.session.url) {
            window.location.href = data.session.url;
        } else {
            console.error('Invalid session URL in the response data');
            // Handle the case where the session URL is missing from the response
        }
    } catch (error) {
        console.error('Error processing online payment:', error);
        // Handle errors that occur during the API call
    }
}
    let formik = useFormik({
        initialValues:{
            details: '' ,
            phone : '' ,
            city : ''

        } , 
        onSubmit : onlinePayment
    }  )
  return (
    <>
    <form className='w-75 m-auto py-4' onSubmit={formik.handleSubmit} action="">
        <label htmlFor="">Details </label>
        <input className='form-control' type="text" name='details' id='details' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.details} />

        <label htmlFor="">Phone </label>
        <input className='form-control' type="tel" name='phone' id='phone' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} />

        <label htmlFor="">City </label>
        <input className='form-control' type="text" name='city' id='city' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.city} />
        <button type='submit' className='btn bg-main my-3 text-white'> Pay Now </button>
    </form>   
    </>
  )
}
