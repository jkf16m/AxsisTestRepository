import React from "react";
import { Form, Table } from "react-bootstrap";
import { authService } from "../../../../services/authService";
import userService from "../../../../services/userService";
import QueryUsersLayout from "./QueryUsersLayout";
import InteractiveTable from "../../../reusable/InteractiveTable";
import Modal from "../../../reusable/PopUp";


const QueryUsers = ()=>{
    const [showModal, setShowModal] = React.useState(false);

    return (
        <>
            <QueryUsersLayout
                renderFromData={(users) =>{
                    return <InteractiveTable
                        objects={users}
                        onEdit={(user) =>{}}
                        onDelete={(user) =>{}}
                    />
                }}
                statusFilterField={(statusFilterField) =>{
                    return <Form.Control as="select" ref={statusFilterField} />
                }}
            />
            {/* This will render a modal when showModal is true */}
            {showModal && <Modal
                title="Add User"
                body={<></>}
                buttons={(onAccept, onClose) =>{
                    return <></>
                }}
                onClose={()=>{}}
                onAccept={()=>{}}
            />}
        </>
    )
}

export default QueryUsers;