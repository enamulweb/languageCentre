import { useQuery } from '@tanstack/react-query'
import useAuth from '../useAuth';

const useClasses = ()=>{
  const {user,loading} = useAuth()
  const token= localStorage.getItem("access-token")
  const { data: classes = [],refetch,isLoading, isError, error } = useQuery({
    queryKey: ['classes'],
    enabled: !loading,
    queryFn: async ()=>{
        const response = await fetch(`https://learnlanguage-server.vercel.app/classes?email=${user?.email}`,{
          headers :{
              authorization: `bearer ${token}`
          }
      })
        return response.json()
    }
})
return [classes,refetch,isLoading]

};

export default useClasses;