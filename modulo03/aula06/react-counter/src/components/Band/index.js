import React, { Component } from 'react';

export default class Band extends Component {
  constructor() {
    super();
    this.state = {
      bandName: 'Rush',
      bandMembers: [
        { id: 1, name: 'Neil Peart', instruments: 'Bateria' },
        { id: 2, name: 'Alex Lifeson', instruments: 'Guitarra' },
        { id: 3, name: 'Geddy Lee', instruments: 'Baixo' },
      ],
    };
  }
  render() {
    const { bandMembers, bandName } = this.state;
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
}
