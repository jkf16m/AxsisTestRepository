export const API_URL="https://localhost:44307/api";

export const authorizationHeader = (token: string) => {
    return {headers: {Authorization: `Bearer ${token}`}};
}