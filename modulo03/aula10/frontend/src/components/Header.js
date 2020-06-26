import React from 'react';

export default function Header({ children }) {
  return (
    <div>
      <h3 className="center">{children}</h3>
    </div>
  );
}
