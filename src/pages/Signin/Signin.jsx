import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Social from "./Social";


const Signin = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const {singInUser} = useContext(AuthContext)
    const from = location.state?.from?.pathname || "/"

    const { register, handleSubmit, formState: { errors } } = useForm()
  const onSubmit = (data) =>{ 
    
    

    singInUser(data.email, data.password)
        .then(result =>{
            console.log(result.user) 
            navigate(from, {replace:true})    
        })
        .catch(error => {
            console.log(error.message)
            toast.error(`${error.message}`,{
                position:"bottom-right",
                autoClose:2000,
            })
        })

    
}

    return (
        <div className="mt-14 mb-14 bg-gray-300  w-96 mx-auto shadow-lg rounded-md">
            
            <form onSubmit={handleSubmit(onSubmit)}
  
    className=" space-y-4 rounded-lg p-4  sm:p-6 lg:p-8"
    >
    <p className="text-center text-lg font-medium text-white">Sign In</p>

    <div>
        <label htmlFor="email" className="sr-only">Email</label>

        <div className="relative">
        <input
            
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Enter your email" 
            {...register("email", { required: true })}
            aria-invalid={errors.mail ? "true" : "false"}
        />

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
        <label htmlFor="password" className="sr-only">Password</label>

        <div className="relative">
        <input
            type="password"
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Enter password" name="password" 
             {...register("password", { required: true })}
        />

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
    

    <button
        type="submit"
        className="block w-full rounded-lg bg-gray-300 px-5 py-3 text-sm font-medium text-white shadow-lg hover:bg-[#3ea5fe]"
    >
        Sign In 
    </button>



    <p className="text-center text-xl text-white">
        No account?
        <Link className=" pl-1 text-xl font-bold text-[#3ea5fe]" to={"/signup"}> SING UP</Link>
    </p>

    
    </form>
    <div className="sm:p-6 lg:p-8 lg:pt-0" >
    <Social></Social>
    </div>
    
    <ToastContainer></ToastContainer>



        </div>
    );
};

export default Signin;