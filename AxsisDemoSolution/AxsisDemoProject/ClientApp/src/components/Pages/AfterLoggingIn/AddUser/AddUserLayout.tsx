import React, { ReactNode, useCallback, useEffect, useRef } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap';
import RenderFunctionRef from '../../../../lib/types';
import { User } from '../../../../services/entities/User';
import { AddedUserResponse, useAddUserMutation } from '../../../../store/features/API/userApi';

interface ErrorUserAdded {
    emailUsed: boolean;
    invalidEmail: boolean;
    invalidPassword: boolean;
    userWasAdded: boolean;
}
interface AddUserLayoutProps {
    EmailField: RenderFunctionRef<HTMLInputElement>;
    NameField: RenderFunctionRef<HTMLInputElement>;
    PasswordField:  RenderFunctionRef<HTMLInputElement>;
    ConfirmPasswordField:  RenderFunctionRef<HTMLInputElement>;
    StatusField:  RenderFunctionRef<HTMLInputElement>;
    SexField:  RenderFunctionRef<HTMLSelectElement>;
    onActionAsync: (user: User)=>void;
    successRegisteredUser: boolean;
    failedRegisterText: ErrorUserAdded;
}
const AddUserLayout = (props:AddUserLayoutProps
    ) =>{

    const emailRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);
    const statusRef = useRef<HTMLInputElement>(null);
    const sexRef = useRef<HTMLSelectElement>(null);

    const [triedAction, setTriedAction] = React.useState<boolean>(false);
    const [successfulAction, setSuccessfulAction] = React.useState<boolean>(false);

    const [isPasswordSame, setIsPasswordSame] = React.useState<boolean>(false);
    const [cleanupDone, setCleanupDone] = React.useState<boolean>(true);
  

    const handleClick = useCallback(()=>{
        let passwordSame = false;
        if(passwordRef.current?.value == confirmPasswordRef.current?.value)
        {
            if(passwordRef.current?.value !== "" || confirmPasswordRef.current?.value !== ""){
                passwordSame = true;
            }else{
                passwordSame = false;
            }
        }else{
            passwordSame = false;
        }
        const user = new User({
            id: 0,
            email: emailRef.current?.value || "",
            name: nameRef.current?.value || "",
            password: (passwordSame) ? (passwordRef.current?.value || "") : "",
            status: statusRef.current?.checked || false,
            sex: sexRef.current?.value || ""
        }); 
        props.onActionAsync(user);
        console.log("handleClick->result: " + props.successRegisteredUser);
        setTriedAction(prev=>true);
        setIsPasswordSame(prev=>passwordSame);

    },[triedAction, successfulAction, isPasswordSame, props.successRegisteredUser])

    useEffect(()=>{
        if(props.successRegisteredUser){
            emailRef.current!.value = "";
            nameRef.current!.value = "";
            passwordRef.current!.value = "";
            confirmPasswordRef.current!.value = "";
            statusRef.current!.checked = true;
            sexRef.current!.value = "male";
        }
    },[props.successRegisteredUser])


    return (
        <Form>
            
            <Row>
                <Col md="6" lg="12">
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        {props.EmailField(emailRef)}
                        {
                            triedAction && props.failedRegisterText.emailUsed &&
                            <Form.Control.Feedback className='invalid-feedback d-block'>
                                Email already used
                            </Form.Control.Feedback>
                        }
                        {
                            triedAction && !props.failedRegisterText.invalidEmail &&
                            <Form.Control.Feedback className='invalid-feedback d-block'>
                                Invalid email format
                            </Form.Control.Feedback>
                        }
                    </Form.Group>
                </Col>
                <Col md="6" lg="12">
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        {props.NameField(nameRef)}
                    </Form.Group>
                </Col>  
            </Row>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                {props.PasswordField(passwordRef)}
                {
                    triedAction && props.failedRegisterText.invalidPassword &&
                    <Form.Control.Feedback className='invalid-feedback d-block'>
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
            <Form.Group>
                <Form.Label>Confirm Password</Form.Label>
                {props.ConfirmPasswordField(confirmPasswordRef)}
                {
                    !isPasswordSame && triedAction &&
                    <Form.Control.Feedback className='invalid-feedback d-block'>
                        This is not the same password
                    </Form.Control.Feedback>
                }
            </Form.Group>
            <Row>
                <Col xs="5">
                <Form.Group>
                    <Form.Label>Status</Form.Label>
                    {props.StatusField(statusRef)}
                </Form.Group>
                </Col>
                <Col xs="5">
                <Form.Group>
                    <Form.Label>Sex</Form.Label>
                    {props.SexField(sexRef)}
                </Form.Group>
                </Col>
            </Row>
            <br/>
            <Form.Group>
                <Button variant={"primary"} onClick={handleClick}>Add user</Button>
            </Form.Group>
            {
                triedAction && props.successRegisteredUser &&
                <Form.Control.Feedback className='valid-feedback d-block'>
                    User was added
                </Form.Control.Feedback>
            }

        </Form>
    )
}
export default AddUserLayout;