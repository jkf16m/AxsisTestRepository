import { createSlice } from "@reduxjs/toolkit";
import { Action, Reducer } from "redux";
import { Token } from "../../services/entities/Token";
import tokenService from "../../services/tokenService";

export interface TokenState{
    token: Token;
    failedLogin: boolean;
}

const initialState: TokenState = {
    token: new Token({value: '', expirationDate: new Date()}),
    failedLogin: false
}

export const tokenSlice= createSlice({
    name: 'token',
    initialState,
    reducers: {
        updateToken: (state, action) => {
            state.token = action.payload.token;
            state.failedLogin = action.payload.failedLogin;
        },
        removeToken: (state) => {
            state = initialState;
        }
    }
})

export const tokenActions = tokenSlice.actions;
export default tokenSlice.reducer;




