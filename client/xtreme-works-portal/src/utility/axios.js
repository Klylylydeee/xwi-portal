// NPM Dependencies
import Axios from "axios";

// Axios for Protected Routes/Components
export const axiosAPI = Axios.create({
    //baseURL: process.env.REACT_APP_API_URL,
    baseURL: "http://localhost:3400",
    headers: {
        Authorization: {
            toString () {
                return `Bearer ${localStorage.getItem('Authorization')}`
            }
        }
    }
});