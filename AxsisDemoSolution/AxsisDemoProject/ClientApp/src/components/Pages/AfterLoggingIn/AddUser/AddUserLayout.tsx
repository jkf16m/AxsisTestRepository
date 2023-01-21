import React, { ReactNode, useRef } from 'react'
import RenderFunctionRef from '../../../../lib/types';


interface AddUserLayoutProps {
    EmailField: RenderFunctionRef<HTMLInputElement>;
    NameField: RenderFunctionRef<HTMLInputElement>;
    PasswordField:  RenderFunctionRef<HTMLInputElement>;
    ConfirmPasswordField:  RenderFunctionRef<HTMLInputElement>;
    StatusField:  RenderFunctionRef<HTMLInputElement>;
    SexField:  RenderFunctionRef<HTMLInputElement>;
    onAction: ()=>void;
}
const AddUserLayout = (props:AddUserLayoutProps) =>{
    const emailRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);
    const statusRef = useRef<HTMLInputElement>(null);
    const sexRef = useRef<HTMLInputElement>(null);
    return (
        <div>
        </div>
    )
}
export default AddUserLayout;