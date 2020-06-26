import React, { useState, useEffect } from 'react';
import Users from './components/Users';
import Toggle from './components/Toggle';

export default function App() {
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(
        'https://randomuser.me/api/?seed=rush&nat=br&results=10'
      );
      const data = await res.json();
      setUsers(data.results);
    };
    fetchUsers();
  }, []);

  const handleShowUsers = (isChecked) => {
    setShowUsers(isChecked);
  };

  return (
    <div className="container">
      <h5>React LifeCycle</h5>
      <hr />
      <Toggle
        description="Mostrar usuários: "
        enabled={showUsers}
        onToggle={handleShowUsers}
      />
      {showUsers && <Users users={users} />}
    </div>
  );
}
