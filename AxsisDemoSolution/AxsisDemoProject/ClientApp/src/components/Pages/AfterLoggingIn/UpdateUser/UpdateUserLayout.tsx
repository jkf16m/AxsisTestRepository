import React from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import RenderFunctionRef from "../../../../lib/types";
import { User, UserUpdateInfo } from "../../../../services/entities/User";

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
                {props.CurrentPasswordField(currentPasswordRef)}
            </Form.Group>
            <Form.Group>
                <Form.Label>Confirm Password</Form.Label>
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
                <Form.Control type="button" value="Add User" onClick={async ()=>{
                    // UserUpdateInfo
                }}/>
            </Form.Group>

        </Form>
        </>
    );
}
export default UpdateUserLayout;