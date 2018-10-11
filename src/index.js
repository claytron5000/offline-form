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
            creditcard: '',
            online: true
        }

        this.handleChange = this.handleChange.bind(this);
        this.goOnline = this.goOnline.bind(this);
        this.goOffline = this.goOffline.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        let key = e.target.name;
        let value = e.target.value;
        this.setState({
            [key]: value
        })
        this.setState({message: null})
        sessionStorage.setItem(key, value)
    }

    goOnline() {
        if (!this.state.online) {
            this.setState({online: true})
        }
    }

    goOffline() {
        console.log('going offline')
        if (this.state.online) {
            this.setState({online: false})
        }
    }

    componentDidMount() {
        window.addEventListener("online", this.goOnline);
        window.addEventListener("offline", this.goOffline);

        // Check if we're loading this offline (ie. from cache)
        if (!navigator.onLine) {
            this.goOffline();
        }

        this.formFields.forEach(field => {
            if (sessionStorage.getItem(field) && field !== 'creditcard') {
                this.setState({
                    [field]: sessionStorage.getItem(field)
                })
            }
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({message: "This demo doesn't actually submit anywhere."})
    }

    render() {
        let button = this.state.online ? <button className="online">Send Form</button> : <button className="offline">Offline Mode</button>
        let message = this.state.message ? this.state.message : '';
        return(
            <form onSubmit={this.handleSubmit}>
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
                <p>{message}</p>
                <div>{button}</div>
            </form>
        )
    }
}

ReactDOM.render(<App/>, document.querySelector("#root"))
