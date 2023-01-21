import React from "react"
import { Modal as ModalBootstrap }  from "react-bootstrap";

type ModalAction = ()=>void;
interface ModalProps{
    title: string;
    body: React.ReactNode;
    buttons: (onAccept: ModalAction, onClose: ModalAction)=>React.ReactNode;
    onAccept: ()=>void;
    onClose: ()=>void;
}

const Modal=(props:ModalProps)=>{
    return(
        <ModalBootstrap
            show={true}
            onHide={props.onClose}
            size="lg"
            centered
        >
            <ModalBootstrap.Header closeButton>
                <ModalBootstrap.Title>{props.title}</ModalBootstrap.Title>
            </ModalBootstrap.Header>
            <ModalBootstrap.Body>
                {props.body}
            </ModalBootstrap.Body>
            <ModalBootstrap.Footer>
                {props.buttons(props.onAccept, props.onClose)}
            </ModalBootstrap.Footer>
        </ModalBootstrap>
    )
}
export default Modal;