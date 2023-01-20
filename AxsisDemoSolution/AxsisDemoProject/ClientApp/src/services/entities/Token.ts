interface TokenProps{
    value: string;
    expires_at: Date;
}

export class Token{
    public readonly props: TokenProps;

    constructor(tokenProps: TokenProps){
        this.props = tokenProps;
    }
}
