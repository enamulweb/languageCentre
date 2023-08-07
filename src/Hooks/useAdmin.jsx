import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../Provider/AuthProvider';

const useAdmin = () => {
    const {user,loading} = useContext(AuthContext)
    console.log('Use Admin', user?.email)
    const token= localStorage.getItem("access-token")
    const {data: isAdmin,isAdminLoading}= useQuery({
        queryKey: ['isAdmin',user?.email],
        queryFn: async ()=>{
            const response = await fetch(`https://learnlanguage-server.vercel.app/users/admin/${user?.email}`,{
                headers :{
                    authorization: `bearer ${token}`
                }
            })
            return response.json()
        }
    })
    return [isAdmin,isAdminLoading];
};

export default useAdmin;