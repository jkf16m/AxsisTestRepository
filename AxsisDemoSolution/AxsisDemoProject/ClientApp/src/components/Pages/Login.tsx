import * as React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
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
    <div>
      <Form>
        <h1></h1>
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input
            innerRef={emailRef}
            type="email"
            name="email"
            id="exampleEmail"
            placeholder="example@mail.com"
          />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input
            innerRef={passwordRef}
            type="password"
            name="password"
            id="examplePassword"
          />
        </FormGroup>
        <Button
          onClick={async() => {
            if(!emailRef.current || !passwordRef.current) return;
            let result = await authService.tryToLoginAsync(emailRef.current.value, passwordRef.current.value);
            dispatch(actionCreators.updateToken(new Token({value: result, expires_at: new Date()})));
          }}
        >Login</Button>
      </Form>
    </div>
  );
}

export default connect()(Login);
