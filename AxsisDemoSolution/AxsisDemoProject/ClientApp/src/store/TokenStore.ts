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

export function reducer(state: Token | undefined, action: TokenAction){
    if (state === undefined){
        return new Token({
            value: '',
            expires_at: new Date()
        })
    }
    if(action.type === 'UPDATE_TOKEN'){
        return new Token({...action.token.props})
    }
}