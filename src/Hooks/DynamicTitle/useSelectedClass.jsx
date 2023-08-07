import React from 'react';
import { useQuery } from '@tanstack/react-query'
import useAuth from '../useAuth';
const useSelectedClass = () => {
    const {user,loading} = useAuth()
    const token= localStorage.getItem("access-token")
  const { data: carts = [],refetch,isLoading, isError, error } = useQuery({
    queryKey: ['carts'],
    enabled: !loading,
    queryFn: async ()=>{
        const response = await fetch(`https://learnlanguage-server.vercel.app/carts/?email=${user?.email}&purchase=false`,{
            headers :{
                authorization: `bearer ${token}`
            }
        })
        return response.json()
    }
})
return [carts,refetch]
};

export default useSelectedClass;