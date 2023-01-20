import {User} from '../services/entities/User'

// interfaces of actions


export interface AddNewUserAction {
    type: 'ADD_NEW_USER',
    user: User
}
export interface UpdateUserAction {
    type: 'UPDATE_USER',
    user: User
}
export interface DisableUserAction {
    type: 'DISABLE_USER',
    user: User
}

type UserAction = AddNewUserAction | UpdateUserAction | DisableUserAction;


export const actionCreators = {
    addNewUser: (user: User) => ({ type: 'ADD_NEW_USER', user}) as AddNewUserAction,
    updateUser: (user: User) => ({ type: 'UPDATE_USER', user}) as UpdateUserAction,
    disableUser: (user: User) => ({ type: 'DISABLE_USER', user}) as DisableUserAction
}

export function reducer(state: User | undefined, action: UserAction){
    if (state === undefined){
        return new User({
            id: -1,
            email: '',
            name: '',
            status: false,
            created_at: undefined,
            sex: ''
        })
    }
    if(action.type === 'ADD_NEW_USER'){
        return new User({...action.user.props})
    }
    if(action.type === 'UPDATE_USER'){
        return new User({...state.props, ...action.user.props})
    }
    if(action.type === 'DISABLE_USER'){
        return new User({...state.props, status: false})
    }

}