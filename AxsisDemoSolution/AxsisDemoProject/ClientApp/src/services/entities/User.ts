
interface UserProps{
    id?: number;
    email: string;
    name: string;
    password: string;
    status: boolean;
    sex: string;
    created_at?: Date;
}
export class User{
    public readonly props: UserProps;

    constructor(userProps: UserProps){
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