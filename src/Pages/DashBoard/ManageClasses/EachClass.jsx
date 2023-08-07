import React, { useState } from 'react';


const EachClass = ({eachclass,handleApproved,handleDeny,handleFeedback}) => {
    const {_id,classname,classimage,availableseat,enrollstudent,feedback,instructoremail,instructorname,price,status}= eachclass || {}

    return (
        <tr>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                        <img src={classimage} alt="Avatar Tailwind CSS Component" />
                    </div>
                    </div>
                    
                </div>
            </td>
            <th>
                <div className='font-bold'>{classname}</div>
            </th>
            <th>
                <div className='font-medium text-xs'>{instructorname}</div>
            </th>
            <th>
                <div className='font-medium text-xs'>{instructoremail}</div>
            </th>
            <th>
                <div className='font-medium text-xs'>{availableseat}</div>
            </th>
            <th>
                <div className='font-medium text-xs'>$ {price}</div>
            </th>
            <th>
                <div className='font-medium text-xs'>{status}</div>
            </th>
            <th>
            <button disabled={(status == 'Approved'? true:false)||(status == 'Denied'? true:false)} onClick={()=>handleApproved(_id,feedback)} className="btn btn-success">Approved</button>
            <button disabled={(status == 'Approved'? true:false)||(status == 'Denied'? true:false)} onClick={()=>handleDeny(_id,feedback)} className="btn btn-error">Denied</button>
            <button onClick={()=>handleFeedback(_id,status)}  disabled={(status == 'Approved'? true:false)} className="btn btn-warning">Feedback</button>
            </th>
        
            
        </tr>

    );
};

export default EachClass;