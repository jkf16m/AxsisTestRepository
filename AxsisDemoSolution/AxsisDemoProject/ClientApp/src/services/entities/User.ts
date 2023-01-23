import { Entity, Props } from "../../lib/interfaces";

type SexType = ''|'male'|'female';
export interface UserProps{
    id: number;
    email: string;
    name: string;
    password: string;
    status: boolean;
    sex: string;
    creationDate?: Date;
}
export type UserPropsKey = keyof UserProps;
export class User implements Entity{
    public readonly props: UserProps;

    constructor(userProps: UserProps = {id: 0, email: '', name: '', password: '', status: false, sex: ''}){
        this.props = userProps;
    }
}



export interface UserUpdateInfoProps{
    id: number;
    name: string;
    currentEmail: string;
    currentPassword: string;
    newPassword: string;
    sex: string;
}

export class UserUpdateInfo{
    public readonly props: UserUpdateInfoProps;
    constructor(props: UserUpdateInfoProps){
        this.props = props;
    }
}