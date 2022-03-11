import {authContext} from '../../Context/AuthProvider/AuthProvider'
import { useContext } from "react";
import { basicUrl } from '../../Services/shirtsService'
import { useNavigate } from 'react-router-dom';


const useLogout = () => {
    const {auth,setAuth} = useContext(authContext); 
    const navigate = useNavigate()

    const logout = async () => {
        setAuth({});
        try {
            await fetch(`${basicUrl}/logout/${auth.id}`).then(() => {
                localStorage.removeItem("jwtToken");
                navigate('/login');
            });
        } catch (err) {
            console.log(err);
        }
    }

    return logout;
}

export default useLogout