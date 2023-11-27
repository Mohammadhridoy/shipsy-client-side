import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Social from './Social';
import { useForm } from "react-hook-form";
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useContext } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { updateProfile } from 'firebase/auth';
import Swal from 'sweetalert2';
import auth from '../../Firebase/Firebase';





const SignUp = () => {
    const navigate = useNavigate()
    const {createUser} = useContext(AuthContext)
    
    const axiosPublic = useAxiosPublic()
    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) =>{

        console.log(data)

        createUser(data.email, data.password)
        .then(result =>{
        console.log(result.user)

        updateProfile(auth.currentUser,{
            
            displayName: data.name, photoURL: data.photoURL
          })
    .then(() => {
        const userData = {
            name: data.name,
            email: data.email,
            role: data.usertype

        }
        axiosPublic.post("/user", userData)
        .then(res=>{
            console.log(res)
            if(res.data.insertedId){
                console.log('user added to the database ')
                reset()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your work has been saved",
                    showConfirmButton: false,
                    timer: 1500
                  });
                navigate('/')
            }
        })

        
      }).catch((error) => {
       console.log(error.message)
      });
        
      
     
         })



         
  
        
        
    }


    return (
        <div>
               <div>
             <div className=" lg:w-[1400px] mx-auto ">
                

<form  onSubmit={handleSubmit(onSubmit)}

        className="mb-14 mt-14 bg-white  w-96 mx-auto space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
        >
        <p className="text-center text-lg font-medium text-black">Create your account</p>
        {/* Avater */}
     

        <div>
            {/* Name section */}
        
            <input
                 {...register("name")}
                type="text"
                className="w-full rounded-lg border-gray-200 p-4 mb-4 pe-12 text-sm shadow-sm hover:shadow-md "
                placeholder="Enter your name.." required name="name"
            />

                {/* Image section */}
            
            <input
                type="text"
                {...register("photoURL",{required:true})}
                className="w-full rounded-lg border-gray-200 p-4 mb-4 pe-12 text-sm shadow-sm hover:shadow-md"
                placeholder="Profile image... "
            />
                {/* user type */}
                <select defaultValue="default"  {...register("usertype")} className="select select-bordered w-full max-w-xs mb-4">
                <option value="default" >Select user type</option>
                <option value="user" >User</option>
                <option value="DeliveryMen">DeliveryMen</option>
                </select>

            {/* email section */}
            <label htmlFor="email" className="sr-only">Email</label>

            <div className="relative">
            <input
                {...register("email")} 
                type="email"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm hover:shadow-md"
                placeholder="Enter email" required name="email"
            />
            {errors.email?.type === 'required' && <p className='text-red-600'>email is required</p>}
            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
                </svg>
            </span>

            </div>
        </div>

        <div>
            {/* password */}
            <label htmlFor="password" className="sr-only ">Password</label>

            <div className="relative">
            <input
                {...register("password", { 
                    
                    required:true,
                    minLength:6,
                    maxLength: 20,
                    pattern: /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/ 
                })}
                type="password"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm hover:shadow-md"
                placeholder="Enter password" name="password" required
            />
            {errors.password?.type === 'required' && <p className='text-red-600'>Passsword is required</p>}
            {errors.password?.type === 'minLength' && <p className='text-red-600'>Passsword must be 6 characters</p>}
            {errors.password?.type === 'maxLength' && <p className='text-red-600'>Passsword must be less than 20 characters</p>}
            {errors.password?.type === 'pattern' && <p className='text-red-600'>Password must have one Uppercase one lower case, one number and one special character.</p>}
            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
                </svg>
            </span>
            
            </div>
        </div>

        {/* team and conditoin section */}
        <input
                required
                type="checkbox"
                name="accept"
                className="h-4 w-4 rounded-md border-gray-200 bg-white shadow-sm" 
            />
            <span className="text-[16px] text-black ml-3">
                Accept our terms and conditions.
            </span>
        
        <h1 className='text-2xl text-center'> Or</h1>
        <Social></Social>

        <button
            type="submit"
            className="block w-full rounded-lg bg-white px-5 py-3 text-sm font-medium text-black hover:bg-[#3ea5fe] hover:shadow-lg hover:text-white"
        >
            SIGN UP
        </button>
        


        <p className="text-center text-[16px] text-black">
        Already have an account? 
            <Link className=" pl-1 text-xl font-bold text-[#3ea5fe]" to={"/signin"}>LOGIN</Link>
        </p>
         

    
    </form>




</div>
            
        </div>
            
        </div>
    );
};

export default SignUp;