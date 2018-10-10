import React from 'react'
import ReactDOM from 'react-dom'


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      firstname: '',
      lastname: '',
      nickname: ''
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return(
      <div>
        <form action="/">
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={this.state.firstname}
            onChange={this.handleChange}
          />
          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={this.state.lastname}
            onChange={this.handleChange}
          />
          <label htmlFor="nickname">Nick Name</label>
          <input
            type="text"
            id="nickname"
            name="nickname"
            value={this.state.nickname}
            onChange={this.handleChange}
          />
          <button>Save</button>
        </form>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.querySelector("#root"))
