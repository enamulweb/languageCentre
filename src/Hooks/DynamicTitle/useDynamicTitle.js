import { useEffect } from "react";
const useDynamicTitle=(title)=>{
    title? title= '| '+title : ''
    useEffect(()=>{
        document.title = `Learn Language ${title}`;   
},[])
}
 

export default useDynamicTitle;