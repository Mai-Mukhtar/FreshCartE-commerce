import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext();
let headers = {
    token:localStorage.getItem('userToken')
}

// function getOnlineCart(cartId , url , values){
//     return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`, {
//         shippingAddress: values

//      }, {headers})
//      .then( (response) =>response )
//      .catch((error)=> error )

//  }

async function getOnlineCart(cartId, url, values) {
    try {
      const response = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`, {
        shippingAddress: values
      }, { headers });
  
      return response;
    } catch (error) {
      return error;
    }
  }


//  function addToCart(productId){
//  return   axios.post(`https://ecommerce.routemisr.com/api/v1/cart` , {
//         productId 
//     } , {
//         headers 
//     } ).then((response)=> response )
//     .catch( (error)=> error )
// }

async function addToCart(productId) {
    try {
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId },
        { headers }
      );
  
      return response;
    } catch (error) {
      return error;
    }
  }

//  function GetLoggedUserCart(){
//    return  axios.get(`https://ecommerce.routemisr.com/api/v1/cart` , {
//         headers
//     }).then((response)=> response )
//     .catch((error)=> error );
// }

async function GetLoggedUserCart() {
    try {
      const response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { headers }
      );
  
      return response;
    } catch (error) {
      return error;
    }
  }



// function updateProductCart(productId , count){
//    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
//         count

//     }, {headers})

// }

async function updateProductCart(productId, count) {
    try {
      const response = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count },
        { headers }
      );
  
      return response;
    } catch (error) {
      return error;
    }
  }


// function DeleteProductFromCart(productId){
//    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` , {
//     headers
//    }).then((response) => response  )
//    .catch((error)=> error )
// }

async function DeleteProductFromCart(productId) {
    try {
      const response = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { headers }
      );
  
      return response;
    } catch (error) {
      return error;
    }
  }


export function CartContextProvider(props){
    const [productCart, setProductCart] = useState(null);

    const [cartId, setCartId] = useState(null)


//    async function GetCartDetails(){
//         let data = await GetLoggedUserCart();
//         setCartId(data?.data.data._id);

       
//     }

async function GetCartDetails() {
    try {
        let response = await GetLoggedUserCart();

        if (response && response.data && response.data.data && response.data.data._id) {
            setCartId(response.data.data._id);
        } else {
            console.error('Invalid response data structure');
            // Handle the case where the response data structure is not as expected
        }
    } catch (error) {
        console.error('Error fetching cart details:', error);
        // Handle errors that occur during the API call
    }
}

    useEffect(() => {
        

        GetCartDetails();
      
    }, [])
    
   return <CartContext.Provider value={{productCart , setProductCart , cartId , addToCart , getOnlineCart , GetLoggedUserCart ,DeleteProductFromCart , updateProductCart  }}>
        {props.children}
    </CartContext.Provider>

}