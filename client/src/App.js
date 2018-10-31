import React, { Component } from 'react';
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Container from "./components/Container";
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      agent : [],
      edit: false
      
    }

  }

 

  deleteAgent = (event) => {

    //in button below add a data attribute with the agent's id

    var id = event.target.getAttribute('data-id');

    return fetch(`http://localhost:3001/agent/${id}`, {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          }).then(res => res.json()).then(deletedAgentId => {

            let agent = this.state.agent.filter(agent => agent.id !== deletedAgentId)

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

  editAgent = (event) => {
    event.preventDefault();
    this.setState({edit:true})
  }

  componentDidMount() {
    return fetch("http://localhost:3001/agent")
    .then((res) => res.json())
      .then(resultingJSON => this.setState({agent : resultingJSON}))
  }



// inline if statement
// {this.state.edit ? "hello" : ""}
// && - both conditions are true

  render() {
    return (
      <div className="App">
        <Nav />
        
        <Container />
        <div className="App-header">
          

          <form onSubmit={this.createAgent}>
            <input type="text" name="fname" placeholder="put in your name" />
            <input type="text" name="lname" placeholder="put in your last name" />

            <button>add an agent</button>
          </form>

          {this.state.edit && <form>
            <input type="text" name="fname" placeholder="put in your name" />
            <input type="text" name="lname" placeholder="put in your last name" />

            <button>update an agent</button>
          </form>}

          {this.state.agent.map((x) =>
            <p key={x._id}> 
              {x.first_name} | {x.last_name} <button onClick={this.deleteAgent} data-id={x.id}>x</button> 
               | <button onClick={this.editAgent}>edit</button>
            </p>
          )}
          
          
            
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
