import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../pages/AuthProvider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";


const useAdmin = () => {
    const {user } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()

    const {data: isAdmin} = useQuery({
        queryKey: [user?.email, 'Admin'],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/user/admin/${user?.email}`) 
            return res.data?.admin
        }
    })

    return [isAdmin]
};

export default useAdmin;