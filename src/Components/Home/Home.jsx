import React from 'react';
// import styles from './Home.module.css';
import Products from '../Products/Products'
import Categories from '../Categories/Categories';
import Helmet from "react-helmet";

export default function Home() {
  return <>
  <Helmet>
                <meta charSet="utf-8" />
                <title>Fresh Cart</title>
                <link rel="canonical" href="http://mysite.com/example" />
  </Helmet>
  
  <Categories/>
   <Products/>
  </>
}
