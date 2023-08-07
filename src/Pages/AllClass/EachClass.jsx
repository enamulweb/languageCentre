import React from 'react';
import { FaChalkboardTeacher, FaMoneyCheck, FaUserTie } from 'react-icons/fa';
import useAdmin from '../../Hooks/useAdmin';
import useAuth from '../../Hooks/useAuth';
import { Link } from 'react-router-dom';

const EachClass = ({eachClass,handleAddtoCart}) => {
    const [isAdmin] = useAdmin()
    const {user} = useAuth()
    const {Admin , Instructor ,Student} = isAdmin || [];
    const {availableseat,classimage,classname,instructorname,price} = eachClass || {}
    const available = availableseat;
    return (
        <div className={`card w-[400px] glass ${available<1 && 'bg-red-600'}`}>
            <figure><img className='w-full h-72' src={classimage} alt="car!"/></figure>
            <div className="card-body text-white">
                        <h2 className="card-title">{classname}</h2>
                        <p  className='flex items-center'><FaUserTie className='text-3xl mr-4'/><span className='text-lg mr-2'>Instructor :</span> {instructorname}</p>
                        <p className='flex items-center'><FaChalkboardTeacher className='text-3xl mr-4'/><span className='text-lg mr-2'>Available Seat :</span> {availableseat}</p>
                        <p className='flex items-center'><FaMoneyCheck className='text-3xl mr-4'/><span className='text-lg mr-2'>Price : $</span> {price}</p>
                        <div className="card-actions justify-end">
                        {
                           user?  (Admin || Instructor || (available<1)) ? <button disabled className="btn btn-accent bg-green-600 text-white">Select</button>: <button onClick={()=>handleAddtoCart(eachClass)} className="btn btn-accent bg-green-600 text-white">Select</button>:<Link className='btn bg-red-400' to='/login'>Login First to Select</Link>
                        }
                        </div>
                    </div>
        </div>
    );
};

export default EachClass;