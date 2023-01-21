import React from "react";
import RenderFunctionRef from "../../../../lib/types";
import { User } from "../../../../services/entities/User";


interface QueryUsersLayoutProps {
    statusFilterField: RenderFunctionRef<HTMLSelectElement>;
    renderFromData: (users: User[])=>JSX.Element;
}
const QueryUsersLayout = (props:QueryUsersLayoutProps) =>{

    return (
        <div>
        </div>
    )
}

export default QueryUsersLayout;