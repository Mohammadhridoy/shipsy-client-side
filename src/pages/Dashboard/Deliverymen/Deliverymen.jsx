import { useQuery } from "@tanstack/react-query";
import Container from "../../../Shared/Container";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";


const Deliverymen = () => {
    const axiosSecure= useAxiosSecure()

    const {data: deliverymans =[]  } =useQuery({
        queryKey:['deliverymans '],
        queryFn: async() =>{
            const res = await axiosSecure.get('/user/deliverman')
            return res.data 
        }
    })
  



    return (
        <div className="py-8">
        <Container>
        <div className="">
     <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
         <thead className="ltr:text-left rtl:text-right">
         <tr>
             <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
             Delivery Man name  
             </th>
             <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Number
             </th>
             <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
             Number of  parcel <br></br> delivered
             </th>
             <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
             review
             </th>
             
         </tr>
         </thead>

         <tbody className="divide-y divide-gray-200">
             
                {
                    deliverymans?.map(man =>  
                    <tr key={man._id}  className=" pb-4">
                    <td className="whitespace-nowrap px-2 py-2 font-medium text-gray-900">
                    {man?.name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{}</td>
                   
                    
                    <td className="whitespace-nowrap px-4 py-2 space-x-3">
                    
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

export default Deliverymen;