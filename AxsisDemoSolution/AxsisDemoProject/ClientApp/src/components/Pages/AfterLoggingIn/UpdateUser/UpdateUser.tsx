import React from "react";
import { Form } from "react-bootstrap";
import UpdateUserLayout from "./UpdateUserLayout";

const UpdateUser = ()=>{
    return (
        <UpdateUserLayout
            CurrentPasswordField={(ref) =><Form.Control ref={ref}></Form.Control>}
            EmailField={(ref) =><Form.Control ref={ref}></Form.Control>}
            NameField={(ref) =><Form.Control ref={ref}></Form.Control>}
            NewPasswordField={(ref) =><Form.Control ref={ref}></Form.Control>}
            SexField={(ref) =><Form.Control ref={ref}></Form.Control>}
            onAction={async (userUpdateInfo) =>{
                // await userService.updateUser(userUpdateInfo);
            }}
        />
    )
}
export default UpdateUser;