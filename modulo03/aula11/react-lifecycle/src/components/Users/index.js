import React, { useState, useEffect } from 'react';
import Avatar from '../Avatar';

export default function Users({ users }) {
  const [secondsVisible, setSecondsVisible] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsVisible(secondsVisible + 1);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [secondsVisible]);

  return (
    <div>
      <p>Componente visivel por: {secondsVisible} segundos</p>
      <br />
      <ul>
        {users.map((user) => {
          return (
            <li key={user.login.uuid}>
              <Avatar user={user} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
