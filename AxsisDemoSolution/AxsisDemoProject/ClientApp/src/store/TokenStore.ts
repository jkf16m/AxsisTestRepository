import { Action, Reducer } from "redux";
import { Token } from "../services/entities/Token";

export interface TokenState{
    token: Token;
    failedLogin: boolean;
}

export interface UpdateTokenAction {
    type: 'UPDATE_TOKEN',
    payload: TokenState
}

type TokenAction = UpdateTokenAction;

export const actionCreators = {
    updateToken: (payload: TokenState) => ({ type: 'UPDATE_TOKEN', payload}) as UpdateTokenAction
}

export const reducer: Reducer<TokenState> = (state: TokenState | undefined, incomingAction: Action)=>{
    if (state === undefined){
        return {token: new Token({value: '',expires_at: new Date()}),failedLogin: false}
    }
    const action = incomingAction as TokenAction;
    switch(action.type){
        case 'UPDATE_TOKEN':
            return {...state, token: action.payload.token, failedLogin: action.payload.failedLogin};
        default:
            return state;
    }
};