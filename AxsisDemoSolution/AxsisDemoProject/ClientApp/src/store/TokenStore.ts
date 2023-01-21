import { Action, Reducer } from "redux";
import { Token } from "../services/entities/Token";

export interface TokenState{
    token: Token;
}

export interface UpdateTokenAction {
    type: 'UPDATE_TOKEN',
    token: Token
}

type TokenAction = UpdateTokenAction;

export const actionCreators = {
    updateToken: (token: Token) => ({ type: 'UPDATE_TOKEN', token}) as UpdateTokenAction
}

export const reducer: Reducer<TokenState> = (state: TokenState | undefined, incomingAction: Action)=>{
    if (state === undefined){
        return {token: new Token({value: '',expires_at: new Date()})}
    }
    const action = incomingAction as TokenAction;
    switch(action.type){
        case 'UPDATE_TOKEN':
            return {...state, token: action.token};
        default:
            return state;
    }
};