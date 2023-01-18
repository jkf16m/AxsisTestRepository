interface UserProps{
    id: number;
    email: string;
    name: string;
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