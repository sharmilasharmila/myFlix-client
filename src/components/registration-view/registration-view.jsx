import React, { useState } from 'react';
import Proptypes from 'prop-types';

export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthdate, setBirthdate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password, email, birthdate);
        props.onRegister(username);
    }

    return (
        <Form>
          <Label>Username:
            <input type='text' value={username} onChange={e => setUsername(e.target.value)} />
          </Label>
          <Label>Password:
            <input type='text' value={password} onChange={e => setPassword(e.target.value)} />
          </Label>
          <Label>Email:
            <input type='text' value={email} onChange={e => setEmail(e.target.value)} />
          </Label>
          <Label>Birthdate:
            <input type='text' value={birthdate} onChange={e => setBirthdate(e.target.value)} />
          </Label>
          <Button type='submit' onClick={handleSubmit}>
              Submit
          </Button>
        </Form>
    )
}
