import React from "react";
import { Button } from "react-bootstrap";
import RenderFunctionRef from "../../../../lib/types";
import { UserUpdateInfo } from "../../../../services/entities/User";

interface UpdateUserLayoutProps {
    NameField: RenderFunctionRef<HTMLInputElement>;
    CurrentPasswordField: RenderFunctionRef<HTMLInputElement>;
    NewPasswordField: RenderFunctionRef<HTMLInputElement>;
    SexField: RenderFunctionRef<HTMLInputElement>;
    EmailField: RenderFunctionRef<HTMLInputElement>;
    onAction: (userUpdateInfo: UserUpdateInfo)=>void;
}
const UpdateUserLayout = (props: UpdateUserLayoutProps)=>{
    const nameRef = React.useRef<HTMLInputElement>(null);
    const currentPasswordRef = React.useRef<HTMLInputElement>(null);
    const newPasswordRef = React.useRef<HTMLInputElement>(null);
    const sexRef = React.useRef<HTMLInputElement>(null);
    const emailRef = React.useRef<HTMLInputElement>(null);


    return(
        <>
        <Button onClick={async ()=>{/*props.onAction();*/}}></Button>
        </>
    );
}
export default UpdateUserLayout;