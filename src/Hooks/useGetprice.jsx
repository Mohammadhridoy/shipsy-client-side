import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../pages/AuthProvider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";


const useGetprice = () => {
    const {user} = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()

    const {  data: bookings = [] } = useQuery({
        queryKey: ['bookinginfos' , user?.email],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/bookings?email=${user?.email}`)
            return res.data
        } 
      })
      const totalPrice = bookings.reduce((total, item)=> total +item.price,0)
   

    return totalPrice; 
};

export default useGetprice;