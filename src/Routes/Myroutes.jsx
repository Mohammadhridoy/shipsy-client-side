import { createBrowserRouter } from "react-router-dom";
import Root from "../Layouts/Root";
import Home from "../pages/Home/Home";
import Signin from "../pages/Signin/Signin";
import SignUp from "../pages/Signin/SignUp";
import Dashboard from "../pages/Dashboard/Dashboard/Dashboard";
import Myprofile from "../pages/Dashboard/MyProfile/Myprofile";
import Bookparcel from "../pages/Dashboard/BookParcel/Bookparcel";
import MyParcels from "../pages/Dashboard/MyParcels/MyParcels";
import Blog from "../pages/Blog/blog";
import PrivateRoute from "./PrivateRoute";
import UpdateParcels from "../pages/Dashboard/MyParcels/UpdateParcels";
import Allparcels from "../pages/Dashboard/Allparcels/Allparcels";
import Allusers from "../pages/Dashboard/Allusers/Allusers";
import MyDeliveryList from "../pages/Dashboard/MyDeliveryList/MyDeliveryList";
import Deliverymen from "../pages/Dashboard/Deliverymen/Deliverymen";


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
            },
            {
                path:"/blog",
                element: <PrivateRoute><Blog></Blog> </PrivateRoute> 
            }
        ]
    },
    {
        path:'/dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children:[
            {
                path:"/dashboard/myprofile",
                element:<Myprofile></Myprofile>
            },
            {
                path:"/dashboard/bookparcel",
                element: <Bookparcel></Bookparcel>
            },
            {
                path:"/dashboard/myparcel",
                element: <MyParcels></MyParcels>
            },
            {
                path:"/dashboard/updateparcels/:id",
                element: <UpdateParcels></UpdateParcels>,
                loader: ({params}) => fetch(`http://localhost:5000/bookings/${params.id}`)
            },
            // admin routes 
            {
                path:"/dashboard/allparcels",
                element: <Allparcels></Allparcels>
            },
            {
                path:"/dashboard/allusers",
                element: <Allusers></Allusers>
            },
            {
                path:"/dashboard/deliverymen",
                element: <Deliverymen></Deliverymen>
            },
            // deliver men routes 
            {
                path:"/dashboard/deliverylist",
                element: <MyDeliveryList></MyDeliveryList>
            }
        
        ]
    }


])

export default Myroutes;