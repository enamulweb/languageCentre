import React, { useContext, useEffect } from 'react';
import { useForm } from "react-hook-form";
import useClasses from '../../../Hooks/DynamicTitle/useClasses';
import { AuthContext } from '../../../Provider/AuthProvider';
import Swal from 'sweetalert2';
const AddClass = () => {
    const {user} = useContext(AuthContext)
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [, refetch,]= useClasses()
    const onSubmit = formData => {
        formData.status = 'pending'
        formData.price = parseInt(formData.price)
        formData.instructorimage = user.photoURL
        formData.enrollstudent = '0'
        formData.feedback = ''
            fetch(`https://learnlanguage-server.vercel.app/classes`,
            {
                method: 'POST',
                headers:{
                    'content-type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(res=> res.json())
            .then(data=> {
                if(data.insertedId){
                    refetch();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Class Aproved Pending',
                        showConfirmButton: false,
                        timer: 1500
                      })
                }
            })
    }
    return (
        <div className='min-h-screen'>
             <h2 className='text-center text-2xl font-extrabold pb-10 '> Add New Class</h2>
            <form className='border-2 p-5 rounded-lg w-full' onSubmit={handleSubmit(onSubmit)}>
               
               <input className='border rounded-lg h-12 w-96 pl-4 mb-4 border-green-400' defaultValue="" type='text' placeholder='Enter Class Name' {...register("classname",{required: true})} required/>
               <br/>
               <input className='border rounded-lg h-12 w-96 pl-4 mb-4 border-green-400' defaultValue="" type='text' placeholder='Enter Class Image' {...register("classimage",{required: true})} required/>
               <br/>
               <input className='border rounded-lg h-12 w-96 pl-4 mb-4 border-green-400' value={user?.displayName} type='text' placeholder='Enter Instructor Name' {...register("instructorname")} required/>
               <br/>
               <input className='border rounded-lg h-12 w-96 pl-4 mb-4 border-green-400' value={user?.email} type='text' placeholder='Enter Instructor Email' {...register("instructoremail")} required/>
               <br/>
               <input className='border rounded-lg h-12 w-44 pl-4 mr-4 mb-4 border-green-400' defaultValue="" type='text' placeholder='Enter Available Seat' {...register("availableseat",{required: true})} required/>
               <input className='border rounded-lg h-12 w-44 pl-4 mb-4 border-green-400' defaultValue="" type='text' placeholder='Enter Price' {...register("price",{required: true})} required/>
               <br/>
              
               <input className='btn btn-accent text-white' type="submit" value="Add Class" />
            </form>
        </div>
    );
};

export default AddClass;