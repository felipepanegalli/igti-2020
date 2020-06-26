import React, { Component } from 'react';
import Users from './components/Users';
import Toggle from './components/Toggle';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      showUsers: false,
    };
  }

  async componentDidMount() {
    const res = await fetch(
      'https://randomuser.me/api/?seed=rush&nat=br&results=10'
    );
    const data = await res.json();
    this.setState({ users: data.results });
  }

  handleShowUsers = (isChecked) => {
    this.setState({
      showUsers: isChecked,
    });
  };

  render() {
    const { showUsers, users } = this.state;

    return (
      <div className="container">
        <h5>React LifeCycle</h5>
        <hr />
        <Toggle
          description="Mostrar usuários: "
          enabled={showUsers}
          onToggle={this.handleShowUsers}
        />
        {showUsers && <Users users={users} />}
      </div>
    );
  }
}
