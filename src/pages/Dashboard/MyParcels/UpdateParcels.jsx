import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";


const UpdateParcels = () => {
    const axiossecure = useAxiosSecure()
    const bookings = useLoaderData()
    
    const { register, handleSubmit } = useForm();
    

    const {  _id,
        userNumber,
        parcelType,
        parcelWeight,
        receiverName,
        receiverNumber,
        deliveryAddress,
        latitude,
        longitude,
        requestedDeliveryDate, price }  = bookings || { }



    const onSubmit = data => {
        
        axiossecure.put(`/bookings/${_id}`, data)
        .then(res =>{
            if(res.data.modifiedCount>0){
                Swal.fire({
                    title: 'Success!',
                    text: ' Updated successfully ',
                    icon: 'success',
                    confirmButtonText: 'OK'
                  })
             }
        })
         
    
    }
    return (
        <div>
            <section className="">
        <div className=" w-[1000px]   ">

            {/* left form section  */}
            <main 
            // className=" flex items-center justify-center px-4 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
            className=" flex items-center  px-4   lg:mx-auto  lg:py-10  "
            >
            <div className="w-[800px] mx-auto ">
               

                <h1
                className=" mr-32 text-2xl font-bold text-gray-900 lg:text-center sm:text-3xl md:text-4xl"
                >
                Update parcel information
                </h1>

                

                <form onSubmit={handleSubmit(onSubmit)}  className="mt-8 space-y-3 md:space-y-6  ">
                 
                 <div className="flex gap-10  w-full">
                 <div>
                        <label htmlFor="HeadlineAct" className="block text-sm font-medium text-gray-900">
                        Phone Number
                        </label>

                        <input
                    type="text"
                    id="Name"
                    defaultValue={userNumber}
                    name="foodname"
                    {...register("number")}
                    className="mt-1 w-[300px]  rounded-md  bg-white text-sm text-gray-700  p-2  border border-[#146e99] shadow-md"
                    />
                </div>
                  

                     
                 <div>
                        <label htmlFor="HeadlineAct" className="block text-sm font-medium text-gray-900">
                        Parcel Type

                        </label>
                        <input
                    type="text"
                    id="Name"
                    defaultValue={parcelType}
                    name="category"
                    {...register("parceltype")}
                    className="mt-1 w-[300px]  rounded-md  bg-white text-sm text-gray-700  p-2  border border-[#146e99]  shadow-md"
                    />

                    
                </div>
                 </div>
                  {/* type option section end */}


                <div className="flex gap-10  w-full ">
                <div className="col-span-6 sm:col-span-3">
                    <label
                    htmlFor="Name"
                    className="block text-sm font-medium text-gray-700"
                    >
                    Parcel Weight
                    </label>

                    <input
                    
                    type="text"
                    id="Name"
                    name="weight"
                    disabled
                    defaultValue={parcelWeight}
                    className="mt-1 w-[300px]  rounded-md  bg-white text-sm text-gray-700  p-2  border border-[#146e99]  shadow-md"
                    />
                </div>

                <div className="col-span-6 sm:col-span-3 " >
                    <label
                    htmlFor="image"
                    className="block text-sm font-medium text-gray-700"
                    >
                    Receivers Name
                    </label>

                    <input
                    type="text"
                    id="image"
                    name="image"
                    defaultValue={receiverName}
                    {...register("receivername")}
                    className="mt-1 w-[300px] rounded-md  p-2  border border-[#146e99] shadow-md bg-white text-sm text-gray-700 "
                    />
                </div>
                </div>

                <div className="flex gap-10  w-full">
                <div className="col-span-6">
                    <label htmlFor="Price" className="block text-sm font-medium text-gray-700">
                    Receivers Phone Number
                    </label>

                    <input
                    type="text"
                    id="Price"
                    name="price"
                    defaultValue={receiverNumber}
                    {...register("receiversnumber")}
                    className="mt-1 w-[300px]  rounded-md  bg-white text-sm text-gray-700  p-2  border border-[#146e99]  shadow-md"
                    />
                </div>

                <div className="col-span-6 sm:col-span-3">
                    <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                    >
                   Parcel Delivery Address

                    </label>

                    <input
                    type="text"
                    id="description"
                    name="description"
                    defaultValue={deliveryAddress}
                    {...register("address")}
                    className="mt-1 w-[300px]  rounded-md  bg-white text-sm text-gray-700  p-2  border border-[#146e99]  shadow-md"
                    />
                </div>
                </div>        

               

                <div className="flex gap-10  w-full">
                <div className="col-span-6 sm:col-span-3">
                    <label
                    htmlFor="Rating"
                    className="block text-sm font-medium text-gray-700"
                    >
                    Requested Delivery Date
                    </label>
                    

                    <input
                    type="date"
                    id="Rating"
                    name="origin"
                    defaultValue={
                        requestedDeliveryDate}
                    {...register("requestedDeliveryDate")}
                    className="mt-1  w-[300px] rounded-md  bg-white text-sm text-gray-700  p-2  border border-[#146e99]  shadow-md"
                    />
                </div>
                <div className="col-span-6 sm:col-span-3">
                    <label
                    htmlFor="Rating"
                    className="block text-sm font-medium text-gray-700"
                    >
                    Delivery Address Latitude
                    </label>

                    <input
                    type="text"
                    id="Rating"
                    name="origin"
                    defaultValue={latitude}
                    {...register("latitude")}
                    className="mt-1  w-[300px] rounded-md  bg-white text-sm text-gray-700  p-2  border border-[#146e99]  shadow-md"
                    />
                </div>

                </div>

               
                <div className="flex gap-10  w-full">
                <div className="col-span-6 sm:col-span-3">
                    <label
                    htmlFor="Rating"
                    className="block text-sm font-medium text-gray-700"
                    >
                    Delivery Address longitude
                    </label>

                    <input
                    type="text"
                    id="Rating"
                    name="origin"
                    defaultValue={longitude}
                    {...register("logitude")}
                    className="mt-1  w-[300px] rounded-md  bg-white text-sm text-gray-700  p-2  border border-[#146e99] shadow-md"
                    />
                </div>
                <div className="col-span-6 sm:col-span-3">
                    <label
                    htmlFor="Rating"
                    className="block text-sm font-medium text-gray-700"
                    >
                    Price
                    </label>

                    <input
                    type="text"
                    id="price"
                    defaultValue={price}
                    disabled
                    name="origin"
                    className="mt-1  w-[300px] rounded-md  bg-white text-sm text-gray-700  p-2  border border-[#146e99]  shadow-md"
                    />
                </div>

                </div>
             
               

                <div className="col-span-6 sm:flex sm:items-center sm:gap-4 ml-64">
                
                    <button
                    className="inline-block shrink-0 rounded-md  bg-[#146e99] px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-[#146e99] hover:border-none hover:bg-white hover:shadow-lg focus:outline-none focus:ring active:text-blue-500"
                    >
                     Update
                    </button>
                   
                </div>
                </form>
            </div>
            </main>
        </div>
        </section>
           
        </div>
    );
};

export default UpdateParcels;