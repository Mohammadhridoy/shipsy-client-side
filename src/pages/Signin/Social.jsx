import { useContext } from 'react';
import { AiOutlineGoogle  } from 'react-icons/ai';
import { DiGithubBadge  } from 'react-icons/di';
import { AuthContext } from '../AuthProvider/AuthProvider';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useNavigate } from 'react-router-dom';


const Social = () => {
    const {googelSingin} = useContext(AuthContext)
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()

    const handlegoogleSign = () =>{
        googelSingin()
        .then(result =>{
            console.log(result.user);
            const userInfo = {
                email: result.user?.email,
                name: result.user?.displayName,
                role:"user"
            }
            axiosPublic.post('/user', userInfo)
            .then(res =>{
                console.log(res.data);
                navigate('/');
            })
        })
    }

    return (
        <div  className="">
     
        <button onClick={handlegoogleSign} className="btn mb-3 btn-outline w-full hover:bg-[#3ea5fe]"> <AiOutlineGoogle></AiOutlineGoogle>  Login with Google</button>
        <button  className="btn btn-outline w-full hover:bg-[#3ea5fe]"> <DiGithubBadge></DiGithubBadge>  Login with Github</button>


        
     </div>
    );
};

export default Social;