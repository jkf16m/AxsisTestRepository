import React from "react";
import RenderFunctionRef from "../../../../lib/types";

interface UpdateUserLayoutProps {
    NameField: RenderFunctionRef<HTMLInputElement>;
    CurrentPasswordField: RenderFunctionRef<HTMLInputElement>;
    NewPasswordField: RenderFunctionRef<HTMLInputElement>;
    SexField: RenderFunctionRef<HTMLInputElement>;
    EmailField: RenderFunctionRef<HTMLInputElement>;
}
const UpdateUserLayout = (props: UpdateUserLayoutProps)=>{
    const nameRef = React.useRef<HTMLInputElement>(null);
    const currentPasswordRef = React.useRef<HTMLInputElement>(null);
    const newPasswordRef = React.useRef<HTMLInputElement>(null);
    const sexRef = React.useRef<HTMLInputElement>(null);
    const emailRef = React.useRef<HTMLInputElement>(null);


    return(
        <>
        </>
    );
}
export default UpdateUserLayout;