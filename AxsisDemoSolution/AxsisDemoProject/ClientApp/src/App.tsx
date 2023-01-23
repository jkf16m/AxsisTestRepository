import * as React from 'react';
import { Navigate, Route, Routes } from 'react-router';
import Layout from './components/Pages/AfterLoggingIn/Layout';
import UsersScreen from './components/Pages/AfterLoggingIn/UsersScreen';
import './custom.css'
import Login from './components/Pages/Login';
import { useDispatch, useSelector } from 'react-redux';
import { authService } from './services/authService';
import AnonymousLayout from './components/Pages/AnonymousLayout';
import { Token } from './services/entities/Token';
import NavMenu from './components/Pages/AfterLoggingIn/NavMenu';
import { useAppDispatch, useAppSelector } from './components/hooks/redux';
import { login, useAuth } from './components/hooks/auth/authProvider';
import QueryUsers from './components/Pages/AfterLoggingIn/QueryUsers/QueryUsers';
import AddUser from './components/Pages/AfterLoggingIn/AddUser/AddUser';
import Home from './components/Pages/AfterLoggingIn/Home';

const App = () => {
    const dispatch = useAppDispatch();
    const [logged, session] = useAuth();

    return(
    <>
        
        {logged && (<NavMenu></NavMenu>)}
        <Routes>
            <>
            
            {logged ?
                <>
                    <Route path='/home' element={<Layout><Home/></Layout>} />
                    <Route path='/users' element={<Layout><UsersScreen/></Layout>} />
                    <Route path='/*' element={<Navigate to="/home" replace></Navigate>} />
                </>
                :
                    <Route path='/*' element={<AnonymousLayout><Login
                        loginAction={
                            (token)=>{
                                login({accessToken: token, refreshToken: ""});
                            }
                        }
                    /></AnonymousLayout>} />
            }
            </>
        </Routes>
    </>
)}

export default App;