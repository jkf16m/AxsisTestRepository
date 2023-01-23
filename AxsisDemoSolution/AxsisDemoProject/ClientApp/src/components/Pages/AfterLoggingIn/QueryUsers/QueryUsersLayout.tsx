import React from "react";
import { Spinner } from "react-bootstrap";
import RenderFunctionRef from "../../../../lib/types";
import { User } from "../../../../services/entities/User";


interface QueryUsersLayoutProps {
    isFetching: boolean;
    table: JSX.Element;
    editUserModal: JSX.Element;
    deleteUserModal: JSX.Element;
}
const QueryUsersLayout = (props:QueryUsersLayoutProps) =>{

    return (
        <div style={{overflowX: 'auto'}}>
            {props.isFetching ? <Spinner animation="border"/> : <></>}
            {props.table}
            {props.editUserModal}
            {props.deleteUserModal}
        </div>
    )
}

export default QueryUsersLayout;