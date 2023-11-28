import { useContext, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { useForm } from "react-hook-form";
import moment from 'moment';
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Bookparcel = () => {
    const [price, setPrice] = useState(null)
    const [weight, setWeight ] = useState(null)
    const { register, handleSubmit, reset } = useForm();
    const {user} = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()

    const handleWeight =(e) =>{
        e.preventDefault()
        const weight = e.target.value
        console.log(weight)
        const numberWeight = parseInt(weight)
        setWeight(numberWeight)
        if( numberWeight === 1){
            setPrice(50)
        }else if(numberWeight === 2 ){
            setPrice(100)
        }else if(numberWeight >2){
            setPrice(150)
        }
    }
    
  
    const bookingDate = moment().format('MM-D-YYYY')

    

    const onSubmit = data => {
        console.log(data)
        const bookinginfo ={
            userName : user?.displayName,
            userEmail: user?.email,
            userNumber: data?.number,
            parcelType: data?.parceltype,
            parcelWeight: weight,
            receiverName: data?.receivername,
            receiverNumber: data?.receiversnumber,
            deliveryAddress: data?.address,
            bookingDate: bookingDate,
            latitude: data?.latitude,
            longitude: data?.logitude,
            requestedDeliveryDate: data?.date,
            price: price,
            status: "pending" 
            
        }
        console.log(bookinginfo)

        axiosSecure.post("/bookings", bookinginfo)
        .then(res =>{
            if(res.data.insertedId){
                reset()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Parcel booked successfully",
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        })

    };


    return (
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
                Book a parcel
                </h1>

                

                <form onSubmit={handleSubmit(onSubmit)}  className="mt-8 space-y-3 md:space-y-6  ">
                <div className="flex gap-10  w-full">
                    <div>
                            <label htmlFor="HeadlineAct" className="block text-sm font-medium text-gray-900">
                                User Name
                            </label>

                            <input
                        type="text"
                        id="Name"
                        disabled
                        name="username"
                        {...register("username")}
                        defaultValue={user?.displayName}
                        className="mt-1 w-[300px]  rounded-md  bg-white text-sm text-gray-700  p-2  border border-[#146e99] shadow-md"
                        />
                    </div>
                    <div>
                            <label htmlFor="HeadlineAct" className="block text-sm font-medium text-gray-900">
                                User Email
                            </label>

                            <input
                        type="email"
                        id="Name"
                        name="useremail"
                        defaultValue={user?.email}
                        disabled
                        {...register("email")}
                        className="mt-1 w-[300px]  rounded-md  bg-white text-sm text-gray-700  p-2  border border-[#146e99]  shadow-md"
                        />
                    </div>
                </div>
                 
                 <div className="flex gap-10  w-full">
                 <div>
                        <label htmlFor="HeadlineAct" className="block text-sm font-medium text-gray-900">
                        Phone Number
                        </label>

                        <input
                    type="text"
                    id="Name"
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
                    onChange={handleWeight}
                    type="text"
                    id="Name"
                    name="weight"
                 
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
                    {...register("date")}
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
                    {...register("price")}
                    name="origin"
                    className="mt-1  w-[300px] rounded-md  bg-white text-sm text-gray-700  p-2  border border-[#146e99]  shadow-md"
                    />
                </div>

                </div>
             
               

                <div className="col-span-6 sm:flex sm:items-center sm:gap-4 ml-64">
                
                    <button
                    className="inline-block shrink-0 rounded-md  bg-[#146e99] px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-[#146e99] hover:border-none hover:bg-white hover:shadow-lg focus:outline-none focus:ring active:text-blue-500"
                    >
                    Book
                    </button>
                   
                </div>
                </form>
            </div>
            </main>
        </div>
        </section>
    );
};

export default Bookparcel;