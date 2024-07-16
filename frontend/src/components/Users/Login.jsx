// import React, { useEffect, useState } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { useMutation } from "@tanstack/react-query";
// import { FaEnvelope, FaLock } from "react-icons/fa";
// import { loginApi } from "../../services/users/userServices";
// import AlertMessage from "../Alert/AlertMessage";



// const validate=Yup.object({
//   email:Yup.string().email('Invalid').required('Email is required'),
// password:Yup.string().min(5,'Password should be 5 characters long').required('Password is required'),

// })



// const LoginForm = () => {
 
// //mutation
// const {mutateAsync,isPending,isError,error,isSuccess}= useMutation({
//   mutationFn:loginApi,
//   mutationKey:['login'],

// })


//   const formik = useFormik({                                        //formik object 
//     initialValues:{
//       email:'',
//       password:'',
//     },
//     //validation
//     validationSchema:validate,
//     //submit
//     onSubmit:(values)=>{
//       console.log(values)
//       mutateAsync(values)
//       .then((data)=>console.log(data))
//       .catch((e)=>console.log(e))
//       // if(data.message==='invalid token'||'invalid email'||'invalid password') return isSuccess(false)
     
//     },
   

//   })
//   // console.log(response);
  
//   console.log({isPending,isError,error,isSuccess}) ;



//   return (
//     <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto my-10 bg-white p-6 rounded-xl shadow-lg space-y-6 border border-gray-200">
//       <h2 className="text-3xl font-semibold text-center text-gray-800">
//         Login
//       </h2>
//       {/* Display messages */}
//       {isPending && <AlertMessage type="loading" message="Login you in...." />}
//       {isError && (
//         <AlertMessage type="error" message={error.response.data.message} />
//       )}
//       {isSuccess && <AlertMessage type="success" message="Login success" />}
//       <p className="text-sm text-center text-gray-500">
//         Login to access your account
//       </p>

//       {/* Input Field - Email */}
//       <div className="relative">
//         <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
//         <input
//           id="email"
//           type="email"
//           {...formik.getFieldProps("email")}
//           placeholder="Email"
//           className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
//         />
//         {formik.touched.email && formik.errors.email && (
//           <span className="text-xs text-red-500">{formik.errors.email}</span>
//         )}
//       </div>

//       {/* Input Field - Password */}
//       <div className="relative">
//         <FaLock className="absolute top-3 left-3 text-gray-400" />
//         <input
//           id="password"
//           type="password"
//           {...formik.getFieldProps("password")}
//           placeholder="Password"
//           className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
//         />
//         {formik.touched.password && formik.errors.password && (
//           <span className="text-xs text-red-500">{formik.errors.password}</span>
//         )}
//       </div>

//       {/* Submit Button */}
//       <button
//         type="submit"
//         className="w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
//       >
//         Login
//       </button>
//     </form>
//   );
// };

// export default LoginForm;






















import React, { useState,useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { loginApi } from "../../services/users/userServices";
import AlertMessage from "../Alert/AlertMessage";
import { loginAction } from "../../assets/redux/slice/authSlice";
import {useDispatch} from 'react-redux';
import { useNavigate } from "react-router-dom";


const validate = Yup.object({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(5, 'Password should be 5 characters long').required('Password is required'),
});

const LoginForm = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate=useNavigate();
  const dispatch = useDispatch()
  const { mutateAsync, isLoading, isError, error } = useMutation({
    mutationFn: loginApi,
    mutationKey: ['login'],
    onSuccess: (data) => {                                                       //default property used in react-query
      if (data.message && data.message.toLowerCase().includes('invalid')) {
        setIsSuccess(false);
       
      } else {
        setIsSuccess(true);
         //dispatch the data
         dispatch(loginAction(data)),
         //save the data to local storage so that data doesn't delete on re-login
         localStorage.setItem('userInfo',JSON.stringify(data))
      }
    },
    onError: () => {
      setIsSuccess(false);
    }
  });

  const formik = useFormik({
    initialValues: {
      email: 'krish@gmail.com',
      password: '123456',
    },
    validationSchema: validate,
        // `values` contains the `email` and `password` from the form
    onSubmit: async (values) => {
      console.log(values)
           await mutateAsync(values)
            .then((data)=>
             console.log(data),
             

            )
            .catch((e)=>console.log(e))
    },
  });
  useEffect((
    
  )=>{
    setTimeout(()=>{
      if(isSuccess) navigate('/profile');
    },3000)
  },[ isLoading, isError, error,isSuccess])
//handleSubmit default property of formik
  return (
    <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto my-10 bg-white p-6 rounded-xl shadow-lg space-y-6 border border-gray-200">
      <h2 className="text-3xl font-semibold text-center text-gray-800">
        Login
      </h2>
      {/* Display messages */}
      {isLoading && <AlertMessage type="loading" message="Logging you in..." />}
      {isError && <AlertMessage type="error" message={error.response?.data?.message || error.message} />}
      {isSuccess && <AlertMessage type="success" message="Login success" />}
      <p className="text-sm text-center text-gray-500">
        Login to access your account
      </p>

      {/* Input Field - Email */}
      <div className="relative">
        <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
        <input
          id="email"
          type="email"
          {...formik.getFieldProps("email")}
          placeholder="Email"
          className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        />
        {formik.touched.email && formik.errors.email && (
          <span className="text-xs text-red-500">{formik.errors.email}</span>
        )}
      </div>

      {/* Input Field - Password */}
      <div className="relative">
        <FaLock className="absolute top-3 left-3 text-gray-400" />
        <input
          id="password"
          type="password"
          {...formik.getFieldProps("password")}
          placeholder="Password"
          className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        />
        {formik.touched.password && formik.errors.password && (
          <span className="text-xs text-red-500">{formik.errors.password}</span>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
