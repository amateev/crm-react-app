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
      edit: false,
      edit_id: ""
      
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
    // this.setState({edit:true})

    // setting up the state:
    let edit = true;
    let edit_id = event.target.getAttribute('data-id');
    let first_name = event.target.getAttribute('data-fname');
    let last_name = event.target.getAttribute('data-lname');

    // we need time for the form to show up, so we use 
    // callback function that runs after the state is updated
    this.setState({edit, edit_id}, function(){
      let editForm = document.querySelector('#editForm');
   
      editForm.children[0].value = first_name;
      editForm.children[1].value = last_name;
      
    });
  }

  // hiding an edit agent form by setting the edit state
  hideEditAgent = (event) => {
    event.preventDefault();
    this.setState({edit:false})
  }

 updateAgent = (event) => {
    event.preventDefault();

    let first_name = event.target.children[0].value
    let last_name = event.target.children[1].value

    return fetch(`http://localhost:3001/agent/update/${this.state.edit_id}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({first_name, last_name})
      }).then(res => res.json()).then(rj => {
        let agent = this.state.agent.map(b => {
         if (b._id != this.state.edit_id) return b;
         else return rj;
        })
        this.setState({agent});
      })
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

          {this.state.edit && <form id="editForm" onSubmit={this.updateAgent}>
            <input type="text" name="fname" placeholder="put in your name" />
            <input type="text" name="lname" placeholder="put in your last name" />

            <button >update an agent</button>
            <button onClick={this.hideEditAgent} >hide edit form</button>
          </form>}

          {this.state.agent.map((x) =>
            <p key={x._id}> 
              {x.first_name} | {x.last_name} <button onClick={this.deleteAgent} data-id={x._id}>x</button> 
               | <button onClick={this.editAgent} data-id={x._id} data-fname={x.first_name} data-lname={x.last_name}>edit</button>
            </p>
          )}
          
          
            
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
