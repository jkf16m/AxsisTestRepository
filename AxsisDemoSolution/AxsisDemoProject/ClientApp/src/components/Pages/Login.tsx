import * as React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { authService } from '../../services/authService';
import { Token } from '../../services/entities/Token';
import { ApplicationState } from '../../store';
import { actionCreators } from '../../store/TokenStore';

const Login = () =>{
  const tokenState = useSelector((state: ApplicationState) => state.token);
  const dispatch = useDispatch();
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);


  return (
    <div className={"container"}>
      <div
        className={"card card-body bg-light outline-info"}
      >
      <h6 className='card-title'>Please enter your credentials:</h6>
      <form >
        <div className='form-group'>
          <label htmlFor="exampleEmail">Email</label>
          <input
            ref={emailRef}
            className='form-control'
            type="email"
            name="email"
            id="exampleEmail"
            placeholder="example@mail.com"
          />
        </div>
        <div className='form-group'>
          <label htmlFor="examplePassword">Password</label>
          <input
            className='form-control'
            ref={passwordRef}
            type="password"
            name="password"
            id="examplePassword"
          />
        </div>
        <div className="row justify-content-center">
          {
            tokenState?.failedLogin &&
        <div className='invalid-feedback'>"Email o contraseña incorrectos"</div>
          }
        <button
          type='submit'
          className='btn btn-primary'
          onClick={async() => {
            if(!emailRef.current || !passwordRef.current) return;
            let result = await authService.tryToLoginAsync(emailRef.current.value, passwordRef.current.value);
            dispatch(
              actionCreators.updateToken(
                {
                  token:new Token({value: result, expires_at: new Date()}),
                  failedLogin: !result
                }
              )
            );
          }}
        >Login</button>
        </div>
      </form>
      </div>
    </div>
  );
}

export default Login;
