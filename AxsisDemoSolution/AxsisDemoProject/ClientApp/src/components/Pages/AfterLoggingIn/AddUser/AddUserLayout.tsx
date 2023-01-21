import React, { ReactNode, useRef } from 'react'
import { Form } from 'react-bootstrap';
import RenderFunctionRef from '../../../../lib/types';
import { User } from '../../../../services/entities/User';


interface AddUserLayoutProps {
    EmailField: RenderFunctionRef<HTMLInputElement>;
    NameField: RenderFunctionRef<HTMLInputElement>;
    PasswordField:  RenderFunctionRef<HTMLInputElement>;
    ConfirmPasswordField:  RenderFunctionRef<HTMLInputElement>;
    StatusField:  RenderFunctionRef<HTMLInputElement>;
    SexField:  RenderFunctionRef<HTMLInputElement>;
    onActionAsync: (user: User)=>void;
}
const AddUserLayout = (props:AddUserLayoutProps) =>{
    const emailRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);
    const statusRef = useRef<HTMLInputElement>(null);
    const sexRef = useRef<HTMLInputElement>(null);
    return (
        <Form>
            <Form.Group>
                <Form.Label>Email</Form.Label>
                {props.EmailField(emailRef)}
            </Form.Group>
            <Form.Group>
                <Form.Label>Name</Form.Label>
                {props.NameField(nameRef)}
            </Form.Group>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                {props.PasswordField(passwordRef)}
            </Form.Group>
            <Form.Group>
                <Form.Label>Confirm Password</Form.Label>
                {props.ConfirmPasswordField(confirmPasswordRef)}
            </Form.Group>
            <Form.Group>
                <Form.Check>Status</Form.Check>
                {props.StatusField(statusRef)}
            </Form.Group>
            <Form.Group>
                <Form.Label>Sex</Form.Label>
                {props.SexField(sexRef)}
            </Form.Group>
            <Form.Group>
                <Form.Control type="button" value="Add User" onClick={async ()=>{
                    const user = new User({
                        email: emailRef.current?.value || "",
                        name: nameRef.current?.value || "",
                        password: passwordRef.current?.value || "",
                        status: statusRef.current?.checked || false,
                        sex: sexRef.current?.value || ""
                    });
                    await props.onActionAsync(user);
                }}/>
            </Form.Group>

        </Form>
    )
}
export default AddUserLayout;