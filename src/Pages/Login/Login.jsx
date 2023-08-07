import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaGoogle} from "react-icons/fa";
import useDynamicTitle from '../../Hooks/DynamicTitle/useDynamicTitle';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';

const Login = () => {
    useDynamicTitle('Login')
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const {signInwithEmail,loginwithGoogle}= useContext(AuthContext)
    const [err,seterr]= useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/'
    const onSubmit = data => {
        seterr('')
        signInwithEmail(data.email,data.password)
            .then(result=>{
                seterr('')
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'User login successfully',
                    showConfirmButton: true
                })
                navigate(from,{replace:true});
            })
            .catch(err=>{
                seterr(err.message)
            })
    };

    const handlegoogleLogin = ()=>{
        loginwithGoogle()
        .then(result=>{
            const user = result.user;
            const userData = {email:user.email,name:user.displayName,photourl:user.photoURL,role:'Student'}
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
                navigate(from,{replace:true})
            })
        })
        .catch(err=>{
            console.log(err)
        })
    }

    return (
        <div className='mt-14 lg:my-28'>
            <h2 className='text-center text-2xl font-extrabold pb-10 '>Login Page</h2>
            <div  className='ml-[30%] lg:ml-[35%]'>
            <div className="flex flex-col w-2/5 border-opacity-50">
  <div className="grid rounded-box place-items-center">
            <form className='border-2 p-5 rounded-lg w-full' onSubmit={handleSubmit(onSubmit)}>
               
               <input className='border rounded-lg h-12 w-80 pl-4 mb-4 border-green-400' defaultValue="" type='email' placeholder='Enter Your Email' {...register("email",{required: true})} required/>
               <br/>
              
               <input className='border rounded-lg h-12 w-80 mb-4 pl-4 border-green-400' defaultValue="" placeholder='Enter Your Password' {...register("password",{required: true})} required />
               <br/>
               {
                err && <span className='text-red-500'>Password is required</span>
               }
               <p className='pb-4'>Don't have an account? <Link className='link-hover text-green-700' to='/register'>Register</Link></p>
               
               <input className='btn btn-accent text-white' type="submit" value="Login" />
               <div className="divider">OR</div>
               <div onClick={handlegoogleLogin} className="flex btn btn-accent justify-center h-12 rounded-box place-items-center text-white"><FaGoogle/> <span className='ml-2 font-bold'>Login with Google</span></div>
           </form>
           </div>
        </div>
    </div>
</div>
    );
};

export default Login;