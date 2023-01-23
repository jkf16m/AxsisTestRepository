import React from 'react';
import { Button } from 'react-bootstrap';
import { User, UserUpdateInfo } from '../../../../services/entities/User';
import { UpdatedUserResponse } from '../../../../store/features/API/userApi';
import Modal from '../../../reusable/PopUp';
import UpdateUser from '../UpdateUser/UpdateUser';

interface EditUserModalProps {
    user: User;
    onClose: ()=>void;
    onAccept: (user: UserUpdateInfo)=>void;
}

const EditUserModal = (props: EditUserModalProps) => {
    const [user, setUser] = React.useState(new UserUpdateInfo({
        id: props.user.props.id,
        name: props.user.props.name,
        newEmail: props.user.props.email,
        newPassword: "",
        currentPassword: "",
        sex: props.user.props.sex
    }));

    return(<Modal
        size="sm"
        title="Edit user"
        body={<>
            <UpdateUser
                onAction={
                    (wasUpdated)=>{
                        if(wasUpdated)
                            props.onClose()
                    }
                }
                editedUserDefaultValues={user}
            />
        </>}
        onClose={()=>props.onClose()}
        onAccept={()=>props.onAccept(user)}
        buttons={(onAccept, onClose, fromBody) =>{
            return <>
                <Button variant="secondary" onClick={onClose}>Cancel</Button>
            </>
        }}
        />
    )
}
export default EditUserModal;