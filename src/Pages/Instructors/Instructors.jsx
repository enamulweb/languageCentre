import React, { useEffect, useState } from 'react';

const Instructors = () => {
    const [instructor,setInstructor] = useState([]);
    useEffect(()=>{
        fetch('https://learnlanguage-server.vercel.app/allinstructors')
        .then(res=> res.json())
        .then(data=> setInstructor(data))
    })
    console.log(instructor)
    return (
        <div className='mb-5'>
            <p className='text-center text-3xl font-bold mt-5'>All Instructors</p>
            <div className='grid grid-cols-3 gap-4 ml-5 mt-5'>
                {
                    instructor.map(each=> <div key={each._id} className="card w-96 bg-green-400 shadow-xl image-full">
                    <div className="card-body ">
                      <img className='w-24 h-24 rounded-full' src={each.photourl}
                       alt="" />
                       <p className="card-title">
                        <p>Name: {each.name}</p>
                      </p>
                        <p>Email: {each.email}</p>
                       </div>
                      

                  </div>)
                }
            </div>
        </div>
    );
};

export default Instructors;