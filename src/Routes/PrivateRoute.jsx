import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import { InfinitySpin } from 'react-loader-spinner';

const PrivateRoute = ({children}) => {
    const {user,loading}= useContext(AuthContext)
    const location = useLocation();
    if(loading){
        return <>
            <div className='lg:ml-[40%] lg:mt-[10%]'>
            <InfinitySpin 
        width='500'
        color="#4fa94d"
        height='500'
      />
        </div>
        </>
    }
    if(user){
        return children;
    }
    return <Navigate to='/login' state={{from: location}} replace></Navigate>
};


export default PrivateRoute;