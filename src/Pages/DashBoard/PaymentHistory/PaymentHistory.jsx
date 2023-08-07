import React from 'react';
import useDynamicTitle from '../../../Hooks/DynamicTitle/useDynamicTitle';
import usePaymentHistory from '../../../Hooks/usePaymentHistory';
import moment from 'moment';
const PaymentHistory = () => {
    const [historyCart,]= usePaymentHistory();
    useDynamicTitle('Payment')
    console.log(historyCart)
    if(historyCart.length<1){
        return(
            <div>
                <p className='font-bold text-3xl'>No Payment History Found</p>
            </div>
        )
    }
    return (
        <div className='w-full ml-5'>
            <p className='text-center text-3xl font-bold mb-5 mt-5'>Payment History</p>
            <div className=' w-full'>
            <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                <tr>
                    <th>#</th>
                    <th>Class Name</th>
                    <th>Instructor Name</th>
                    <th>TransactionId</th>
                    <th>Price</th>
                    <th>Date of Enroll</th>
                </tr>
                </thead>
                <tbody>
                    {
                        historyCart.map((each,index)=> <tr key={index}>
                            <td>{index+1}</td>
                            <td>{each.classname}</td>
                            <td>{each.instructorname}</td>
                            <td>{each.transactionId}</td>
                            <td>{each.price}</td>
                            <td>{moment(each.date).format('MMMM Do YYYY, h:mm:ss a')} </td>
                        </tr> )
                    }

                </tbody>
            </table>
        </div>
        </div>
        </div>
    );
};

export default PaymentHistory;