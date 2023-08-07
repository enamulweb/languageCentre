import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Fade, Slide } from "react-awesome-reveal";

const PopularClass = () => {
    const { data: popularClass = [],refetch,isLoading, isError, error } = useQuery({
        queryKey: ['popularClass'],
        queryFn: async ()=>{
            const response = await fetch(`https://learnlanguage-server.vercel.app/popularclass`)
            return response.json()
        }
    })

    return (
        <div className='bg-green-300'>
            <div className='pt-10 pb-5 text-white text-center font-extrabold    text-2xl lg:text-5xl'>
                <p>Our Popular Classes</p>
            </div>
            <Slide duration={1000}>
            <div className='grid lg:grid-cols-3 gap-8 mt-5 pb-10 ml-2 lg:ml-5' >
                {
                    popularClass.map(pclass=><div key={pclass._id} className="card w-72 lg:w-96 bg-base-100 shadow-xl image-full">
                    <figure><img src={pclass.classimage} alt="Shoes" /></figure>
                    <div className="card-body">
                      <h2 className="card-title font-bold text-3xl">{pclass.classname}</h2>
                      <p className='text-xl'><span>Instructor: </span><span className='font-medium'>{pclass.instructorname}</span></p>
                      <p><span>Enroll Student : </span>{pclass.enrollstudent}</p>
                      <p><span>Available Seat : </span>{pclass.availableseat}</p>
                      <p>To Explore and learn {pclass.classname} , plz confirm your seat</p>
                    </div>
                  </div>)
                }
            </div>
            </Slide>
        </div>
    );
};

export default PopularClass;