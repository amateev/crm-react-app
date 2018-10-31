import React, { Component } from "react";
import "./Agents.css";

class Agents extends Component {
	 constructor() {
     super();

	    this.state = {
	      agents : [],
	      name: 'List of Agents:'
	    }

  	}

 deleteAgent = (event) => {
    var id = event.target.getAttribute('data-id');
    alert('Hi');
        return fetch(`http://localhost:3001/agents/${id}`, {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          }).then(res => res.json()).then(deletedAgentId => {

            let agents = this.state.agents.filter(agent => agent.id !== deletedAgentId)

            this.setState({agents})
          })

  }

  componentDidMount() {
    return fetch("http://localhost:3001/agents")
    .then((res) => res.json())
      .then(resultingJSON => this.setState({agents : resultingJSON}))
  }
}


 render() {
    return (
      <div>
        
        <p className="App-header">
          
            <h1>{this.state.name}</h1>
            
            {this.state.agents.map((x) =>
            <p key={x.id}> 
              {x.first_name} | {x.last_name} <button onClick={this.deleteAgent} data-id={x.id}>x</button>
            </p>
            )}

            <form onSubmit={this.createAgent}>
              <input type="text" name="first name" placeholder="enter first name" />
              <input type="text" name="last name" placeholder="enter last name" />

              <button>add an agent</button>
            </form>

        
        </p>
        
      </div>
    );
  }

