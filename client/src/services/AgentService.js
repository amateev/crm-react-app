//./services/BookService.js

export const _updateAgent = (updatedId, name, type, token) => {
	return fetch(`http://localhost:3001/pets/update/${updatedId}`, {
	    method: 'POST',
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify({name, type, token})
	  }).then(res => res.json())
}

export const _loadAgent = () => {
	return fetch("http://localhost:3001/agent", {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
}

export const _deleteAgent = (id) => {
    return fetch(`http://localhost:3001/agent/${id}`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
	    body: JSON.stringify({})
      }).then(res => res.json())
}

export const _createAgent = (first_name, last_name) => {
	return fetch("http://localhost:3001/agent", {
	    method: 'POST',
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify({first_name, last_name})
	  }).then(res => res.json())
}