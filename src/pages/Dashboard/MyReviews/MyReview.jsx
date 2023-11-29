import { useContext } from "react";
import Container from "../../../Shared/Container";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const MyReview = () => {

    const {user} = useContext(AuthContext)
    const axiosSecure= useAxiosSecure()
    const {data: reviewInfo = [] } = useQuery(
        {
            queryKey: ["review"],
            queryFn: async()=>{
                const res = await axiosSecure.get(`/reviews/${user?.email}`)
                return res.data
            }
        }
    )
    console.log(reviewInfo)


    return (
        <div className="py-8 w-[700px] mx-auto">
           <Container>
            {
                reviewInfo?.map(review => <div key={review._id} className="w-4/5 pb-6   ">
                <article
                className="flex justify-between items-center gap-4 rounded-lg border border-gray-100 bg-[#faf9f5]  p-6"
                >
                    <div className="flex items-center gap-4 ">
                    <span className="rounded-full ">
                    <img className="w-20 h-20 rounded-md" src={review.giverImage}  alt="" />

                    </span>
                    <div>
                        <p className="text-2xl font-medium text-gray-900">{review.giverName}</p>
                        <p className="text-sm ">{review.reviewGivingDate}</p>
        
                        <p className="text-sm text-red-400">{review.rating} (out of 5)</p>
                    </div>

                    </div>
                    <div>
                        <p className="text-sm text-gray-400">{review.feedback} </p>
                    </div>
               
    
              
         
                </article>

               
    
                </div>
                    
                    
                    )
            }
     
           </Container>
        </div>
    );
};

export default MyReview;