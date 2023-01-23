import React from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import RenderFunctionRef from "../../../../lib/types";
import { User, UserUpdateInfo } from "../../../../services/entities/User";

interface UpdateUserLayoutProps {
    id: number;
    NameField: RenderFunctionRef<HTMLInputElement>;
    CurrentPasswordField: RenderFunctionRef<HTMLInputElement>;
    NewPasswordField: RenderFunctionRef<HTMLInputElement>;
    SexField: RenderFunctionRef<HTMLSelectElement>;
    EmailField: RenderFunctionRef<HTMLInputElement>;
    onAction: (userUpdateInfo: UserUpdateInfo)=>void;
}
const UpdateUserLayout = (props: UpdateUserLayoutProps)=>{
    const nameRef = React.useRef<HTMLInputElement>(null);
    const currentPasswordRef = React.useRef<HTMLInputElement>(null);
    const newPasswordRef = React.useRef<HTMLInputElement>(null);
    const sexRef = React.useRef<HTMLSelectElement>(null);
    const emailRef = React.useRef<HTMLInputElement>(null);


    return(
        <>
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
                <Form.Label>Current Password</Form.Label>
                {props.CurrentPasswordField(currentPasswordRef)}
            </Form.Group>
            <Form.Group>
                <Form.Label>New Password</Form.Label>
                {props.NewPasswordField(newPasswordRef)}
            </Form.Group>
            <Row>
                <Col xs="5">
                <Form.Group>
                    <Form.Label>Sex</Form.Label>
                    {props.SexField(sexRef)}
                </Form.Group>
                </Col>
            </Row>
            <br/>
            <Form.Group>
                <Button variant="primary" onClick={async ()=>{
                    props.onAction({
                        props:{
                            id: props.id,
                            name: nameRef.current?.value || "",
                            currentEmail: emailRef.current?.value || "",
                            currentPassword: currentPasswordRef.current?.value || "",
                            newPassword: newPasswordRef.current?.value || "",
                            sex: sexRef.current?.value || "male"
                        }
                    });
                }}>Update</Button>
            </Form.Group>

        </Form>
        </>
    );
}
export default UpdateUserLayout;