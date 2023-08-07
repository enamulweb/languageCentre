import React from 'react';
import { Fade, Slide } from "react-awesome-reveal";


const PopularInstructor = ({PopularInst}) => {
    console.log(PopularInst)
    return (
        <div className='bg-green-300'>
            <div className='pt-10 pb-5 text-white text-center font-extrabold 
            text-2xl lg:text-5xl'>
                <p>Our Popular Instructor</p>
            </div>
                <Slide direction={'right'} duration={1500}>
                <div className='grid lg:grid-cols-3 gap-8 mt-5 pr-10 pb-10 ml-2 lg:ml-5' >
                {
                    PopularInst.map( pInstructor=> <div key={pInstructor._id} className="card ml-5 lg:ml-0 lg:w-96 bg-green-400 shadow-xl image-full">
                    <div className="card-body ">
                      <img className='w-24 h-24 rounded-full' src={pInstructor.photourl}
                       alt="" />
                       <p className="card-title">
                        <p>Name: {pInstructor.name}</p>
                      </p>
                        <p>Email:{pInstructor.email} </p>
                       </div></div>)
                    
                }
                </div>
            </Slide>
        </div>
    );
};

export default PopularInstructor;