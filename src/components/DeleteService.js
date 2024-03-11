import axios from "axios"
import { useNavigate } from "react-router-dom";

function deleteService({ _id}){
    const API_URL = process.env.REACT_APP_SERVER_URL;
    
    const storeToken = localStorage.getItem('authToken');

    const navigate = useNavigate

        axios
          .delete(`${API_URL}/api/services/${_id}`, { headers: { Authorization: `Bearer ${storeToken}` } })
            .then(() => {
              navigate("/myService")
            })
            .catch(e => console.log("error to delete", e));      
}
    
export default deleteService;