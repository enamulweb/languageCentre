import React, { useState } from 'react';
import useClasses from '../../../Hooks/DynamicTitle/useClasses';
import EachClass from './EachClass';
import Swal from 'sweetalert2';
import { Slide } from 'react-awesome-reveal';

const ManageClasses = () => {
    const [classes,refetch,] = useClasses();
    const [FeedbackId,setFeedbackId] = useState('')
    const [Idstatus,setIdstatus] = useState('')
    const handleApproved = (id,feedback) =>{
        const data = {status:'Approved',feedback: feedback}
         fetch(`https://learnlanguage-server.vercel.app/classes?id=${id}`,{
             method: 'PUT',
             headers: {
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify(data)
         })
         .then(res=> res.json())
         .then(data=>{
             if(data.modifiedCount>0){
                 refetch()
                 Swal.fire({
                     position: 'top-end',
                     icon: 'success',
                     title: 'Class Approved Successfully',
                     showConfirmButton: false,
                     timer: 1500
                   })
             }
         })
     }
     const handleDeny = (id,feedback) => {
        const data = {status:'Denied',feedback: feedback}
         fetch(`https://learnlanguage-server.vercel.app/classes?id=${id} `,{
             method: 'PUT',
             headers: {
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify(data)
         })
         .then(res=> res.json())
         .then(data=>{
             if(data.modifiedCount>0){
                 refetch()
                 Swal.fire({
                     position: 'top-end',
                     icon: 'error',
                     title: 'Class Denied Successfully',
                     showConfirmButton: false,
                     timer: 1500
                   })
             }
         })

     }
     
     const handleFeedback = (id,status) =>{
        window.my_modal_5.showModal()
        setFeedbackId(id)
        setIdstatus(status)
     }
     const handleFeedbackData =(e) =>{
            const form = e.target;
            const feedback = form.feedback.value;
            const data = {status: Idstatus,feedback: feedback}
            fetch(`https://learnlanguage-server.vercel.app/classes?id=${FeedbackId}`,{
             method: 'PUT',
             headers: {
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify(data)
         })
         .then(res=> res.json())
         .then(data=>{
             if(data.modifiedCount>0){
                 refetch()
                 Swal.fire({
                     position: 'top-end',
                     icon: 'error',
                     title: 'Feedback Send Successfully',
                     showConfirmButton: false,
                     timer: 1500
                   })
             }
         })
     }

     if(classes.length<1){
        return <div>
            <p className='text-xl font-extrabold'>No Class Found</p>
        </div>
     }
    return (
        <Slide duration={1000}>
            <div className='w-full'>
            <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                <tr>
                    <th>Class Image</th>
                    <th>Class Name</th>
                    <th>Instructor Name</th>
                    <th>Instructor Email</th>
                    <th>Available Seat</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Update</th>
                </tr>
                </thead>
                <tbody>
                {/* row 1 */}
                    {
                        classes?.map((eachclass) => <EachClass handleApproved={handleApproved} key={eachclass._id} eachclass={eachclass} handleDeny={handleDeny} handleFeedback={handleFeedback}/>)  
                    }
                </tbody>
            </table>
</div>

{/* Feedback Modal */}

<dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
  <form onSubmit={handleFeedbackData} method="dialog" className="modal-box">
    <h3 className="font-bold text-center text-lg">Give Feedback</h3>
    <textarea className="textarea-lg w-full textarea-success" name='feedback' placeholder="Type your feedback" required></textarea>
    <button type='submit' className="btn w-full bg-green-500">Submit</button>
  </form>
</dialog>


</div>
        </Slide>
    );
};

export default ManageClasses;