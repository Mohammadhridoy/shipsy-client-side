import { createBrowserRouter } from "react-router-dom";
import Root from "../Layouts/Root";
import Home from "../pages/Home/Home";
import Signin from "../pages/Signin/Signin";
import SignUp from "../pages/Signin/SignUp";
import Dashboard from "../pages/Dashboard/Dashboard/Dashboard";
import Myprofile from "../pages/Dashboard/MyProfile/Myprofile";


const Myroutes = createBrowserRouter([
    {
        path:"/",
        element:<Root></Root>,
        children:[
            {
                path:"/",
                element:<Home></Home>
            },
            {
                path:"/signin",
                element:<Signin></Signin>
            },
            {
                path:"/signup",
                element:<SignUp></SignUp>
            }
        ]
    },
    {
        path:'/dashboard',
        element:<Dashboard></Dashboard>,
        children:[
            {
                path:"/dashboard/myprofile",
                element:<Myprofile></Myprofile>
            },
            {

            }
        
        ]
    }


])

export default Myroutes;