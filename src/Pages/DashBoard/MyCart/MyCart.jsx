import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { Slide } from 'react-awesome-reveal';

const MyCart = () => {
    const {user} = useAuth()
    const token= localStorage.getItem("access-token")
    console.log(user?.email)
    const { data: currentuser = [],refetch,isLoading, isError, error } = useQuery({
        queryKey: ['currentuser',user?.email],
        queryFn: async ()=>{
            const res = await fetch(`https://learnlanguage-server.vercel.app/currentuser/${user?.email}`,{
                headers :{
                    authorization: `bearer ${token}`
                }
            })
            return res.json()
        }
    })
    return (
       <Slide>
         <div className='font-semibold'>
            <p className='text-3xl font-bold pb-5'>User Profile</p>
            <img className='w-32 rounded-2xl mb-5' src={currentuser?.photourl} alt="" />
            <p>Name: {currentuser?.name} </p>
            <p>Role: {currentuser?.role} </p>
        </div>
       </Slide>
    );
};

export default MyCart;