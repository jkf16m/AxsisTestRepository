import React from 'react';
import { Button } from 'react-bootstrap';
import { User, UserUpdateInfo } from '../../../../services/entities/User';
import Modal from '../../../reusable/PopUp';
import UpdateUser from '../UpdateUser/UpdateUser';

interface EditUserModalProps {
    user: User;
    onClose: ()=>void;
    onAccept: (user: UserUpdateInfo)=>void;
}

const EditUserModal = (props: EditUserModalProps) => {
    const [user, setUser] = React.useState(new UserUpdateInfo({
        email: props.user.props.email,
        name: props.user.props.name,
        newPassword: "",
        password: props.user.props.password,
        sex: props.user.props.sex
    }));
    return(<Modal
        title="Edit user"
        body={<>
            <UpdateUser/>
        </>}
        onClose={()=>props.onClose()}
        onAccept={()=>props.onAccept(user)}
        buttons={(onAccept, onClose) =>{
            return <>
                <Button variant="primary" onClick={onAccept}>Update</Button>
                <Button variant="secondary" onClick={onClose}>Cancel</Button>
            </>
        }}
        />
    )
}
export default EditUserModal;