import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { UserContext } from '../../UserContext/UserContext';



export default function Login() {
  let passRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/
  let navigate = useNavigate();
  const [isloading, setisloading] = useState(false)
  const [error, seterror] = useState(null);
  let {setUserToken} =useContext(UserContext);
  let {setUserData} = useContext(UserContext)

  async function loginForm(values) {
    setisloading(true)
    let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values).catch((error) => {
      
      seterror(error.response.data.message)
      setisloading(false)

    });
    // console.log(data);
    if (data.message === 'success') {
      localStorage.setItem('userToken' , data.token);
      setUserToken(data.token);
      localStorage.setItem('userData' , data.user.name)
      setUserData(data.user)
      setisloading(false)
      navigate('/')
    }
  }

  
  

  let validationSchema = Yup.object({

    email: Yup.string().email("email is invalid").required('please enter your email'),
    password: Yup.string().matches(passRegExp, "min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit").required('Please Enter your password')
  })



  let formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    }, validationSchema,
    onSubmit: loginForm
  })



  return (
    <>

      <div className='w-75 m-auto mt-4'>
        {error ?    <div className="alert alert-success">{error}</div> : ''}



        <form onSubmit={formik.handleSubmit}>
          <h1>Login</h1>
          <label htmlFor="email">email:</label>
          <input className='form-control' type="email" name='email' id='email' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
          {formik.errors.email && formik.touched.email ? <div className="alert alert-success w-50 mt-1">{formik.errors.email}</div> : ''}

          <label htmlFor="password">password:</label>
          <input className='form-control' type="password" name='password' id='password' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} />
          {formik.errors.password && formik.touched.password ? <div className="alert alert-success w-50 mt-1">{formik.errors.password}</div> : ''}




          {isloading? <>
            <div className='d-flex align-items-center'>
              <button type='button' className='btn bg-main text-white '><i class="fa-solid fa-spinner fa-spin"></i></button> 
            </div>
             </> : <>
             <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white mt-2'>Login</button>
             <Link to={("/register")}  className='btn bg-main text-white mt-2 mx-2'> Register Now </Link>

             
              </> }



 

        </form>


      </div>

    </>
  )
}
