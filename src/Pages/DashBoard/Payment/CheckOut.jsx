import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useAuth from '../../../Hooks/useAuth';
import useEnrolledClass from '../../../Hooks/useEnrolledClass';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


const CheckOut = ({price,cart,enrollstudent,availableseat}) => {
    const {user} = useAuth()
    const stripe = useStripe();
    const navigate = useNavigate();
    const elements = useElements();
    const [, refetch] = useEnrolledClass();
    const token= localStorage.getItem("access-token")
    const [err,setErr] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [process, setprocess] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    console.log(price,cart.purchase)
    useEffect(()=>{
        if(price>0){
            fetch('https://learnlanguage-server.vercel.app/create-payment-intent',{
                method: 'POST',
                headers:{
                'content-type': 'application/json',
                authorization: `bearer ${token}`
                },
                body: JSON.stringify({price})
                })
                .then(res=> res.json())
                .then(data=> {
                setClientSecret(data.clientSecret)
            })

        }
        },[price])
                // axios.post('https://learnlanguage-server.vercel.app/create-payment-intent',{price})
                // .then(res=>{
                //     console.log(res.data.clientSecret)
                //     setClientSecret(res.data.clientSecret)
                // })
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!stripe || !elements) {
        return;
      }
      const card = elements.getElement(CardElement);
      if (card == null) {
        return;
      }
      const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card,
      });

      if (error) {
        console.log('[error]', error);
        setErr(error.message)
      } else {
        console.log('[PaymentMethod]', paymentMethod);
        setErr('')
      }

    const {paymentIntent, error:confirmerror} = await stripe.confirmCardPayment(
            clientSecret,
            {
              payment_method: {
                card: card,
                billing_details: {
                  name: user?.displayName || 'unknown',
                  email: user?.email || 'unknown'
                },
              },
            },
          );
    if(confirmerror){
        console.log(confirmerror);
    }
    console.log(paymentIntent)
    setprocess(false)
        if (paymentIntent.status === 'succeeded') {
            setTransactionId(paymentIntent.id);
            const payment = {
                email: user?.email,
                transactionId: paymentIntent.id,
                price,
                classname: cart.classname,
                instructorname: cart.instructorname,
                date: new Date(),
                classId: cart.classId
            }
            fetch('https://learnlanguage-server.vercel.app/payments',{
                method: 'POST',
                headers:{
                'content-type': 'application/json',
                authorization: `bearer ${token}`
                },
                body: JSON.stringify(payment)
                })
                .then(res=> res.json())
                .then(data=> {
                if(data.insertedId>0){
                  refetch()
                    console.log('Payment Successfull')
                  }})

                  fetch(`https://learnlanguage-server.vercel.app/carts/${cart.classId}`,{
                      method: 'PUT',
                      headers:{
                        'content-type': 'application/json',
                        authorization: `bearer ${token}`
                      },
                      body: JSON.stringify({purchase: 'true',email: user?.email})
                    })
                    .then(res=> res.json())
                    .then(data=> {
                      console.log('Cart Status Updated' ,data)
                      fetch(`https://learnlanguage-server.vercel.app/updateclass/${cart.classId}`,{
                      method: 'PATCH',
                      headers:{
                        'content-type': 'application/json',
                        authorization: `bearer ${token}`
                      },
                      body: JSON.stringify({enrollstudent: enrollstudent+1 , availableseat: availableseat-1})
                    })
                    .then(res=> res.json())
                    .then(data=> {
                      refetch()
                      console.log('Updata Class data',data)
                      if(data.modifiedCount>0){
                      Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Enrolled Successfully',
                        showConfirmButton: false,
                        width: 400,
                        timer: 1500
                      })
                      navigate('/dashboard/mycart')
                    }
                    })})

                    
            // axios.post('https://learnlanguage-server.vercel.app/payments',payment)
            // .then(res=>{
            //     console.log(res.data);
            //     if(res.data.result.insertedId){
            //         console.log('Payment Successfull')
            //     }
            // })

    };
    }
    return (<>
    {
        err && <p className='font-medium text-red-500 mb-4'>{err}</p>
    }
            <form className="w-[400px] m-8" onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button className='btn btn-accent mt-4' type="submit" disabled={!stripe || !clientSecret || process}>
        Proceed to Pay
      </button>
    </form>
    </>)
};
export default CheckOut;