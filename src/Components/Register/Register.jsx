import React, { useState } from 'react';
// import styles from './Register.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


export default function Register() {

  let navigate = useNavigate();
  let phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  let passRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/

  const [error, seterror] = useState(null);
  const [isloading, setisloading] = useState(false)


  async function registerSubmit(values){
    setisloading(true)
    let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup` , values).catch( (error) => {
      seterror(error.response.data.message)
      setisloading(false) 
    } );
    if(data.message === "success"){
      setisloading(false)
      navigate('/login')
    }
  }

  let validationSchema = Yup.object({
     name : Yup.string().min(3 , 'name minLength is 3').max(20 ,'name maxLength is 10' ).required('please enter your name'),
    phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('please enter your phone'),
    email: Yup.string().email("email is invalid").required('please enter your email') , 
    password: Yup.string().matches(passRegExp ,"min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit").required('Please Enter your password'),
    rePassword: Yup.string().required('password is invalid').oneOf([Yup.ref("password")] , 'password and rePassword do not match')
  })


  let formik = useFormik({
    initialValues:{
      name:'' ,
      phone:'',
      email:'',
      password:'',
      rePassword:''
    }  , validationSchema ,
    onSubmit:registerSubmit
  })


  return <>

  <div className="w-75 m-auto mt-4">
    <form onSubmit={formik.handleSubmit}>

      {error?<div className="alert alert-success">{error}</div>:''}

      

      <h1>Register Now</h1>
      <label htmlFor="name">Name :</label>
      <input className='form-control' name='name' id='name' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" />
      {formik.errors.name && formik.touched.name?<div className="alert alert-success mt-1 w-50">{formik.errors.name}</div>:''} 

      <label htmlFor="phone">Phone :</label>
      <input className='form-control' name='phone' id='phone' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} type="tel" />
      {formik.errors.phone && formik.touched.phone?<div className="alert alert-success mt-1 w-50">{formik.errors.phone}</div>:''} 

      <label htmlFor="email">Email :</label>
      <input className='form-control' name='email' id='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" />
      {formik.errors.email && formik.touched.email?<div className="alert alert-success mt-1 w-50">{formik.errors.email}</div>:''} 

      <label htmlFor="password">Password :</label>
      <input className='form-control' name='password' id='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" />
      {formik.errors.password && formik.touched.password?<div className="alert alert-success mt-1 w-50">{formik.errors.password}</div>:''} 

      <label htmlFor="rePassword">rePassword :</label>
      <input className='form-control' name='rePassword' id='rePassword' value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" />
      {formik.errors.rePassword && formik.touched.rePassword?<div className="alert alert-success mt-1 w-50">{formik.errors.rePassword}</div>:''} 
      
      {isloading? <button  type='button' className='btn bg-main text-white mt-2' > <i class="fa-solid fa-spinner fa-spin"></i> </button> :  <> <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white mt-2' > Submit </button> 
      <Link className='btn bg-main text-white mt-2 mx-2' to={'/login'} >Login</Link>
       </>     
 }
       
    </form>
  </div>
    

  </>
}
