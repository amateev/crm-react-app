import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      agent : [],
      
    }

    // this.deletePet = this.deletePet.bind(this);
  }

  // deletePet() {
  //   alert('hi');
  // }

  deleteAgent = (event) => {

    //in button below add a data attribute with the pet's id

    var id = event.target.getAttribute('data-id');

    return fetch(`http://localhost:3001/agent/${id}`, {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          }).then(res => res.json()).then(deletedAgentId => {

            let agent = this.state.agent.filter(agent => agent._id !== deletedAgentId)

            this.setState({agent})
          })

   
  }

  createAgent = (event) => {
    event.preventDefault();

    let first_name = event.target.children[0].value;
    let last_name = event.target.children[1].value;

    return fetch("http://localhost:3001/agent", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({first_name, last_name})
      }).then(res => res.json()).then(rj => {
        let agent = [...this.state.agent, rj];
        this.setState({agent})
      })
  }

  componentDidMount() {
    return fetch("http://localhost:3001/agent")
    .then((res) => res.json())
      .then(resultingJSON => this.setState({agent : resultingJSON}))
  }

  render() {
    return (
      <div className="App">
        <header>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>

          

          <form onSubmit={this.createAgent}>
            <input type="text" name="fname" placeholder="put in your name" />
            <input type="text" name="lname" placeholder="put in your last name" />

            <button>add an agent</button>
          </form>

          {this.state.agent.map((x) =>
            <p key={x._id}> 
              {x.first_name} | {x.last_type} <button onClick={this.deleteAgent} data-id={x._id}>x</button>
            </p>
          )}

          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
