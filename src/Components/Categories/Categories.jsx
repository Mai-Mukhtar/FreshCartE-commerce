import React from 'react';
// import styles from './Categories.module.css';
import { useQuery } from 'react-query';
import axios from 'axios';
import Slider from "react-slick";
import MainCategory from '../MainCategory/MainCategory';


export default function Categories() {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  };

  function getCategory(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }

  let {data} =useQuery('category' , getCategory );
  let dataDetails = data?.data.data;
  // console.log(dataDetails);
  
  
  


  

  return <>
  <MainCategory/>
  <div className="container py-3">
    <h2  className='fw-bolder font-sm'>Shop Popular Category</h2>
    {dataDetails? <Slider {...settings}> {dataDetails.map( (img , id) => <> <img height={200}   key={id} src={img.image} className='w-100' alt="" /> 
   <p className='text-muted py-2 font-sm'>{img.name}</p>
   
   </>  )} </Slider> :'' }
    



  </div>
  




    
    
  </>
}
