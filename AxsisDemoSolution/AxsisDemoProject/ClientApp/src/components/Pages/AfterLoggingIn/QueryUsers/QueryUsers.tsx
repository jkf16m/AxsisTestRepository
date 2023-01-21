import React from "react";
import { Form, Table } from "react-bootstrap";
import { authService } from "../../../../services/authService";
import userService from "../../../../services/userService";
import QueryUsersLayout from "./QueryUsersLayout";


const QueryUsers = ()=>{
    return (
        <QueryUsersLayout
            renderFromData={(users) =>{
                return <Table></Table>
            }}
            statusFilterField={(statusFilterField) =>{
                return <Form.Control as="select" ref={statusFilterField} />
            }}
            onDeleteUser={(user) =>{
                // userService.deleteUser(user.id);
            }}
            onEditUser={(user) =>{
                // userService.editUser(user);
            }}
        />
    )
}

export default QueryUsers;