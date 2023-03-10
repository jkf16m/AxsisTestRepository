import * as React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { authService } from '../../services/authService';
import { Token } from '../../services/entities/Token';

interface ILoginProps {
  loginAction: (token: string) => void;
}
const Login = ({
  loginAction
}:ILoginProps) =>{
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  const [failedLogin, setFailedLogin] = React.useState(false);

  const onSubmit = async() => {
    if(!emailRef.current || !passwordRef.current) return;
    const [result,wasUnauthorized] = await authService.tryToLoginAsync(emailRef.current.value, passwordRef.current.value);
    if(!wasUnauthorized) loginAction(result.accessToken);
    if(wasUnauthorized) setFailedLogin(true);
  }

  return (
    <div className={"container h-100 w-100"}>
      <div
        className={"card card-body bg-light outline-info"}
      >
      <h6 className='card-title'>Please enter your credentials:</h6>
      <form>
        <div className='mb-3'>
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
        <div className='mb-3'>
          <label htmlFor="examplePassword">Password</label>
          <input
            className='form-control'
            ref={passwordRef}
            type="password"
            name="password"
            id="examplePassword"
          />
          
        </div>
        <div className='row text-center'>
          {
            failedLogin ?
            <p className='text-danger'>
              Email o contraseña incorrectos
            </p>
            : <></>
          }
        </div>
        <div className="row text-center">
          <div className="col">
            <button
              type='button'
              className={"btn btn-primary"}
              onClick={onSubmit}
            >Login</button>
          </div>
        </div>
      </form>
      </div>
    </div>
  );
}

export default Login;
