import React from "react";
import { Button } from "react-bootstrap";
import { User } from "../../../../services/entities/User";
import Modal from "../../../reusable/PopUp";

interface DeleteUserModalProps {
    user: User;
    onClose: ()=>void;
    onAccept: ()=>void;
}

const DeleteUserModal = (props: DeleteUserModalProps)=>{
    return (
        <>
            <Modal
                size="sm"
                title="Delete user"
                body={<><p>Are you sure you want to delete this user?</p></>}
                buttons={(onAccept, onClose) =>{
                    return <>
                        <Button variant="danger" onClick={onAccept}>Delete</Button>
                        <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    </>
                }}
                onClose={()=>props.onClose()}
                onAccept={()=>props.onAccept()}
                />
        </>
    )
}
export default DeleteUserModal;