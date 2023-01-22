import * as React from 'react';
import { Route, Routes } from 'react-router';
import Layout from './components/Pages/AfterLoggingIn/Layout';
import Home from './components/Pages/AfterLoggingIn/Home';
import './custom.css'
import Login from './components/Pages/Login';
import { useDispatch, useSelector } from 'react-redux';
import { authService } from './services/authService';
import AnonymousLayout from './components/Pages/AnonymousLayout';
import { Token } from './services/entities/Token';
import NavMenu from './components/Pages/AfterLoggingIn/NavMenu';
import { useAppDispatch, useAppSelector } from './components/hooks/redux';
import { tokenActions } from './store/features/tokenReducer';

const App = () => {
    const tokenState = useAppSelector(state=>state.token);
    const dispatch = useAppDispatch();
    
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
                                tokenActions.updateToken(
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