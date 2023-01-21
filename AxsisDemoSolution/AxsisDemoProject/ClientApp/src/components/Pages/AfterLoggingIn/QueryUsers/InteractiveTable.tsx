import React from "react";

import { Form, Table } from "react-bootstrap";
import { Entity, Props } from "../../../../lib/interfaces";
import { authService } from "../../../../services/authService";
import { User, UserPropsKey } from "../../../../services/entities/User";
import userService from "../../../../services/userService";



interface InteractiveTableProps<TypeOfObject extends Entity>{
    objects: TypeOfObject[];
    onEdit: (obj: TypeOfObject) => void;
    onDelete: (obj: TypeOfObject) => void;
}

const InteractiveTable = <T extends Entity,>(props: InteractiveTableProps<T>) =>{
    return (
        <Table>
            <thead>
                {Object.keys(new User().props).map((key, index) =>{
                    return <th key={index}>{key}</th>
                })}
            </thead>
            <tbody>
                {props.objects.map((user, index) =>{
                    return (
                        <tr key={index}>
                            {
                                Object.keys(user.props)
                                .map(
                                    (key, index) =>{
                                        const propKey = key as UserPropsKey;
                                        return(
                                        <td key={index}>
                                            <>{user.props[propKey]}</>
                                        </td>
                                        )
                                    }
                                )
                            }
                            <td>
                                <button onClick={()=>{props.onEdit(user)}}>Edit</button>
                            </td>
                            <td>
                                <button onClick={()=>{props.onDelete(user)}}>Delete</button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    )
}
export default InteractiveTable;