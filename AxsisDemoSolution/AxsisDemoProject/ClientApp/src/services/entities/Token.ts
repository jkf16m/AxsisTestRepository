interface TokenProps{
    value: string;
    expirationDate: Date;
}

export class Token{
    public readonly props: TokenProps;

    constructor(tokenProps: TokenProps){
        this.props = tokenProps;
    }
}
