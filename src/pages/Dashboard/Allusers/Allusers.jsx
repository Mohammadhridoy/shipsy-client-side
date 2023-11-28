import { Link } from "react-router-dom";
import Container from "../../../Shared/Container";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";


const Allusers = () => {
    const axiosSecure = useAxiosSecure()

    const {data: allusers =[], refetch } =useQuery({
        queryKey:['alluser'],
        queryFn: async() =>{
            const res = await axiosSecure.get('/users')
            return res.data 
        }
    })

    const handleAdmin = (id )=>{
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
                axiosSecure.patch(`/user/admin/${id}`)
                .then(res=>{
                    if(res.data.modifiedCount>0){
                        refetch()
                        console.log(res.data)
                        Swal.fire({
                            title: "Deleted!",
                            text: "you are now admin!",
                            icon: "success"
                          });
                    }
                })

             
            }
          });
        // console.log(id)
      
    }
    const handleDelivery = (id) =>{
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
                axiosSecure.patch(`/user/delivery/${id}`)
                .then(res=>{
                    if(res.data.modifiedCount>0){
                        refetch()
                        console.log(res.data)
                        Swal.fire({
                            title: "Deleted!",
                            text: "you are now delivery man !",
                            icon: "success"
                          });
                    }
                })

             
            }
          });

    }
   

    // const {data: totalBookings=[] }= useQuery({
    //     queryKey: ['totalbookings'],
    //     queryFn: async()=>{
    //         const res = await axiossecure.get(`/bookings?email=${user?.email}`)
    //         return res.data
    //     } ,
    //   })
    //   console.log(totalBookings)

    return (
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
                Number of  parcel <br></br> Booked
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                role
                </th>
                
            </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
                {
                    allusers?.map(alluser =>
                        <tr key={alluser?._id}  className=" pb-4">
                        <td className="whitespace-nowrap px-2 py-2 font-medium text-gray-900">
                        {alluser?.name}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{}</td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{}</td>
                       
                        
                        <td className="whitespace-nowrap px-4 py-2 space-x-3">
                          {
                            alluser?.role === "admin"? "Admin":<Link to='' onClick={()=>handleAdmin(alluser?._id)}
                            className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
    >
                           Admin
                            </Link>
                          }
                            
                            <Link to='' onClick={() =>handleDelivery(alluser?._id)}
                            className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
    >
                             Delivery
                            </Link>
                           
                       
                        </td>
                    </tr>
                        
                        
                        )
                }
                
                 
                        
                        
                        
                        
                
                  

                    
                
            
            </tbody>
        </table>
        </div>

           </Container>
        </div>
    );
};

export default Allusers;