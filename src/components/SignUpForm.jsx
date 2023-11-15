import { useState } from 'react';

const SignUpForm = ({ setToken }) => {
  const [username, setUsername] = useState(''); // since this is a function we call it w/ () and pass it an empty string
  const [password, setPassword] = useState(''); // this is another piece of state that will create an empty string
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const res = await fetch('https://fsa-jwt-practice.herokuapp.com/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          username,
          password,
        }),
      });
      // the block above store the api in the rsp variable on line 11

      const info = await res.json();
      console.log(info);
      setToken(info.token);

      setUsername('');
      setPassword('');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <>
      <h2>Sign Up</h2>
      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>
          {' '}
          Username:{' '}
          <input
            minLength='8'
            value={username}
            onChange={(event) => {
              console.log(event.target.value);
              setUsername(event.target.value);
            }}
            id='user-name'
          />
        </label>{' '}
        <br />
        <label>
          Password:{' '}
          <input
            minLength='8'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type='password'
            id='user-password'
          />
        </label>
        <br />
        <button type='submit'>Submit</button>
      </form>
    </>
  );
};

export default SignUpForm;
