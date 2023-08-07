import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useParams } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import CheckOut from './CheckOut';
import useUpdateClass from '../../../Hooks/useUpdateClass';

const stripePromise = loadStripe(import.meta.env.VITE_Paymnet_Gateway_PK);
const Payment = () => {
    const {classid} = useParams()
    const {user,loading} = useAuth()
    const [updatedCart,]= useUpdateClass(classid)
    const token= localStorage.getItem("access-token")
  const { data: carts = [],refetch,isLoading, isError, error } = useQuery({
    queryKey: ['cartspay'],
    queryFn: async ()=>{
        const response = await fetch(`https://learnlanguage-server.vercel.app/cartspay/${classid}`,{
            headers :{
                authorization: `bearer ${token}`
            }
        })
        return response.json()
    }
})

const price = parseFloat(carts.price);
const enrollstudent = parseInt(updatedCart[0]?.enrollstudent)
const availableseat = parseInt(updatedCart[0]?.availableseat)
console.log(carts,price,enrollstudent,availableseat)
    if(availableseat<1){
        return(
            <div>
                <p>No Availableseat</p>
            </div>
        )
    }
    return (
        <div>
            <p className='text-3xl mb-5 font-extrabold'>Payment Gateway</p>
            <Elements stripe={stripePromise}>
                <CheckOut enrollstudent={enrollstudent} availableseat={availableseat} cart={carts} price={price}/>
            </Elements>
        </div>
    );
};

export default Payment;