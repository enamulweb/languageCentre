import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FaEye,FaEyeSlash } from "react-icons/fa";
import useDynamicTitle from '../../Hooks/DynamicTitle/useDynamicTitle';
import { AuthContext } from '../../Provider/AuthProvider';

const Register = () => {
    const {createUserwithEmail,updateUserProfile} = useContext(AuthContext);
    useDynamicTitle('Register')
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = ()=>{
        setShowPassword(!showPassword)
    }
    const schema = yup.object().shape({
        email: yup
            .string()
            .required('Email is Required')
        ,
        password: yup
          .string()
          .required('Password is Required')
          .min(6, 'Password must be at least 6 characters')
          .matches(/[A-Z]/, 'Password must contain at least one capital letter')
          .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
          confirmpassword: yup
            .string()
            .required('Confirm Password is Required')
            .oneOf([yup.ref('password')],'Password does not match')
      });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    
    const onSubmit = data => {
        createUserwithEmail(data.email,data.password)
        .then((result)=>{
            const user = result.user;
            updateUserProfile(user,data.name,data.photourl)
            const userData = {email:data.email,name:data.name,photourl:data.photourl,role:'Student'}
            fetch(`https://learnlanguage-server.vercel.app/users`,
            {
                method: 'POST',
                headers:{
                    'content-type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
            .then(res=> res.json())
            .then(data=> {
                navigate('/')
            })
        })
    };
    return (
        <div className='mt-14 lg:my-28'>
            <h2 className='text-center text-2xl font-extrabold pb-10 '>Register Now</h2>
            <div  className='ml-[30%] lg:ml-[35%]'>
            <div className="flex flex-col w-2/5 border-opacity-50">
  <div className="grid rounded-box place-items-center">
            <form className='border-2 p-5 rounded-lg w-full' onSubmit={handleSubmit(onSubmit)}>
            <input className='border rounded-lg h-12 w-80 pl-4 mb-4 border-green-400' defaultValue="" type='text' placeholder='Enter Your Name' {...register("name",{required: true})} />
               <br/>
               
               <input className='border rounded-lg h-12 w-80 pl-4 mb-4 border-green-400' defaultValue="" type='email' placeholder='Enter Your Email' {...register("email",{required: true})} />
               <br/>
              
               <div className='flex'>
               <input className='border rounded-lg h-12 w-80 mb-4 pl-4 border-green-400' type={showPassword ? 'text' : 'password'} placeholder='Enter Your Password' {...register("password",{required: true})}  />
               <span className='relative right-10 top-3 text-green-500 text-2xl' onClick={togglePasswordVisibility}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}</span>
               </div>
               <br/>

               <input className='border rounded-lg h-12 w-80 mb-4 pl-4 border-green-400' type='password' defaultValue="" placeholder='Enter Confirm Password' {...register("confirmpassword",{required: true})} />
               <br/>
               <input className='border rounded-lg h-12 w-80 pl-4 mb-4 border-green-400' defaultValue="" type='text' placeholder='Enter PhotoUrl' {...register("photourl",{required: true})}/>
               <br/>
               {
                errors.email && <p className='text-red-500'>{errors.email.message}</p>
               }
               {
                errors.password && <p className='text-red-500'>{errors.password.message}</p>
               }
               {
                errors.confirmpassword && <p className='text-red-500'>{errors.confirmpassword.message}</p>
               }
               <p className='pb-4'>Do have an account? <Link className='link-hover text-green-700' to='/login'>Login</Link></p>
               
               <input className='btn btn-accent text-white' type="submit" value="Register" />
           </form>
           </div>
        </div>
    </div>
</div>
    );
};

export default Register;