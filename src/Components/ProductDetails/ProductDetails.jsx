import axios from 'axios';
import React, { useContext} from 'react';
import { useQuery } from 'react-query';
import {  useParams } from 'react-router-dom';
import Slider from "react-slick";
import Helmet from "react-helmet";
import { CartContext } from '../../CartContext/CartContext';
import  toast  from 'react-hot-toast';


export default function ProductDetails() {

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

  
 
    var settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        waitForAnimate: true ,
        autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear"

      }
    let param = useParams();

    function getProductDetails(id){
       return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }

    let { data  } = useQuery('productDetails' , () => getProductDetails(param.id) );
    
    let dataDetails = data?.data.data ;
    // console.log(dataDetails);

   


  return (
    <div className='container'>
        {dataDetails? <div className="row py-2 align-items-center">
        <Helmet>
                <meta charSet="utf-8" />
                <title>{dataDetails.title}</title>
                <link rel="canonical" href="http://mysite.com/example" />
         </Helmet>
            <div className="col-md-4">
            <Slider {...settings}> 
            {dataDetails.images.map( (img) => {
           return  <img key={dataDetails.id} src={img} alt={img.title} className='w-100' />
           } )} 
           </Slider>
            
            </div>
            <div className="col-md-8 py-5">
                <h2 className='h6 fw-bolder font-sm'>{dataDetails.title}</h2>
                <p className='text-muted'>{dataDetails.description}</p>
                <h6 className='text-main fw-bolder font-sm'>{dataDetails.category.name}</h6>
                <div className='d-flex justify-content-between'>
                    <span>{dataDetails.price} EGP</span>
                    <span> <i className='fas fa-star rating-color'></i> {dataDetails.ratingsAverage} </span>

                </div>

                
                <button onClick={()=> addProduct(dataDetails.id) }  className='btn bg-main w-100 text-white mt-3'> ADD TO CART </button>

            </div>
        </div> : '' }

    </div>
  )
}
