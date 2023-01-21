import { Entity, Props } from "../../lib/interfaces";

type SexType = ''|'male'|'female';
interface UserProps{
    id: number;
    email: string;
    name: string;
    password: string;
    status: boolean;
    sex: string;
    created_at?: Date;
}
export type UserPropsKey = keyof UserProps;
export class User implements Entity{
    public readonly props: UserProps;

    constructor(userProps: UserProps = {id: 0, email: '', name: '', password: '', status: false, sex: ''}){
        this.props = userProps;
    }
}



interface UserUpdateInfoProps{
    name: string;
    password: string;
    newPassword: string;
    sex: string;
    email: string;
}

export class UserUpdateInfo{
    public readonly props: UserUpdateInfoProps;
    constructor(props: UserUpdateInfoProps){
        this.props = props;
    }
}