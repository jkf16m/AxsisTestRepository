import axios from "axios";
import { API_URL, authorizationHeader} from "./constants";
import { User } from "./entities/User";


const userService = {
    // uses the token -> then adds the user to the database
    // after using the token -> updates the token
    addUserAsync: async (user: User, token: string):Promise<string> => {
        const response = await axios.post(`${API_URL}/users`, user.props, authorizationHeader(token));
        return response.data;
    }
}
export default userService;