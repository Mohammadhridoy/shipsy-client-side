
import Container from "../../../Shared/Container";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import Swal from "sweetalert2";


const Allparcels = () => {

    const axiosSecure = useAxiosSecure()

    const {data: allparcelsInfos = [], refetch} = useQuery({
        queryKey:["allparels"],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/bookings`)
            return res.data
        }
    })
    const {data: deliverymans =[]  } =useQuery({
        queryKey:['deliverymans '],
        queryFn: async() =>{
            const res = await axiosSecure.get('/user/deliverman')
            return res.data 
        }
    })
    // console.log(deliverymans)
    // single 
    // manage parcels 
    const [parcelId, setParcelId] = useState(null)
    const { register, handleSubmit, control} = useForm();
    // console.log(parcelId)
    const onSubmit = data => {
        
        
        console.log(data)
        const [deliverymanid, deliverymanemail] = data.deliveryman.split(',');
        const deliverymaninfo ={
            approximateDeliveryDate: data.approximateDeliveryDate,
            deliverymanid: deliverymanid,
            deliverymanemail: deliverymanemail

        } 
        console.log(deliverymaninfo)
        axiosSecure.put(`/bookings/admin/update/${parcelId}`, deliverymaninfo)
        .then(res=>{
            if(res.data.modifiedCount>0){
                refetch()
                Swal.fire({
                    title: 'Success!',
                    text: ' Updated successfully ',
                    icon: 'success',
                    confirmButtonText: 'OK'
                  })
            }
        })
    };


    return (
        <div>
            <div className="py-8">
         <Container>
         <div className="">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead className="ltr:text-left rtl:text-right">
            <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Users name  
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                users phone
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Booking Date
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Requestes <br></br> Delivery Date
                </th>
                <th className="px-4 py-2">
                Cost
                </th>
                <th className="px-4 py-2">
                Status
                </th>
                <th className="px-4 py-2">
                
                </th>
            </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
                {
                    allparcelsInfos?.map(allparcels => <tr key={allparcels._id} className=" pb-4">
                    <td className="whitespace-nowrap px-2 py-2 font-medium text-gray-900">
                    {allparcels?.userName}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{allparcels?.userNumber}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{allparcels?.bookingDate}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{allparcels?.requestedDeliveryDate}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{allparcels?.price}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{allparcels?.status }</td>
                    
                    <td className="whitespace-nowrap px-4 py-2 space-x-3">
                      {
                        allparcels?.status==="cancel"? <button disabled
                        className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
> 
                        Manage
                        </button>: <button onClick={()=>document.getElementById('my_modal_1').showModal()} onBlur={()=>setParcelId(allparcels._id)}
                        className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
> 
                        Manage
                        </button>
                      }
                        

                       
                   
                    </td>
                </tr>
                        
                        
                        
                        )
                }
                
                  

                    
                
            
            </tbody>
        </table>
        </div>
        {/* open model  */}
        <div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <dialog id="my_modal_1" className="modal">
            <div className="modal-box pt-16">
                <div>
                  <form  method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form  >  
                <form onSubmit={handleSubmit(onSubmit)} >
                
            
                 <Controller
                    name="deliveryman"
                    control={control}
                    render={({ field }) => (
                        <select {...field} className="select select-bordered w-full max-w-lg p-3 ">
                        <option value="" disabled>Select a deliveryman</option>
                        {deliverymans.map((deliveryman) => (
                            <option key={deliveryman._id}  value={`${deliveryman._id},${deliveryman.email}`}>
                            {deliveryman.name}
                            </option>
                        ))}
                        </select>
                    )}
                    />
                
              
               
                <div className=" flex items-center justify-between gap-5 mb-5 mt-3">
           
                <input
                    type="date"
                    id="UserEmail"
                    {...register("approximateDeliveryDate")}
                    className="mt-1 p-3  w-full rounded-md border border-gray-200 shadow-sm sm:text-sm"
                />
                
                </div>
 
                    
                <button
                    className="inline-block ml-40  shrink-0 rounded-md  bg-[#146e99] px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-[#146e99] hover:border-none hover:bg-white hover:shadow-lg focus:outline-none focus:ring active:text-blue-500"
                    >
                    assign
                    </button>
                    </form>
                
                </div>
            </div>
            </dialog>
        </div>
            
         </Container>

      
        </div>
        </div>
    );
};

export default Allparcels;