import React from 'react'
import ReactDOM from 'react-dom'


class App extends React.Component {
    constructor() {
        super()
        // The idea here is the form is initiated as an array and could be
        // constructed in render and in constructor instead of hard-coded.
        this.formFields = ['firstname', 'lastname', 'nickname'];
        this.state = {
            firstname: '',
            lastname: '',
            nickname: '',
            'creditcard': ''
        }

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        let key = e.target.name;
        let value = e.target.value;
        this.setState({
            [key]: value
        })
        sessionStorage.setItem(key, value)
    }

    componentDidMount() {
        this.formFields.forEach(field => {
            if (sessionStorage.getItem(field) && field !== 'creditcard') {
                this.setState({
                    [field]: sessionStorage.getItem(field)
                })
            }
        })
    }

    render() {
        return(
            <form action="/">
                <div>
                    <label htmlFor="firstname">First Name</label>
                    <input
                        type="text"
                        id="firstname"
                        name="firstname"
                        value={this.state.firstname}
                        onChange={this.handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="lastname">Last Name</label>
                    <input
                        type="text"
                        id="lastname"
                        name="lastname"
                        value={this.state.lastname}
                        onChange={this.handleChange}
                      />
                </div>
                <div>
                    <label htmlFor="nickname">Nick Name</label>
                    <input
                        type="text"
                        id="nickname"
                        name="nickname"
                        value={this.state.nickname}
                        onChange={this.handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="creditcard">Credit Card (not saved)</label>
                    <input
                        type="text"
                        id="creditcard"
                        name="creditcard"
                        value={this.state.creditcard}
                        onChange={this.handleChange}
                    />
                </div>
                <div><button>Save</button></div>
            </form>
        )
    }
}

ReactDOM.render(<App/>, document.querySelector("#root"))
