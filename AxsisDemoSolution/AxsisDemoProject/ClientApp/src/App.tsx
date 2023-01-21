import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Pages/AfterLoggingIn/Layout';
import Home from './components/Pages/AfterLoggingIn/Home';
import Counter from './components/Counter';
import FetchData from './components/FetchData';

import './custom.css'
import AnonymousRoutes from './components/AnonymousRoutes';
import LoggedInRoutes from './components/LoggedInRoutes';
import Login from './components/Pages/Login';
import { useSelector } from 'react-redux';
import { ApplicationState } from './store';
import { authService } from './services/authService';

export default () => {
    const token = useSelector((state: ApplicationState)=> state.token);
    const [loggedIn, setLoggedIn] = React.useState(false);
    React.useEffect(()=>{
        const getToken = async ()=>{
            if(!token) return;
            if(!token.token) return;
            if(token.token.props.value){
                var authResult = await authService.tryAuthenticationAsync(token.token.props.value);
            }else{
                authResult = false;
            }
            setLoggedIn(authResult);
        };
        getToken();
        
    },[token])

    return(
    <Layout>
        {loggedIn ? <LoggedInRoutes /> : <AnonymousRoutes />}
    </Layout>
)}
