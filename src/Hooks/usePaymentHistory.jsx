import React from 'react';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';

const usePaymentHistory = () => {
    const {user} = useAuth()
    const token= localStorage.getItem("access-token")
  const { data: historyCart = [],refetch,isLoading, isError, error } = useQuery({
    queryKey: ['historyCart',user?.email],
    queryFn: async ()=>{
        const response = await fetch(`https://learnlanguage-server.vercel.app/paymenthistory/${user?.email}`,{
            headers :{
                authorization: `bearer ${token}`
            }
        })
        return response.json()
    }
})
return [historyCart,refetch]
};

export default usePaymentHistory;