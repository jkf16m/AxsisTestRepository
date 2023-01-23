import React from "react";
import { Form } from "react-bootstrap";
import { UserUpdateInfo } from "../../../../services/entities/User";
import { useUpdateUserMutation } from "../../../../store/features/API/userApi";
import UpdateUserLayout from "./UpdateUserLayout";

interface UpdateUserProps{
    editedUserDefaultValues: UserUpdateInfo;
    onAction: (wasUpdated: boolean)=> void;
}

const UpdateUser = (props: UpdateUserProps)=>{
    const [user, setUser] = React.useState(props.editedUserDefaultValues);
    const[trigger, {data}] = useUpdateUserMutation();

    return (
        <UpdateUserLayout
            updatedUserResponse={data??{bothPasswordsMatched:false, shouldBeUpdated:false, wasPasswordEncrypted: false, isPasswordValid: false, isEmailValid: false}}
            id={user.props.id}
            CurrentPasswordField={(ref) =><Form.Control type="password" ref={ref}></Form.Control>}
            EmailField={(ref) =><Form.Control defaultValue={user.props.newEmail} ref={ref}></Form.Control>}
            NameField={(ref) =><Form.Control defaultValue={user.props.name} ref={ref}></Form.Control>}
            NewPasswordField={(ref) =><Form.Control placeholder="empty = password won't update" type="password" ref={ref}></Form.Control>}
            SexField={(ref) =><Form.Select defaultValue={user.props.sex} ref={ref}>
                <option>male</option>
                <option>female</option>
            </Form.Select>}
            wasUpdated={data?.shouldBeUpdated ?? false}
            onAction={async (userUpdateInfo) =>{
                props.onAction(data?.shouldBeUpdated ?? false);
                trigger(userUpdateInfo.props);
            }}
        />
    )
}
export default UpdateUser;