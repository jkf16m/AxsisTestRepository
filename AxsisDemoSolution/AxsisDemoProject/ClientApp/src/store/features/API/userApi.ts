import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { getSession, getSessionState, useAuth } from '../../../components/hooks/auth/authProvider';
import { API_URL } from '../../../services/constants';
import { User, UserProps, UserUpdateInfo, UserUpdateInfoProps } from '../../../services/entities/User';
import { RootState } from '../../app/store';

export interface AddedUserResponse{
    emailAlreadyUsed: boolean;
    idRepeated: boolean;
    validEmail: boolean;
    validPassword: boolean;
    shouldBeAdded: boolean;
}

export interface UpdatedUserResponse{
    bothPasswordsMatched: boolean;
    shouldBeUpdated: boolean;
    wasPasswordEncrypted: boolean;
}

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_URL}/user`,
        prepareHeaders: (headers) => {
            const token = (getSessionState() as any)?.accessToken.accessToken;
            if(token){
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    tagTypes: ['User'],
    endpoints: (builder)=>({
        getUsers: builder.query<User[], void>({
            query: ()=>`/`,

            transformResponse: (res: UserProps[])=>{
                console.log(res);
                return res.map(user => new User(user));
            },
            providesTags: ['User']
        }),
        addUser: builder.mutation<AddedUserResponse, UserProps>({
            query: (body) => ({
                url: `/`,
                method: 'POST',
                body
            }),
            invalidatesTags: ['User'],
            transformResponse: (res: AddedUserResponse)=>{
                return res
            }
        }),
        deleteUser: builder.mutation<boolean, number>({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['User']
        }),
        updateUser: builder.mutation<UpdatedUserResponse, UserUpdateInfoProps>({
            query: (body)=>{
                return {
                    url: `/${body.id}`,
                    method: 'PUT',
                    body
                }
            },
            invalidatesTags: ['User']
        })
    })
})

export const { useGetUsersQuery, useAddUserMutation, useDeleteUserMutation, useUpdateUserMutation } = userApi;