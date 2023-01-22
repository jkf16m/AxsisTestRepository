import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { API_URL } from '../../../services/constants';
import { RootState } from '../../app/store';
export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_URL}/api/user`,
        prepareHeaders: (headers, {getState}) => {
            const token = (getState() as RootState).sessionApi.mutations.tryToLogin
            if(token){
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    endpoints: (builder)=>({
    })
})