import React from "react";
import { Form } from "react-bootstrap";
import { UserUpdateInfo } from "../../../../services/entities/User";
import { useUpdateUserMutation } from "../../../../store/features/API/userApi";
import UpdateUserLayout from "./UpdateUserLayout";

interface UpdateUserProps{
    editedUserDefaultValues: UserUpdateInfo;
}

const UpdateUser = (props: UpdateUserProps)=>{
    const [user, setUser] = React.useState(props.editedUserDefaultValues);
    const[trigger, {data}] = useUpdateUserMutation();

    return (
        <UpdateUserLayout
            id={user.props.id}
            CurrentPasswordField={(ref) =><Form.Control ref={ref}></Form.Control>}
            EmailField={(ref) =><Form.Control defaultValue={user.props.currentEmail} ref={ref}></Form.Control>}
            NameField={(ref) =><Form.Control defaultValue={user.props.name} ref={ref}></Form.Control>}
            NewPasswordField={(ref) =><Form.Control ref={ref}></Form.Control>}
            SexField={(ref) =><Form.Select defaultValue={user.props.sex} ref={ref}>
                <option>male</option>
                <option>female</option>
            </Form.Select>}
            onAction={async (userUpdateInfo) =>{
                trigger(userUpdateInfo.props);
            }}
        />
    )
}
export default UpdateUser;