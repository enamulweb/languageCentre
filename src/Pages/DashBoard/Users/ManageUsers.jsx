import React, { useState } from 'react';
import useUsers from '../../../Hooks/DynamicTitle/useUsers';
import useDynamicTitle from '../../../Hooks/DynamicTitle/useDynamicTitle';
import { FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { Slide } from 'react-awesome-reveal';

const ManageUsers = () => {
    const [users,refetch,] = useUsers()
    useDynamicTitle('All Users')
    
    //console.log(users)
    const handleRole = (id,role)=>{
        console.log(id,role)
        fetch(`https://learnlanguage-server.vercel.app/users/admin?id=${id}&role=${role}`,{
            method: 'PATCH'
        })
        .then(res=> res.json())
        .then(data=>{
            if(data.modifiedCount>0){
                refetch()
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `Make ${role} Successfully`,
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
        })
    }

    // TO DO delete user
    const handleDelete = id =>{
        fetch(`https://learnlanguage-server.vercel.app/deleteuser/${id}`,{
            method: 'DELETE'
        })
        .then(res=> res.json())
        .then(data=>{
            console.log(data)
            if(data.deletedCount === 1){
                refetch()
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `User Deleted Successfully`,
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
        })
    }
    return (
        <Slide duration={1000}>
            <div className=' w-full'>
            <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Update Role</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                    {
                        users?.map((user,index)=><tr key={user._id}>
                            <th>{index+1}</th>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{
                                user.role === 'Admin' && <p>Admin</p>
                                }{
                                    user.role === 'Student' && <p>Student</p>
                                }
                                {
                                    user.role === 'Instructor' && <p>Instructor</p>
                                }
                                
                            </td>
                            <td>
                                {
                                    user.role === 'Admin' && <>
                                    <button onClick={()=>handleRole(user._id,'Instructor')} className='btn btn-accent mr-2'>Instructor</button>
                                    <button onClick={()=>handleRole(user._id,'Student')} className='btn btn-neutral'>Student</button>
                                    </>
                                }
                                {
                                    user.role === 'Instructor' && <>
                                    <button onClick={()=>handleRole(user._id,'Admin')}  className='btn btn-accent mr-2'>Admin</button>
                                    <button onClick={()=>handleRole(user._id,'Student')} className='btn btn-neutral'>Student</button>
                                    </>
                                }
                                {
                                    user.role === 'Student' && <>
                                    <button onClick={()=>handleRole(user._id,'Admin')} className='btn btn-accent mr-2'>Admin</button>
                                    <button onClick={()=>handleRole(user._id,'Instructor')}  className='btn btn-neutral'>Instructor</button>
                                    </>
                                }
                            </td>
                            <td><button onClick={()=> handleDelete(user._id)} className='btn btn-ghost bg-red-400 text-white'><FaTrashAlt></FaTrashAlt></button></td>

                        </tr>)
                    }
                </tbody>
            </table>
            </div>
        </div>
        </Slide>
    );
};

export default ManageUsers;