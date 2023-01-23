import React, { useCallback, useEffect } from "react";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { authService } from "../../../../services/authService";
import { User } from "../../../../services/entities/User";
import userService from "../../../../services/userService";
import { useAddUserMutation } from "../../../../store/features/API/userApi";
import { useAppSelector } from "../../../hooks/redux";
import AddUserLayout from "./AddUserLayout";

const AddUser =()=>{
    const [trigger, {data, isError, isSuccess, isLoading}] = useAddUserMutation();
    const [user, setUser] = React.useState<User>(new User());
    
    const handleAddUser = useCallback((userP: User)=>{
        setUser(userP);
    },[data])

    useEffect(()=>{
        trigger(user.props)
    },[user])

    return (
        <AddUserLayout
            isFetching = {isLoading}
            EmailField={(ref)=><Form.Control ref={ref}></Form.Control>}
            NameField={(ref)=><Form.Control ref={ref}></Form.Control>}
            PasswordField={(ref)=><Form.Control type="password" ref={ref}></Form.Control>}
            ConfirmPasswordField={(ref)=><Form.Control type="password" ref={ref}></Form.Control>}
            StatusField={(ref)=><Form.Check defaultChecked={true} ref={ref}></Form.Check>}
            SexField={(ref)=><Form.Select ref={ref}>
                <option>male</option>
                <option>female</option>
            </Form.Select>}
            successRegisteredUser={data?.shouldBeAdded ?? false}
            failedRegisterText={{
                emailUsed: data?.emailAlreadyUsed ?? false,
                invalidEmail: data?.validEmail ?? false,
                invalidPassword: !(data?.validPassword) ?? false,
                userWasAdded: data?.shouldBeAdded ?? false
            }}
            onActionAsync={handleAddUser}
        />
    )
}
export default AddUser;