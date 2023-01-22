import React from "react";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { authService } from "../../../../services/authService";
import userService from "../../../../services/userService";
import { ApplicationState } from "../../../../store";
import AddUserLayout from "./AddUserLayout";

const AddUser =()=>{
    const tokenState = useSelector((state: ApplicationState)=> state.token);

    return (
        <AddUserLayout
            EmailField={(ref)=><Form.Control ref={ref}></Form.Control>}
            NameField={(ref)=><Form.Control ref={ref}></Form.Control>}
            PasswordField={(ref)=><Form.Control type="password" ref={ref}></Form.Control>}
            ConfirmPasswordField={(ref)=><Form.Control type="password" ref={ref}></Form.Control>}
            StatusField={(ref)=><Form.Check ref={ref}></Form.Check>}
            SexField={(ref)=><Form.Select ref={ref}>
                <option>male</option>
                <option>female</option>
            </Form.Select>}
            onActionAsync={async (user)=>{
                if(!tokenState) return;
                await userService.addUserAsync(user, tokenState.token.props.value);
            }}
        />
    )
}
export default AddUser;