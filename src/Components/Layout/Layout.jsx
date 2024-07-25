import React from 'react';
// import styles from './Layout.module.css';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import { Offline} from "react-detect-offline";

export default function Layout() {
  return <>
  <Navbar/>
  <Outlet></Outlet>
  <div>
    
    <div className='networkDiv'> 
      <div className='network'>
        
        <Offline> <i className='fas fa-wifi'></i> You're offline (surprise!)</Offline>
      </div>
    </div>
  </div>
  


  

  </>
}
