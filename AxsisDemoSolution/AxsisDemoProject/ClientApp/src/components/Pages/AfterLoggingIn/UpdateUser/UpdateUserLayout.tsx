import React, { useCallback, useEffect } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import RenderFunctionRef from "../../../../lib/types";
import { User, UserUpdateInfo } from "../../../../services/entities/User";
import { UpdatedUserResponse } from "../../../../store/features/API/userApi";


interface UpdateUserLayoutProps {
    id: number;
    wasUpdated: boolean;
    NameField: RenderFunctionRef<HTMLInputElement>;
    CurrentPasswordField: RenderFunctionRef<HTMLInputElement>;
    NewPasswordField: RenderFunctionRef<HTMLInputElement>;
    SexField: RenderFunctionRef<HTMLSelectElement>;
    EmailField: RenderFunctionRef<HTMLInputElement>;
    onAction: (userUpdateInfo: UserUpdateInfo)=>void;
    updatedUserResponse: UpdatedUserResponse;
}
const UpdateUserLayout = (props: UpdateUserLayoutProps)=>{
    const nameRef = React.useRef<HTMLInputElement>(null);
    const currentPasswordRef = React.useRef<HTMLInputElement>(null);
    const newPasswordRef = React.useRef<HTMLInputElement>(null);
    const sexRef = React.useRef<HTMLSelectElement>(null);
    const emailRef = React.useRef<HTMLInputElement>(null);

    const [triedAction, setTriedAction] = React.useState<boolean>(false);

    const handleClick = useCallback(async ()=>{
        props.onAction({
            props:{
                id: props.id,
                name: nameRef.current?.value || "",
                newEmail: emailRef.current?.value || "",
                currentPassword: currentPasswordRef.current?.value || "",
                newPassword: newPasswordRef.current?.value || "",
                sex: sexRef.current?.value || "male"
            }
        });
        setTriedAction(true);
    },[]);

    useEffect(()=>{
        if(props.wasUpdated){
            setTriedAction(false);
        }
    },[props.wasUpdated])

    return(
        <>
        <Form>
            <Form.Group>
                <Form.Label>Email</Form.Label>
                {props.EmailField(emailRef)}
                {triedAction && !props.updatedUserResponse.isEmailValid
                    && <Form.Control.Feedback className="d-block invalid-feedback">
                        This is not a valid email format
                        </Form.Control.Feedback>
                }
            </Form.Group>
            <Form.Group>
                <Form.Label>Name</Form.Label>
                {props.NameField(nameRef)}
            </Form.Group>
            <Form.Group>
                <Form.Label>Current Password</Form.Label>
                {props.CurrentPasswordField(currentPasswordRef)}
                {triedAction && !props.updatedUserResponse.bothPasswordsMatched
                    && <Form.Control.Feedback className="d-block invalid-feedback">
                        Current password is incorrect
                    </Form.Control.Feedback>
                }
            </Form.Group>
            <Form.Group>
                <Form.Label>New Password</Form.Label>
                {props.NewPasswordField(newPasswordRef)}
                {
                triedAction && !props.updatedUserResponse.isPasswordValid
                    && (newPasswordRef.current?.value !== "" ?? false)
                    && <Form.Control.Feedback className='invalid-feedback d-block'>
                    This is not a valid password, must have at least:
                    <ul>
                        <li>10 characters</li>
                        <li>1 uppercase letter</li>
                        <li>1 lowercase letter</li>
                        <li>1 number</li>
                        <li>1 special character</li>
                    </ul>
                </Form.Control.Feedback>
                }
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
                <Button variant="primary" onClick={handleClick}>Update</Button>
            </Form.Group>

        </Form>
        </>
    );
}
export default UpdateUserLayout;