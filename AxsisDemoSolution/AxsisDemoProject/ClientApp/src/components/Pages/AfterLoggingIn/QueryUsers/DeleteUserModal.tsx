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
                body={<>
                    <p>Are you sure you want to deactivate this user?</p>
                    <ul>
                        <li>Name: {props.user.props.name}</li>
                        <li>Email: {props.user.props.email}</li>
                        <li>Sex: {props.user.props.sex}</li>
                    </ul>
                </>}
                buttons={(onAccept, onClose) =>{
                    return <>
                        <Button variant="danger" onClick={onAccept}>Deactivate</Button>
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