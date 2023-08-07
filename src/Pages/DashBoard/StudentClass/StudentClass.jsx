import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { FaBookReader, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import useSelectedClass from '../../../Hooks/DynamicTitle/useSelectedClass';

const StudentClass = () => {
    
    const [carts,refetch] = useSelectedClass()
    
const handleDelete = (id)=>{
    fetch(`https://learnlanguage-server.vercel.app/carts/${id}`,{
        method: 'DELETE'
    })
    .then(res=> res.json())
    .then(data=>{
        if(data.deletedCount===1){
            refetch()
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `Class Deleted Successfully`,
                showConfirmButton: false,
                timer: 1500
              })
        }
    })
}
if(carts.length<1){
    return(
        <div>
            <p className='font-bold text-3xl'>No Selected Class Found</p>
        </div>
    )
}
    return (
        <div className=' w-full'>
            <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                <tr>
                    <th>#</th>
                    <th>Class Image</th>
                    <th>Class Name</th>
                    <th>Instructor Name</th>
                    <th>Price</th>
                    <th>Payment</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                    {
                        carts?.map((cart,index)=> <tr key={cart._id}>
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
                            <td className='font-medium'>
                                {cart.price}
                            </td>
                            <td className='font-medium'>
                                <Link to={`/dashboard/payment/${cart.classId}`}><span className='btn btn-accent'>Payment</span></Link>
                            </td>
                            <td>
                            <button onClick={()=> handleDelete(cart._id)} className='btn btn-ghost bg-red-400 text-white'><FaTrashAlt></FaTrashAlt></button>
                            </td>
                        </tr> )
                    }

                </tbody>
            </table>
        </div>
    </div>
    );
};

export default StudentClass;