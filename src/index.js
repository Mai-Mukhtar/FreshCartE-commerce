import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { UserContextProvider } from './UserContext/UserContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools'
import  {CartContextProvider}  from './CartContext/CartContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
let query= new QueryClient();

root.render(

    
 <QueryClientProvider client={query}>  
 <CartContextProvider>
 <UserContextProvider>
        <App />
    </UserContextProvider>
 </CartContextProvider>
 
 
   

    <ReactQueryDevtools initialIsOpen='false' position='bottom-right'/> 

    
    </QueryClientProvider>
    

   
     
    

    
    
      
    
    
 
   
         
   
    
);
