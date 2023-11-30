import { useContext, useState } from "react";
import Container from "../../../Shared/Container";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'


const MyDeliveryList = () => {
    const {user} = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()


    // get all data 
    const {data: deliveryinfo=[], refetch } = useQuery({
        queryKey: ['delivery'],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/bookings/deliverinfo/${user?.email}`)
                return res.data
        }
    })

    // console.log(deliveryinfo)
    // get cancel data 
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
                axiosSecure.patch(`/bookings/cancel/${id}`)
                .then(res=>{
                    if(res.data.modifiedCount>0){
                        refetch()
                        console.log(res.data)
                        Swal.fire({
                            title: "Cencel!",
                            text: "status update sucecssfully!",
                            icon: "success"
                          });
                    }
                })

             
            }
          });
    }
    // get delivery data 
    const  handleDelivery = (id) =>{
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
                axiosSecure.patch(`/bookings/delivery/${id}`)
                .then(res=>{
                    if(res.data.modifiedCount>0){
                        refetch()
                        console.log(res.data)
                        Swal.fire({
                            title: "Delivery!",
                            text: "status update sucecssfully!",
                            icon: "success"
                          });
                    }
                })

             
            }
          });
    }
    // maps
    const [latitude, setlatitude ] = useState(null)
    const [longitude, setlongitude] = useState(null)
    console.log(latitude)
    console.log(longitude)
    if(!latitude){
        setlatitude('23.82682415638264')
    }
    if(!longitude){
        setlongitude('90.37358678030925')
    }
    const handleLocation = (latitude, longitude ) =>{
        setlatitude(latitude)
        setlongitude(longitude)
        document.getElementById('my_modal_1').showModal()
    }

    return (
        <div className="py-8">
        <Container>
        <div className="">
       <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
           <thead className="ltr:text-left rtl:text-right">
           <tr>
               <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
               Booked Users <br></br> name  
               </th>
               <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
               Receivers <br></br> users name
               </th>
               <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
               Booked Users <br></br> phone 
               </th>
               <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
               Requestes <br></br> Delivery Date
               </th>
               <th className="px-4 py-2">
               Approximate <br></br> Delivery Date
               </th>
               <th className="px-4 py-2">
               Recievers<br></br> phone number
               </th>
               <th className="px-4 py-2">
               Receivers Address
               </th>
               <th className="px-4 py-2">
               
               </th>
           </tr>
           </thead>

           <tbody className="divide-y divide-gray-200">
            {
                deliveryinfo?.map(info => 
                    <tr key={info._id} className=" pb-4">
                   <td className="whitespace-nowrap px-2 py-2 font-medium text-gray-900">
                   {info.userName}
                   </td>
                   <td className="whitespace-nowrap px-4 py-2 text-gray-700">{info.receiverName}</td>
                   <td className="whitespace-nowrap px-4 py-2 text-gray-700">{info.userNumber}</td>
                   <td className="whitespace-nowrap px-4 py-2 text-gray-700">{info.requestedDeliveryDate}</td>
                   <td className="whitespace-nowrap px-4 py-2 text-gray-700">{info.approximateDeliveryDate}</td>
                   <td className="whitespace-nowrap px-4 py-2 text-gray-700">{info.receiverNumber}</td>
                   
                   <td className="whitespace-nowrap px-4 py-2 space-x-3">
                      <button onClick={()=> handleLocation(info?.latitude, info?.longitude)}
                       className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
> 
                       Location
                       </button>

                       <button onClick={()=> handleCancel(info._id)}
                       className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
> 
                       Cancel
                       </button>
                       {
                        info.status==="delivered"? <button disabled
                        className="inline-block rounded bg-gray-400 px-4 py-2 text-xs font-medium text-white "
 > 
                        Delivery
                        </button>:<button onClick={()=> handleDelivery(info._id)}
                       className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
> 
                       Delivery
                       </button> 
                       }
  

                       

                      
                  
                   </td>
               </tr>
                    
                    
                    )
            }
                
                       
                       
                               
           
           </tbody>
       </table>
       {/* model */}
       <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
                
                <div className="w-[600px] h-[400px]">
                  <form  method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <MapContainer center={[latitude, longitude]} zoom={13} scrollWheelZoom={false}>
                    <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[latitude, longitude]}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                    </Marker>
                </MapContainer>
                
                </div>
            </div>
            </dialog>
       </div>
       {/* open model  */}
     
           
        </Container>

     
       </div>
    );
};

export default MyDeliveryList;