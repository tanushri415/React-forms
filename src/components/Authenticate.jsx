import { useState } from 'react';

const Authenticate = ({ token }) => {
  const [error, setError] = useState(null);
  const [username, setUsername] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  async function handleClick() {
    try {
      const resp = await fetch(
        'https://fsa-jwt-practice.herokuapp.com/authenticate',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const info = await resp.json();

      setSuccessMessage(info.message);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <h2>Authenticate Token</h2>
      {successMessage && <p>{successMessage}</p>}
      {username && <p>The logged in user is {username}</p>}
      {error && <p>{error}</p>}
      <button onClick={handleClick}>Authenticate Token!</button>
    </div>
  );
};
export default Authenticate;
