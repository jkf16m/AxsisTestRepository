import React from "react";
import RenderFunctionRef from "../../../../lib/types";
import { User } from "../../../../services/entities/User";


interface QueryUsersLayoutProps {
    table: JSX.Element;
    editUserModal: JSX.Element;
    deleteUserModal: JSX.Element;
}
const QueryUsersLayout = (props:QueryUsersLayoutProps) =>{

    return (
        <div style={{overflowX: 'auto'}}>
            {props.table}
            {props.editUserModal}
            {props.deleteUserModal}
        </div>
    )
}

export default QueryUsersLayout;