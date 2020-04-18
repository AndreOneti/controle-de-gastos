import React, { useState } from 'react';

import api from '../../services/api';

import { Container, Form, Input, Label, Button } from "./styles";


function Login({ navigation, screenName }) {
  dotenv.config();
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {
    api.post('/user/login', { user, password })
      .then((data) => {
        console.log(data.data);
        console.log(navigation);
      })
      .catch((err) => { alert(err.response.data.message) });
  };

  return (
    <Container>
      <Form>
        <Label>
          <Input
            type="text"
            name="name"
            placeholder="User name"
            autoFocus
            onChange={(event) => { setUser(event.target.value); }}
          />
        </Label>
        <Label>
          <Input
            type="Password"
            name="pass"
            placeholder="******"
            onChange={(event) => { setPassword(event.target.value); }}
          />
        </Label>
        <Label>
          <Button
            onClick={login}
            disabled={(!user || !password) ? true : false}
          >
            Login
          </Button>
        </Label>
      </Form>
    </Container>
  );
}

export default Login;
