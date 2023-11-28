import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../pages/AuthProvider/AuthProvider";


const useDelivery = () => {
    const axiosSecure= useAxiosSecure()
    const {user} = useContext(AuthContext)
    const {data: delivery } = useQuery({
        queryKey: [user?.email, 'delivery'],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/user/delivery/${user?.email}`)
            return res.data?.delivery
        }
    })
    return [delivery];
};

export default useDelivery;