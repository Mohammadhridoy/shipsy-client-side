import {  Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo-blue-v2.png"
import Container from "../Container";
import { useContext } from "react";
import { AuthContext } from "../../pages/AuthProvider/AuthProvider";

const Navbar = () => {
    const {user, logOut } = useContext(AuthContext) 
    const handlelogOut = () =>{
        logOut()
    }
    return (    
    <div className=" bg-[#f6f6f9]  mx-auto z-10  lg:py-2 md:sticky top-0  ">
        <Container>
        <div className="navbar  ">
                <div className="navbar-start ">
                    <div className="dropdown">
                        {/* Nav icon link  */}
                    <label tabIndex={0} className="btn btn-ghost lg:hidden ">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 " fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    {/* small device dropdown manu  */}
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box  w-52">
                    <li className="px-3 font-semibold text-3xl text-black dark:bg-white"> <NavLink
                            to="/"
                            className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "" : ""}>
                                    Home
                        </NavLink></li>
                        
                        <div>
                                    <li  className="px-3 font-semibold text-[16px]  text-black dark:bg-white">
                                    <NavLink
                                            to="/works"
                                            className={({ isActive, isPending }) =>
                                                isPending ? "pending" : isActive ? "" : ""}>
                                            How it works
                                        </NavLink>
                                    </li>

                                    <li  className="px-3 font-semibold text-[16px] text-black dark:bg-white">

                                    <NavLink
                                            to="/blog"
                                            className={({ isActive, isPending }) =>
                                                isPending ? "pending" : isActive ? "" : ""}>
                                                
                                                Blog
                                        </NavLink>
                                    </li>   
                                </div>
                        


                    </ul>
                    </div>
                    <div className="flex items-center">
                        <img className="w-10 md:w-20 lg:w-24" src={logo} alt="" />
                    

                    </div>

                </div>
                    

                {/* md and lg device manu */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-2">

                        <li className="px-3 font-semibold text-[16px] text-black"><NavLink
                            to="/" 
                            className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "" : "" } >
                                    Home
                        </NavLink></li>
                        
                            <div className="flex">
                                    <li  className="px-3 font-semibold text-[16px] text-black dark:text-white">
                                    <NavLink
                                            to="/works"
                                            className={({ isActive, isPending }) =>
                                                isPending ? "pending" : isActive ? "" : ""}>
                                           How it works
                                        </NavLink>
                                    </li>

                                    <li  className="px-3 font-semibold text-[16px] text-black dark:text-white">
                                    <NavLink
                                            to="/blog"
                                            className={({ isActive, isPending }) =>
                                                isPending ? "pending" : isActive ? "" : ""}>
                                                Blog
                                        </NavLink>
                                    </li>   
                                </div>
                        

                    </ul>
                </div>

                {/* md and lg device button */}
                {/* TODO: AFTER add login system than user profile */}
                 <div className="navbar-end">
                 {  
                    user ?   <div className="flex">
                        <div className="dropdown dropdown-end pr-4">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar online">
                            <div className="w-10 rounded-full">
                            <img src={user.photoURL} />
                            </div>
                        </label>
                        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar online  ml-[72px] m-3">
                            <div className="w-16 mx-auto rounded-full">
                            <img src={user.photoURL} />
                            </div>
                        </label>
                        <li className="text-center font-semibold pb-2">{user.displayName}</li>
                        
                        <li> <Link to={'/dashboard'} className="font-semibold p-2 text-xl"  > Dashboard</Link></li>
                        <li onClick={handlelogOut} className=" cursor-pointer font-semibold p-2 pt-0 pb-3  text-xl ">Sign Out </li>
                       
                        
                        
                        </ul>
                        </div>
                        
                </div>
                :<div className="">
                    <Link to={"/signin"} >
                    <button className="btn px-5 md:px-5 bg-[#3ea5fe] border-none rounded-3xl text-white hover:bg-[#7484a2] md:shadow-sm text-xs lg:text-[16px] ">Sign In</button>
                    </Link>
                </div>  
                
                
                 }
                
                


                    
                    




                    
                </div> 
         </div>

        </Container>

        


    </div>

    );
};

export default Navbar;