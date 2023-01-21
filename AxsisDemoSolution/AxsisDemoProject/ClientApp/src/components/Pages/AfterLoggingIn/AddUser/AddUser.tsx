import React from "react";
import { Form } from "react-bootstrap";
import { authService } from "../../../../services/authService";
import userService from "../../../../services/userService";
import AddUserLayout from "./AddUserLayout";

const AddUser =()=>{
    return (
        <AddUserLayout
            EmailField={(ref)=><Form.Control ref={ref}></Form.Control>}
            NameField={(ref)=><Form.Control ref={ref}></Form.Control>}
            PasswordField={(ref)=><Form.Control ref={ref}></Form.Control>}
            ConfirmPasswordField={(ref)=><Form.Control ref={ref}></Form.Control>}
            StatusField={(ref)=><Form.Control ref={ref}></Form.Control>}
            SexField={(ref)=><Form.Control ref={ref}></Form.Control>}
            onActionAsync={async (user)=>{await userService.addUserAsync(user, "");}}
        />
    )
}
export default AddUser;