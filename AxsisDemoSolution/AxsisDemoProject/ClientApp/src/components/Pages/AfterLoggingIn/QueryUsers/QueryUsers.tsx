import React from "react";
import { Button, Form, Table } from "react-bootstrap";
import { authService } from "../../../../services/authService";
import userService from "../../../../services/userService";
import QueryUsersLayout from "./QueryUsersLayout";
import InteractiveTable from "../../../reusable/InteractiveTable";
import Modal from "../../../reusable/PopUp";
import { User } from "../../../../services/entities/User";
import EditUserModal from "./EditUserModal";
import DeleteUserModal from "./DeleteUserModal";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/app/store";


const QueryUsers = ()=>{
    const [showEditModal, setShowEditModal] = React.useState(false);
    const [showDeleteModal, setShowDeleteModal] = React.useState(false);

    const [userToEdit, setUserToEdit] = React.useState(new User());
    const [userToDelete, setUserToDelete] = React.useState(new User());

    const userCollectionStore = useSelector((state:RootState)=>state.userCollection)
    return (
        <>
            <Button onClick={()=>{throw new Error("not implemented")}}>Update data</Button>
            <QueryUsersLayout
                table={
                    <InteractiveTable
                        objects={userCollectionStore?.userCollection ?? []}
                        onEdit={(user) =>{setUserToEdit(user); setShowEditModal(true)}}
                        onDelete={(user) =>{setUserToDelete(user); setShowDeleteModal(true)}}
                    />
                }
                editUserModal={
                    (showEditModal ? <EditUserModal user={userToEdit}
                        onClose={()=>{setShowEditModal(false);}}
                        onAccept={(user)=>{
                            setShowEditModal(false);
                            //await userService.updateUserAsync(userToEdit);
                        }}
                        /> : <> </>
                    )
                }
                deleteUserModal={
                    (showDeleteModal ? <DeleteUserModal user={userToDelete}
                        onClose={()=>{setShowDeleteModal(false);}}
                        onAccept={()=>{setShowDeleteModal(false);}}
                    /> : <> </>)
                }
            />
            {/* This will render a modal when showModal is true */}
            
        </>
    )
}

export default QueryUsers;