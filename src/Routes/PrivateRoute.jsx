import PropTypes from 'prop-types';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../pages/AuthProvider/AuthProvider';

const PrivateRoute = ({children}) => {

    const {user, loading}= useContext(AuthContext)

    const location = useLocation()
    

    if(loading){
        return <div className="w-96 mx-auto my-11 "><span className="loading loading-spinner  text-32 p-20 loading-lg"></span> </div>
       
      
     }
     
     if(user){
         return children; 
     }



     return <Navigate to={"/signin"} state={{from:location}} replace></Navigate>;
};

PrivateRoute.propTypes = {
    children:PropTypes.node
    
}

export default PrivateRoute;