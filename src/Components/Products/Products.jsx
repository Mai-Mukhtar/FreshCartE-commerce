import axios from 'axios';
import React, { useContext } from 'react';
import { ColorRing } from 'react-loader-spinner';
import {  useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { CartContext } from '../../CartContext/CartContext';
import  toast  from 'react-hot-toast';



 export default function FeaturedProducts() {

  let {addToCart} = useContext(CartContext);

   async function addProduct(productId){
      let response = await addToCart(productId);
      console.log(response);
      if(response.data.status === 'success'){
        toast.success('product successfully added' , {
          duration: 4000,
          position: 'top-center',
          // icon: '👏'
         
        } )

      } else{
        toast.error('This is an error!');



      }
  }

  

  function getFeaturedProducts(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);

  }
  let { data , isLoading   } = useQuery('featuredProducts' , getFeaturedProducts)  
  

  return (
  <>
    {isLoading?  <>  <div className='vh-100 d-flex justify-content-center align-items-center'>
    <ColorRing
  visible={true}
  height="80"
  width="80"
  ariaLabel="color-ring-loading"
  wrapperStyle={{}}
  wrapperClass="color-ring-wrapper"
  colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
  />
     </div> </> :  <div className='container pt-4 py-2'>
     <div className="row">
      {data?.data.data.map( (product) => <div key={product.id} className="col-md-2">
        <div className='product pb-4 '>

        <Link to={`/productDetails/${product.id}`}>


          <img src={product.imageCover} alt={product.title} className='w-100' />
          <div className='pt-3'>
            <p className='text-main fw-bolder font-sm'>{product.category.name}</p>
            <h3 className='text-muted h6'>{product.title.split(' ').slice(0 , 2).join(' ') } </h3>
            <div className='d-flex justify-content-between mt-3'>
              <span>{product.price}EGP</span>
              <span> <i className='fa-solid fa-star rating-color'></i> {product.ratingsAverage}</span>
            </div>        
          </div>



          </Link>
          <div className='text-center'>
              <button onClick={() => addProduct(product.id) } className='btn bg-main w-75 text-light '>Add+</button>
            
            </div>
        </div>
        
        
      </div>  )}
     </div>
   </div> }
  
    </>
  )
}