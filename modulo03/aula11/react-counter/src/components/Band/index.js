import React, { useState } from 'react';

const BAND_MEMBERS = [
  { id: 1, name: 'Neil Peart', instruments: 'Bateria' },
  { id: 2, name: 'Alex Lifeson', instruments: 'Guitarra' },
  { id: 3, name: 'Geddy Lee', instruments: 'Baixo' },
];

export default function Band() {
  const [bandMembers, setBandMembers] = useState(BAND_MEMBERS);
  const [bandName, setBandName] = useState('Rush');

  return (
    <div>
      <h6>Banda: {bandName}</h6>
      {bandMembers.map(({ id, name, instruments }) => {
        return (
          <ul key={id}>
            <li>Nome: {name}</li>
            <li>Instrumento: {instruments}</li>
          </ul>
        );
      })}
    </div>
  );
}
