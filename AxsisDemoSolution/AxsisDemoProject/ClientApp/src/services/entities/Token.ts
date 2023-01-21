interface TokenProps{
    value: string;
}

export class Token{
    public readonly props: TokenProps;

    constructor(tokenProps: TokenProps){
        this.props = tokenProps;
    }
}
