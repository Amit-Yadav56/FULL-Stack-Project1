//axios links the frontend and the backend
import axios from 'axios'
//base url of the express sever
const baseUrl = 'http://localhost:4000/'


//We are validating if the user exists
export const validateUser = async (token) => {
    try {
        //api url to get result from backend if userexists
        const res = await axios.get(`${baseUrl}api/users/login`, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
        return res.data;
    } catch (error) {
        console.log(error);
    }
}
