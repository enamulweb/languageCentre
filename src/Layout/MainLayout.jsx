import React, { useEffect, useState } from 'react';
import Header from '../Shared/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../Shared/Footer';
import { InfinitySpin } from 'react-loader-spinner'


const MainLayout = () => {
    const [Loader,setLoader]= useState(true);
    const [isLight,setisLight] = useState(true);
    setTimeout(()=>{
            setLoader(false)
    },'1000')
    const handletheme = (Light)=>{
        setisLight(Light)
        console.log(Light)
    }
    const darkMode = {
        backgroundColor: 'black'
    }
    const lightMode = {
        backgroundColor: ''
    }
    if(Loader){
        return <div className='lg:ml-[40%] lg:mt-[10%]'>
            <InfinitySpin 
        width='500'
        color="#4fa94d"
        height='500'
      />
        </div>
    }
    else{
        return (
            <div className={({ isLight }) => (isLight ? '' : 'bg-black')} >
            <Header handletheme={handletheme} isLight={isLight}/>
            <Outlet/>
            <Footer/>
            </div>
        );
    }
};

export default MainLayout;