import React from "react"
import { Form } from "react-bootstrap";
import { Entity } from "../../lib/interfaces";

export interface PasswordType{
    password: string;
}
type AllowedTypes = string | number | boolean | Date | string[] | PasswordType;

interface FormField{
    value: AllowedTypes; // The value of the property, leave it empty but defined if you don't want default value
    required: boolean;
    faultyText?: string;
    bootstrapProps?: object;
}

export interface FormConfiguration{
    [key: string]: FormField;
}
interface AutoBootstrapFormProps {
    title: string;
    object: FormConfiguration;
    onAccept: (obj: FormConfiguration) => void;
    onClose?: () => void;
}

interface TypedControlProps{
    config: FormField;
}

const TypedControl = (props: TypedControlProps) =>{
    let value = props.config.value;
    switch (typeof(value)) {
        case "string":
            return <Form.Control type="text" value={value} />
        case "number":
            return <Form.Control type="number" value={value} />
        case "boolean":
            return <Form.Check type="checkbox" checked={value} />
    }
    if(value instanceof Date)
        return <Form.Control type="date" />
    else if(value instanceof Array)
        return <Form.Control as="select">
            {value.map((option, index)=>{
                return <option key={index}>{option}</option>
            })}
        </Form.Control>
    if(value.password)
        return <Form.Control type="password" value={value.password} />
    else
        return <Form.Control type="text" />
}



// Makes a form with a configuration object and a title
const FormObjectMapper = (props: AutoBootstrapFormProps) => {
    return(
        <Form>
            {Object.keys(props.object.props).map((key, index)=>{
                return <Form.Group key={index}>
                    <Form.Label>{key}</Form.Label>
                    <TypedControl
                        config={props.object[key]}
                    />
                </Form.Group>
            })
            }
        </Form>
        );
}
