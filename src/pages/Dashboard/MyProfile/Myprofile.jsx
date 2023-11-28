import { useQuery } from "@tanstack/react-query";
import Container from "../../../Shared/Container";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { useForm } from "react-hook-form";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY
const image_hosting_api= `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const Myprofile = () => {
    const {user, loading} = useContext(AuthContext)
    const axiossecure = useAxiosSecure()
    const { register, handleSubmit } = useForm();
    const {data: userinfo=[] }= useQuery({
        queryKey: ['bookinginfo'],
        queryFn: async()=>{
            const res = await axiossecure.get(`/user?email=${user?.email}`)
            return res.data
        } ,
      })
     
     const id = userinfo[0]?._id
      const onSubmit = async data  =>{
    
        const imageFile = {image: data.image[0]}
        console.log(imageFile)
        const res =  await axiossecure.post(image_hosting_api, imageFile,{
            headers:{
                'content-type': 'multipart/form-data'
            }
        })
        
        
        const updated ={
            image: res.data.data.display_url
        }
        
        axiossecure.put(`/user/${id}`, updated)
        .then(res =>{
            if(res.data.modifiedCount>0){
                loading
               console.log(res.data)
             }
        })

      }

      const {data: totalBookings=[] }= useQuery({
        queryKey: ['totalbookings'],
        queryFn: async()=>{
            const res = await axiossecure.get(`/bookings?email=${user?.email}`)
            return res.data
        } ,
      })
     


    return (
        <div className=" py-2 md:py-4 lg:py-8">
            <Container> 
            <h1 className="text-xl font-bold">Hi, Welcome Back!</h1>

            <div className="flex  gap-4 py-4 justify-center items-center" >
                <div >
                <div className="card w-[500px]  bg-base-100 border">
                <div className="card-body flex justify-center items-center">
                <div className="avatar">
                    <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src={userinfo[0]?.image} />
                    </div>
                    </div>
                    <h2 className="card-title pt-4">{userinfo[0]?.name}</h2>
                    <p className="">{userinfo[0]?.email}</p>
                    <form onChange={handleSubmit(onSubmit)} >
                        <input type="file" {...register("image")} className="file-input file-input-bordered w-full max-w-xs mb-4" />
                     </form>
                    
                </div>
                </div>
                </div>
                <div>
                    <div className="card w-[500px] h-80  bg-base-100 border">
                    <div className="card-body ">
                        <p className="text-xl text-center ">Your Activities</p>
                        <h2 className="card-title uppercase pt-2">Bookings: {totalBookings.length}</h2>
                        <h2 className="card-title uppercase pt-4">Reviews:</h2>
                        <h2 className="card-title uppercase pt-4">payment:</h2>
                    </div>
                    </div>

                </div>
            </div>


            </Container>
         
        </div>
    );
};

export default Myprofile;