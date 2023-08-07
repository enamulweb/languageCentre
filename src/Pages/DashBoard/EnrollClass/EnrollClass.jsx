import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useEnrolledClass from '../../../Hooks/useEnrolledClass';

const EnrollClass = () => {
    const [enrollCart,refetch] = useEnrolledClass();
    console.log(enrollCart)
    return (
        <div className='w-full ml-5'>
            <div className='w-full'>
            <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                <tr>
                    <th>#</th>
                    <th>Class Image</th>
                    <th>Class Name</th>
                    <th>Instructor Name</th>
                </tr>
                </thead>
                <tbody>
                    {
                        enrollCart?.map((cart,index)=> <tr key={cart._id}>
                            <td>{index+1}</td>
                            <td>
                                <div className="flex items-center space-x-3">
                                    <div className="avatar">
                                    <div className="mask mask-squircle w-12 h-12">
                                        <img src={cart.classimage} alt="Avatar Tailwind CSS Component" />
                                    </div>
                                    </div>
                                    
                                </div>
                            </td>
                            <td className='font-medium'>
                                {cart.classname}
                            </td>
                            <td className='font-medium'>
                                {cart.instructorname}
                            </td>

                        </tr> )
                    }

                </tbody>
            </table>
        </div>
    </div>
        </div>
    );
};

export default EnrollClass;