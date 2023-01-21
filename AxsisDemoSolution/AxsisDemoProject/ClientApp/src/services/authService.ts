import axios from "axios";
import { API_URL } from "./constants";

export const authService = {
    tryToLoginAsync: async (email: string, password: string):Promise<string> => {
        const response = await axios.post(`${API_URL}/session`, {email: email, password: password});

        return response.data;
    },
    tryAuthenticationAsync: async (token: string):Promise<boolean> => {
        const response = await axios.post(`${API_URL}/session/auth`,null, {headers: {Authorization: `Bearer ${token}`}});
        
        return response.status === 200;
    }
}