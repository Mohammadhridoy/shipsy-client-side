import { Link, Outlet } from "react-router-dom";
import logo from '../../../assets/logo-blue-v2.png'
import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const Dashboard = () => {
    const {user } = useContext(AuthContext)

    return (
        <div className="flex "> 
            {/* left side */}
             <div  >
                <div className="flex w-72 min-h-screen flex-col justify-between border-e bg-white">
                <div className="px-4 py-6">
                    <span
                    className="grid h-10 w-32 place-content-center rounded-lg text-xs text-gray-600"
                    >
                    <img src={logo} alt="" />
                    </span>
                    {/* user manus */}
                    <ul className="mt-6 space-y-1">
                    <>
                    <li>
                        <Link className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700" to="/dashboard/myprofile">
                         My Profile </Link>
        
                    </li>


                    <li>
                        
                        <Link className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700" to="/dashboard/bookparcel">
                        Book a Parcel </Link>
                    </li>

                    <li>
                        <Link className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700" to="/dashboard/myparcel">
                        My Parcels</Link>
                    </li>
                    </>

                    {/* user manus end  */}
                    
                    <li className="pt-10">
                    <div className="divider">or</div>
                        <Link className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700" to="/">
                        Home</Link>
                    </li>

                    </ul>
                    


                </div>

                <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
                    <a href="#" className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">
                    <img
                        alt="Man"
                        src={user?.photoURL}
                        className="h-10 w-10 rounded-full object-cover"
                    />

                    <div>
                        <p className="text-xs">
                        <strong className="block font-medium">{user?.displayName}</strong>

                        <span>{user?.email}</span>
                        </p>
                    </div>
                    </a>
                </div>
                </div>
             </div>
            {/* right side */}
            <div >
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;