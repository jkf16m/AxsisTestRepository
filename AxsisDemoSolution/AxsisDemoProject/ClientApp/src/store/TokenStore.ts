import { Action, Reducer } from "redux";
import { Token } from "../services/entities/Token";
import tokenService from "../services/tokenService";

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
        // here we get the token from the cookie (if there is one)
        let storedToken = tokenService.getSessionToken();
        return {token: new Token({...storedToken.props}),failedLogin: false}
    }
    const action = incomingAction as TokenAction;
    switch(action.type){
        case 'UPDATE_TOKEN':
            // here we update the token in the cookie
            tokenService.updateSessionToken(action.payload.token);
            return {...state, token: action.payload.token, failedLogin: action.payload.failedLogin};
        default:
            return state;
    }
};