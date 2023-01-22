import * as React from 'react';
import { Route, Routes } from 'react-router';
import Layout from './components/Pages/AfterLoggingIn/Layout';
import Home from './components/Pages/AfterLoggingIn/Home';

import './custom.css'
import AnonymousRoutes from './components/AnonymousRoutes';
import LoggedInRoutes from './components/LoggedInRoutes';
import Login from './components/Pages/Login';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from './store';
import { authService } from './services/authService';
import AnonymousLayout from './components/Pages/AnonymousLayout';
import { actionCreators } from './store/TokenStore';
import { Token } from './services/entities/Token';
import NavMenu from './components/Pages/AfterLoggingIn/NavMenu';

const App = () => {
    const tokenState = useSelector((state: ApplicationState)=> state.token);
    const dispatch = useDispatch();
    
    const [loggedIn, setLoggedIn] = React.useState(false);
    React.useEffect(()=>{
        const getToken = async ()=>{
            if(!tokenState) return;
            if(!tokenState.token) return;
                let authResult : boolean;
            if(tokenState.token.props.value){
                authResult = await authService.tryAuthenticationAsync(tokenState.token.props.value);
            }else{
                authResult = false;
            }
            setLoggedIn(authResult);
        };
        getToken();
        
    },[tokenState])

    return(
    <>
        
        {loggedIn&&<NavMenu></NavMenu>}
        <Routes>
            <>
            
            {loggedIn ?
                <>
                    <Route path='/' element={<Layout><Home/></Layout>} />
                    <Route path='/counter' element={<></>} />
                    <Route path='/fetch-data/:startDateIndex?' element={<></>} />
                </>
                :
                    <Route path='/*' element={<AnonymousLayout><Login
                        loginAction={
                            (token:Token)=>dispatch(
                                actionCreators.updateToken(
                                    {
                                        failedLogin: token ? false : true,
                                        token: new Token({...token.props})
                                    }
                                )
                            )
                        }
                        failedLogin={tokenState ? tokenState.failedLogin : false}
                    /></AnonymousLayout>} />
            }
            </>
        </Routes>
    </>
)}

export default App;