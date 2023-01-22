import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createReducer } from "@reduxjs/toolkit/dist/createReducer";
import { User } from "../../services/entities/User";

export interface UserCollectionState{
    userCollection: User[];
}

const initialState: UserCollectionState = {
    userCollection: []
}

export const userCollectionSlice = createSlice({
    name: 'userCollection',
    initialState,
    reducers: {
        updateUserCollection: (state, action:PayloadAction<User[]>) => {
            state.userCollection = action.payload;
        },
        updateUser: (state, action:PayloadAction<User>) => {
            state.userCollection = state.userCollection.map(user => {
                if(user.props.id === action.payload.props.id){
                    return action.payload;
                }
                return user;
            });
        }
    }
});

export const userCollectionActions = userCollectionSlice.actions;

export default userCollectionSlice.reducer;
