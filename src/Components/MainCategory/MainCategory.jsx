import React from 'react';
import Slider from "react-slick";
import myImage2 from '../../Assets/images/slider-image-2.jpeg'
import myImage3 from '../../Assets/images/slider-image-3.jpeg'
import myImage4 from '../../Assets/images/grocery-banner-2.jpeg'
import myImage5 from '../../Assets/images/grocery-banner.png'

export default function MainCategory() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1 ,
        arrows: false ,
        
      };
  return (
    <>
    <div className="container py-3">
        <div className="row gx-0 gy-4">
            <div className="col-md-9">
            <Slider {...settings}><img height={400} src={myImage3} className='w-100' alt="" />
            <img src={myImage2} height={400} className='w-100' alt="" />  
             </Slider>
            

            </div>
            <div className="col-md-3">
                <img height={200} src={myImage4} className='w-100' alt="" />
                <img height={200} src={myImage5} className='w-100' alt="" />


            </div>
        </div>
    </div>

    
    </>
  )
}
