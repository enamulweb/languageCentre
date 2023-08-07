import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import useAdmin from '../Hooks/useAdmin';

const Header = ({handletheme,isLight}) => {
    const {user,logOut} = useContext(AuthContext);
    const [isAdmin] = useAdmin()
    const {Admin , Instructor ,Student} = isAdmin || [];
    const navLink = <>
    <li ><NavLink to='/' className={({ isActive }) => (isActive ? 'active' : 'default')}>Home</NavLink></li>
    <li className='mt-2 lg:mt-0'><NavLink to='/instructors' className={({ isActive }) => (isActive ? 'active' : 'default')}>Instructors</NavLink></li>
    <li className='mt-2 lg:mt-0'><NavLink to='/classes' className={({ isActive }) => (isActive ? 'active' : 'default')}>Classes</NavLink></li>
    {
        user && <>
        <li className='mt-2 lg:mt-0'><NavLink to='dashboard/mycart' className={({ isActive }) => (isActive ? 'active' : 'default')}>Dashboard</NavLink></li>
        </>

    }
    {
        !user && <li className='mt-2 lg:mt-0'><NavLink to='/login' className={({ isActive }) => (isActive ? 'active' : 'default')}>Login</NavLink></li>
    }
    
    </>
    return (
        <div className="navbar font-mono bg-green-900 text-white border-b-4 border-b-green-900">
        <div className="navbar-start">
            <div className="dropdown z-30">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                {navLink}
            </ul>
            </div>
            <a className="font-medium font-mono text-xl">Learn Language</a>
        </div>
        <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal gap-3  px-1">
            {navLink}
            </ul>
        </div>
        {
            user && <div className="navbar-end mr-10">
            <div className='hidden lg:block'>
            <button onClick={()=>handletheme(!isLight)} className='btn btn-circle mr-5' >{isLight? 'Light':'Dark'}</button>
            <Link onClick={logOut} className='font-medium tracking-wide text-white bg-green-500 transition-colors duration-200 btn btn-outline mr-4'>Log Out</Link>
            </div>
            <div className="avatar tooltip tooltip-bottom z-20" data-tip={user.displayName}>
                <div className="w-14 rounded-full">
                    <img src={user.photoURL} />
                </div>
            </div>
        </div>
        }
        </div>
    );
};

export default Header;