import React from 'react';
import SliderSection from './SliderSection';
import useDynamicTitle from '../../Hooks/DynamicTitle/useDynamicTitle';
import PopularClass from './PopularClass';
import { useQuery } from '@tanstack/react-query';
import PopularInstructor from './PopularInstructor';
import ServiceSection from './ServiceSection';

const Home = () => {
    useDynamicTitle('Home')
    const { data: PopularInst = [],refetch,isLoading, isError, error } = useQuery({
        queryKey: ['popularInst'],
        queryFn: async ()=>{
            const response = await fetch('https://learnlanguage-server.vercel.app/popularinstructor')
            return response.json()
        }
    })
    return (
        <div>
            <SliderSection/>
            <PopularClass/>
            <PopularInstructor PopularInst={PopularInst}/>
            <ServiceSection/>
        </div>
    );
};

export default Home;