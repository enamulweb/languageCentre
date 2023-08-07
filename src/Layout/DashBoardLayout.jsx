import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { FaCartPlus, FaClipboard, FaHome, FaOldRepublic, FaPlusCircle, FaUser, FaWallet } from "react-icons/fa";
import useAuth from '../Hooks/useAuth';
import useAdmin from '../Hooks/useAdmin';
const DashBoardLayout = () => {
    const {user,logOut} = useAuth();
  
    const [isAdmin] = useAdmin()
    const {Admin , Instructor ,Student} = isAdmin || [];

    return (
        <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
        <Outlet/>
            <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
        </div>
        <div className="drawer-side bg-green-300">
            <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
            <div className="avatar z-20 ml-20 mt-5">
                <div className="w-14 rounded-full">
                    <img src={user?.photoURL} />
                </div>
            </div>
            <p className='font-medium text-center'>{user?.displayName}</p>
            <ul className="menu p-4 w-60 h-full  text-base-content">
                <li className='mb-2'><NavLink className={({ isActive }) => (isActive ? 'active' : 'default')} to='/dashboard/mycart'><FaHome/>User Profile</NavLink></li>
                
                {
                    Admin && <>
                    <li className='mb-2'><NavLink className={({ isActive }) => (isActive ? 'active' : 'default')} to='/dashboard/allusers'><FaUser/> Manage Users </NavLink></li>
                    <li className='mb-2'><NavLink className={({ isActive }) => (isActive ? 'active' : 'default')} to='/dashboard/manageclasses'><FaCartPlus/> Manage Classes</NavLink></li>
                    </>
                }
                {
                    Instructor && <>
                    <li className='mb-2'><NavLink className={({ isActive }) => (isActive ? 'active' : 'default')} to='/dashboard/addclass'><FaPlusCircle/>Add A Class</NavLink></li>
                    <li className='mb-2'><NavLink className={({ isActive }) => (isActive ? 'active' : 'default')} to='/dashboard/addedclasses'><FaUser/>Added Classed</NavLink></li>
                    
                    </>
                }
                {
                    Student && <>
                    <li className='mb-2'><NavLink className={({ isActive }) => (isActive ? 'active' : 'default')} to='/dashboard/studentcart'><FaClipboard/> Selected Classes </NavLink></li>
                    <li className='mb-2'><NavLink className={({ isActive }) => (isActive ? 'active' : 'default')} to='/dashboard/enroll'><FaOldRepublic/> Enroll Classes </NavLink></li>
                    <li className='mb-2'><NavLink className={({ isActive }) => (isActive ? 'active' : 'default')} to='/dashboard/wallet'><FaWallet/> Payment History </NavLink></li>
                    </>

                }
                <div className='divider'></div>
                <li><Link className='font-medium tracking-wide text-gray-700 transition-colors duration-200 mr-4' to='/'>Home</Link></li>
                <li><Link className='font-medium tracking-wide text-gray-700 transition-colors duration-200 mr-4' to='/instructors'>Instructors</Link></li>
                <li><Link className='font-medium tracking-wide text-gray-700 transition-colors duration-200 mr-4' to='/classes'>Classes</Link></li>
                <li><Link onClick={logOut} className='font-medium tracking-wide text-gray-700 transition-colors duration-200 mr-4'>Log Out</Link></li>
            </ul>
            
        
        </div>
        </div>
    );
};

export default DashBoardLayout;