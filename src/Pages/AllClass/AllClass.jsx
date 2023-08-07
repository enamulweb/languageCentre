import React from 'react';
import { useQuery } from '@tanstack/react-query'
import EachClass from './EachClass';
import { json } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';

const AllClass = () => {
    const {user,loading} = useAuth();
    const token= localStorage.getItem("access-token")
            const { data: classes = [],refetch,isLoading, isError, error } = useQuery({
            queryKey: ['classes'],
            queryFn: async ()=>{
                const response = await fetch(`https://learnlanguage-server.vercel.app/allclasses`,{
                  headers :{
                      authorization: `bearer ${token}`
          }
      })
        return response.json()
    }
    })
  const handleAddtoCart = (data)=>{
    const classId = data._id
    delete data._id;
    const token= localStorage.getItem("access-token")
    fetch('https://learnlanguage-server.vercel.app/addtocart',{
        method: 'POST',
        headers:{
            'content-type': 'application/json',
            authorization: `bearer ${token}`
        },
        body: JSON.stringify({
            ...data,
            classId,
            purchasedBy: user?.email,
            purchase : 'false'

        })
    })
    .then(res=> res.json())
    .then(data=> {
        refetch()
        if(data.message){
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: `${data.message}`,
                width: 400,
                showConfirmButton: false,
                timer: 1500
              })
        }
       if(data.insertedId){
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your Class has been Added to cart',
            showConfirmButton: false,
            width: 400,
            timer: 1500
          })
       }
    })
  }
    return (
        <div className='pt-5 pb-5 pl-5 pr-5 bg-green-400'>

            <div className='grid grid-cols-3 gap-4'>
                {
                    classes.map((eachClass,index)=> <EachClass handleAddtoCart={handleAddtoCart} eachClass={eachClass} key={index} />)
                }
            </div>
        </div>
    );
};

export default AllClass;