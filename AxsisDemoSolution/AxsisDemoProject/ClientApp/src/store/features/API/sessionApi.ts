import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import { API_URL } from "../../../services/constants";
import { Token } from "../../../services/entities/Token";
import { RootState } from "../../app/store";

interface AccessCredentials{
    email: string;
    password: string;
}

interface TokenCredentials{
    email: string;
    token: Token;
}

export const sessionApi = createApi({
    reducerPath: 'sessionApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_URL}/api/session`,
        prepareHeaders: (headers, {getState}) => {
            const token = (getState() as RootState)
            if(token){
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    endpoints: (builder)=>({
        tryToLogin: builder.mutation<Token,AccessCredentials>({
            query: (body) => ({
                url:'/',
                method: 'POST',
                body: {email: body.email, password: body.password}
            }),
            transformResponse: (response: {token: string, expirationDate: string}) => {
                return new Token({value: response.token, expirationDate: new Date(response.expirationDate)});
            }
        }),
        tryAuthentication: builder.query<boolean, Token>({
            query: (token) => ({
                url: '/auth',
                method: 'POST',
                headers: {
                    authorization: `Bearer ${token}`
                }
            }),
            transformResponse: (response) => {
                return true;
            }
        }),
        consume: builder.mutation<string, TokenCredentials>({
            query: (body)=>({
                url: '/',
                method: 'PUT',
                body: {
                    email: body.email,
                    token: body.token.props.value
                }
            }),
            transformResponse: (response:string) => {
                return response;
            }
        }),
        logout: builder.mutation<boolean, TokenCredentials>({
            query: (body) => ({
                url: '/',
                method: 'DELETE',
                body: {
                    email: body.email,
                    token: body.token.props.value
                }
            }),
            transformResponse: (response:string) => {
                if(response){
                    return true;
                }
                return false;
            }
        }),

    })
})

export const sessionApiReducer = sessionApi.reducer;