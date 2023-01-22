import axios from "axios";
import { API_URL, authorizationHeader } from "./constants";
import { Token } from "./entities/Token";

export const authService = {
    tryToLoginAsync: async (email: string, password: string):Promise<Token> => {
        const response = await axios.post(`${API_URL}/session`, {email: email, password: password});
        let token = new Token({value: response.data.token, expirationDate: new Date(response.data.expirationDate)});
        return response.data;
    },
    tryAuthenticationAsync: async (token: string):Promise<boolean> => {
        const response = await axios.post(`${API_URL}/session/auth`,null, authorizationHeader(token));
        
        return response.status === 200;
    }
}