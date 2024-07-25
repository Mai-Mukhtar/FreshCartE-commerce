import './App.css';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import Home from './Components/Home/Home'
import Products from './Components/Products/Products'
import Cart from './Components/Cart/Cart'
import Brands from './Components/Brands/Brands'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Categories from './Components/Categories/Categories'
import Layout from './Components/Layout/Layout'
import { useContext, useEffect } from 'react';
import { UserContext } from './UserContext/UserContext';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import  { Toaster } from 'react-hot-toast';
import Adress from './Components/Adress/Adress';
import Orders from './Components/Orders/Orders';
import Notfound from './Components/Notfound/Notfound';




let routes = createHashRouter([
  { path: '/', element: <Layout />, children: [
    {index:true , element:<ProtectedRoute> <Home/> </ProtectedRoute> },
    {path:'cart' , element: <ProtectedRoute> <Cart/> </ProtectedRoute>  },
    {path:'Products' , element: <ProtectedRoute> <Products/> </ProtectedRoute>  },
    {path:'Cart' , element:<ProtectedRoute> <Cart/> </ProtectedRoute> },
    {path:'Categories' , element:<ProtectedRoute> <Categories/> </ProtectedRoute> },
    {path:'Brands' , element:<ProtectedRoute> <Brands/> </ProtectedRoute> },
    {path:'allorders' , element:<ProtectedRoute> <Orders/> </ProtectedRoute> },
    {path:'adress' , element:<ProtectedRoute> <Adress/> </ProtectedRoute> },
    {path:`productDetails/:id` , element:<ProtectedRoute> <ProductDetails/> </ProtectedRoute> },
    {path:'Login' , element:<Login/>},
    {path:'Register' , element:<Register/>},
    {path:'*',element:<Notfound/>}
  ] }
])



function App() {
  let {setUserToken} = useContext(UserContext) 
 
  useEffect(() => {
    if(localStorage.getItem('userToken') !==null ){
      setUserToken(localStorage.getItem('userToken') )
    }
  }, [])
  

  

  return <>

  
  <RouterProvider router={routes}></RouterProvider>
  <Toaster/>
  

      

      
  
  </>
 

  
}

export default App;
