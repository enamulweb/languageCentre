import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query'
import { AuthContext } from '../../Provider/AuthProvider';

const useUsers = () => {
    const {user,loading} = useContext(AuthContext)
    const token= localStorage.getItem("access-token")
    console.log(user?.email)
    const { data: users = [],refetch,isLoading, isError, error } = useQuery({
        queryKey: ['users',user?.email],
        enabled: !loading,
        queryFn: async ()=>{
            const res = await fetch(`https://learnlanguage-server.vercel.app/users?email=${user?.email}`,{
                headers :{
                    authorization: `bearer ${token}`
                }
            })
            return res.json()
        }
    })
    return [users,refetch,isLoading]
};
export default useUsers;