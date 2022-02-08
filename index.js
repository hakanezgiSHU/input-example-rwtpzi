import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React',
      isSubmitted: false,
      username: "",
      age: -1,
      gender: "",
      nation: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(event) {
    this.setState({name: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();

    const username = this.state.name;

    function getAge(un) {
      return fetch("https://api.agify.io/?name=" + un)
      .then((response) => response.json())
    }

    function getGender(un) {
      return fetch("https://api.genderize.io/?name=" + username)
      .then((response) => response.json())
    }

    function getNation(un) {
      return fetch("https://api.nationalize.io/?name=" + username)
      .then((response) => response.json())
    }

    Promise.all([getAge(username), getGender(username), getNation(username)])
      .then(([age_data, gender_data, nation_data]) => this.setState({isSubmitted: true, username: username, age: age_data.age, gender: gender_data.gender, nation: nation_data.country[0].country_id}))

  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
      <div>
        Enter in a your name:
        <input type="text"  onChange={this.handleChange} />
        <button type="submit"> Submit </button>
        <br />
        { 
          this.state.isSubmitted ? "Hello " + this.state.username + ". I think you are a " + this.state.gender + " and " + this.state.age + " years old, from " + this.state.nation + ".": ""
        }
      </div>
      </form>
    );
  }
}

render(<App />, document.getElementById('root'));
