export interface Props<T>{
    [props: string]: T 
}

export interface AnyProps extends Props<any>{}

export interface PrimaryKey<T>{
    id: T;
}

export interface EntityProps extends AnyProps, PrimaryKey<number>{}

export interface Entity{
    props: EntityProps;
}