import { Link } from "react-router-dom";
import Container from "../../../Shared/Container";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";


const Allparcels = () => {

    const axiosSecure = useAxiosSecure()

    const {data: allparcelsInfos = []} = useQuery({
        queryKey:["allparels"],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/bookings`)
            return res.data
        }
    })


    return (
        <div>
            <div className="py-8">
         <Container>
         <div className="overflow-x-auto">
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
                      
                        <Link to={`/dashboard/}`}
                        className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
>
                        Manage
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
        </div>
    );
};

export default Allparcels;