import React, { useCallback } from "react";
import { Button, Form, Table } from "react-bootstrap";
import QueryUsersLayout from "./QueryUsersLayout";
import InteractiveTable from "../../../reusable/InteractiveTable";
import { User } from "../../../../services/entities/User";
import EditUserModal from "./EditUserModal";
import DeleteUserModal from "./DeleteUserModal";
import { useDeleteUserMutation, useGetUsersQuery, useUpdateUserMutation } from "../../../../store/features/API/userApi";


const QueryUsers = ()=>{
    const [showEditModal, setShowEditModal] = React.useState(false);
    const [showDeleteModal, setShowDeleteModal] = React.useState(false);

    const [userToEdit, setUserToEdit] = React.useState(new User());
    const [userToDelete, setUserToDelete] = React.useState(new User());

    const {data, refetch, isFetching} = useGetUsersQuery();

    const [triggerUpdateUser, {data: dataUpdateUser}] = useUpdateUserMutation();
    const [triggerDeleteUser, {data: dataDeleteUser}] = useDeleteUserMutation();

    const handleUserDelete = useCallback(()=>{
        triggerDeleteUser(userToDelete.props.id);
        setShowDeleteModal(false);
    },[userToDelete, showDeleteModal])

    const handleDeleteModalClose = useCallback( ()=>{setShowDeleteModal(false);} , [showDeleteModal])

    return (
        <>
            <Button onClick={()=>{refetch()}}>Reload data</Button>
            <QueryUsersLayout
                isFetching = {isFetching}
                table={
                    <InteractiveTable
                        objects={data ?? []}
                        onEdit={(user) =>{setUserToEdit(user); setShowEditModal(true)}}
                        onDelete={(user) =>{setUserToDelete(user); setShowDeleteModal(true)}}
                        showDeleteButton={(user)=>(user.props.status)? true: false}
                    />
                }
                editUserModal={
                    (showEditModal ? <EditUserModal user={userToEdit}
                        onClose={()=>{setShowEditModal(false);}}
                        onAccept={(user)=>{
                            triggerUpdateUser(user.props);
                            setShowEditModal(false);
                            //await userService.updateUserAsync(userToEdit);
                        }}
                        /> : <> </>
                    )
                }
                deleteUserModal={
                    (showDeleteModal ? <DeleteUserModal user={userToDelete}
                        onClose={handleDeleteModalClose}
                        onAccept={handleUserDelete}
                    /> : <> </>)
                }
            />
            {/* This will render a modal when showModal is true */}
            
        </>
    )
}

export default QueryUsers;