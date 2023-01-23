import axios from "axios";
import { Session } from "../components/hooks/auth/authProvider";
import { API_URL, authorizationHeader } from "./constants";
import { Token } from "./entities/Token";

export const authService = {
    tryToLoginAsync: async (email: string, password: string):Promise<[Session,boolean]> => {
        let wasUnauthorized = false;
        let data: Session = {accessToken: '', refreshToken: ''};
        await axios.post<{}>(`${API_URL}/session`, {email: email, password: password})
        .then((response)=>{
            data = response.data as Session;
        })
        .catch((error) => {
            if(error.response.status === 401){
                wasUnauthorized = true;
            }
        });

        return [data, wasUnauthorized];
    },
    tryAuthenticationAsync: async (token: string):Promise<boolean> => {
        const response = await axios.post(`${API_URL}/session/auth`,null, authorizationHeader(token));
        
        return response.status === 200;
    }
}