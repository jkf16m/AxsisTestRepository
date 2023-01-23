import React from "react";

import { Form, Table } from "react-bootstrap";
import { Entity, Props } from "../../lib/interfaces";
import { authService } from "../../services/authService";
import { User, UserPropsKey } from "../../services/entities/User";
import userService from "../../services/userService";



interface InteractiveTableProps<TypeOfObject extends Entity>{
    objects: TypeOfObject[];
    onEdit: (obj: TypeOfObject) => void;
    onDelete: (obj: TypeOfObject) => void;
    showDeleteButton?: (user: TypeOfObject) => boolean;
}

const getUsedProperties = (objects: Entity[]) =>{
    let usedProperties: string[] = [];
    objects.forEach((obj)=>{
        Object.keys(obj.props).forEach((key)=>{
            if(obj.props[key] !== undefined
                && !usedProperties.includes(key)
                && obj.props[key] !== null
                && obj.props[key] !== "")
                usedProperties.push(key);
        })
    })
    return usedProperties;
}

const mapTypes = (value: any) =>{
    if(value instanceof Date){
        return value.toLocaleDateString();
    }else if(typeof(value) === 'boolean'){
        return value ? "Active" : "Inactive";
    }
    return value;
}

const InteractiveTable = <T extends Entity,>(props: InteractiveTableProps<T>) =>{
    return (
        <Table>
            <thead>
                <tr>
                {/* First collect all used object keys */}
                {
                    getUsedProperties(props.objects).map((key, index)=>{
                        return <th key={index}>{key}</th>
                    })
                }   
                </tr>
            </thead>
            <tbody>
                {props.objects.map((user, index) =>{
                    return (
                        <tr key={index}>
                            {
                                getUsedProperties(props.objects)
                                .map(
                                    (key, index) =>{
                                        const propKey = key as UserPropsKey;
                                        return(
                                        <td key={index}>
                                            <>{mapTypes(user.props[propKey])}</>
                                        </td>
                                        )
                                    }
                                )
                            }
                            <td>
                                <button onClick={()=>{props.onEdit(user)}}>Edit</button>
                            </td>
                            <td>
                                {
                                    props.showDeleteButton!(user) &&
                                    <button onClick={()=>{props.onDelete(user)}}>Delete</button>
                                }
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    )
}
export default InteractiveTable;