import { Link, useNavigate } from "react-router-dom";
import Container from "../../../Shared/Container";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useContext } from "react";
import  { AuthContext } from "../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";


const MyParcels = () => {
    const navigate = useNavigate()
    const {user} = useContext(AuthContext)
    const axiossecure = useAxiosSecure()
    const {  data: bookings=[], refetch } = useQuery({
        queryKey: ['bookinginfo'],
        queryFn: async()=>{
            const res = await axiossecure.get(`/bookings?email=${user?.email}`)
            return res.data
        } ,
      })
     console.log(bookings)
    
    const handleUpdate = (id) =>{
        navigate(`/dashboard/updateparcels/${id}`)
    }
    // cancel status 
    const  handleCancel = (id) =>{
        console.log(id)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
          }).then((result) => {
            if (result.isConfirmed) {
                axiossecure.patch(`/bookings/cancel/${id}`)
                .then(res=>{
                    if(res.data.modifiedCount>0){
                        refetch()
                        console.log(res.data)
                        Swal.fire({
                            title: "Deleted!",
                            text: "status update sucecssfully!",
                            icon: "success"
                          });
                    }
                })

             
            }
          });
    }
    //   review form input data
    const { register, handleSubmit } = useForm();

    const onSubmit = data => console.log(data);

    return (
        <div className="py-8">
         <Container>
         <div className="">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead className="ltr:text-left rtl:text-right">
            <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Parcel type 
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Requested <br></br> delivery date
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Approximate <br></br> delivery date
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Booking Date
                </th>
                <th className="px-4 py-2">
                Delivery Men ID
                </th>
                <th className="px-4 py-2">
                Booking Status
                </th>
                <th className="px-4 py-2">
                
                </th>
            </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
                {
                    bookings?.map((book, index) =><tr key={index} className=" pb-4">
                    <td className="whitespace-nowrap px-2 py-2 font-medium text-gray-900">
                    {book?.parcelType}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{book?.requestedDeliveryDate}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">coming soon</td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{book?.bookingDate}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{"id"}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{ book?.status  }</td>
                    
                    <td className="whitespace-nowrap px-4 py-2 space-x-3">
                        <Link to=''
                        className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                        >
                            Pay
                        </Link>
                        
                          
                        {
                           book?.status ==="pending"?  <button onClick={()=> handleUpdate(book?._id)}
                           className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700">                           
                               Update
                           </button> :  <button onClick={()=> handleUpdate(book?._id)} disabled
                            className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700">                           
                                Update
                            </button>  
                        }
                        {
                           book?.status ==="pending"? <button  onClick={()=> handleCancel(book?._id)}
                                
                                className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700">                           
                                     cancel
                                </button> : <button onClick={()=> handleCancel(book?._id)} disabled
                            className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700">                           
                                 cancel
                            </button> 
                            }
                            
                            <button onClick={()=>document.getElementById('my_modal_1').showModal()}
                            className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700">                           
                                Review
                            </button> 
                        
                   
                    </td>
                </tr>

                    )
                }
            
            </tbody>
        </table>
        {/* review model */}
        <div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg text-center">Give Review </h3>
                <div>
                  <form  method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>  
                <form onSubmit={handleSubmit(onSubmit)}  >
                
                   
                    {/* default value user  */}
                <div className="flex items-center justify-between gap-5">
                    <input
                    type="text"
                    id=""
                    defaultValue={user?.displayName }
                    disabled
                    {...register("giverName")}
                    className="mt-1 p-3  w-full rounded-md border border-gray-200 shadow-sm sm:text-sm"
                />
                    <input
                    type="text"
                    id="UserEmail"
                    defaultValue={user?.photoURL}
                    disabled
                    {...register("giverImage")}
                    className="mt-1 p-3 w-full rounded-md  border border-gray-200 shadow-sm sm:text-sm"
                />
                </div>
                {/* rating and feedback  */}
                <div className="flex items-center justify-between gap-5">
                    {/* Rating out of 5 */}
                <label
                htmlFor="Username" 
                className="relative p-2 m-2 block w-1/2 mx-auto rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                >
                <input
                    type="number"
                    id="Username"
                    {...register("rating",{ required: true, min:1, max: 5 })}
                    className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                    placeholder="Rating out of 5"
                />

                <span
                    className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                >
                   Rating out of 5
                </span>
                </label>

                {/* Feedback */}
                <label
                htmlFor="Username" 
                className="relative p-2 m-4 block w-1/2 mx-auto rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                >
                <input
                    type="text"
                    id="Username"
                    {...register("feedback")}
                    className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                    placeholder="Feedback"
                />

                <span
                    className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                >
                   Feedback
                </span>
                </label>

                </div>
                {/* id and date */}
                <div className=" flex items-center justify-between gap-5 mb-5">
                <input
                    type="text"
                    id="UserEmail"
                    placeholder="Delivery Men Id"
                    disabled
                    {...register("deliveryManId")}
                    className="mt-1 p-3  w-full rounded-md border border-gray-200 shadow-sm sm:text-sm"
                />
                <input
                    type="date"
                    id="UserEmail"
                    {...register("reviewGivingDate")}
                    className="mt-1 p-3  w-full rounded-md border border-gray-200 shadow-sm sm:text-sm"
                />
                
                </div>
 
                    
                <button
                    className="inline-block ml-40  shrink-0 rounded-md  bg-[#146e99] px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-[#146e99] hover:border-none hover:bg-white hover:shadow-lg focus:outline-none focus:ring active:text-blue-500"
                    >
                    submit
                    </button>
                    </form>
                
                </div>
            </div>
            </dialog>
        </div>
        </div>

         </Container>

      
        </div>
    );
};

export default MyParcels;