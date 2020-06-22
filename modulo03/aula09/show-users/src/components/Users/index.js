import React, { Component } from 'react';
import Avatar from '../Avatar';

export default class Users extends Component {
  constructor() {
    super();
    this.state = {
      secondsVisible: 0,
    };

    this.interval = null;
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      const { secondsVisible } = this.state;
      this.setState({
        secondsVisible: secondsVisible + 1,
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const users = this.props.users;
    const { secondsVisible } = this.state;
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
}
