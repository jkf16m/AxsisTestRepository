import React from "react";
import RenderFunctionRef from "../../../../lib/types";
import { User } from "../../../../services/entities/User";


interface QueryUsersLayoutProps {
    statusFilterField: RenderFunctionRef<HTMLInputElement>;
    renderFromData: RenderFunctionRef<User[]>;
    onDeleteUser: (user: User) => void;
    onEditUser: (user: User) => void;
}
const QueryUsersLayout = (props:QueryUsersLayoutProps) =>{

    return (
        <div>
        </div>
    )
}