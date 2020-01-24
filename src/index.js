import React from 'react'
import ReactDOM from 'react-dom'


class FormContainer extends React.Component {
    constructor() {
        super()
        // The idea here is the form is initiated as an array and could be
        // constructed in render and in constructor instead of hard-coded.
        this.formFields = ['firstname', 'lastname', 'nickname'];
        this.state = {
            formFields: {
                "firstname": {
                    field: "firstname",
                    value: '',
                    saveAble: true,
                    label: "First Name",
                    type: "text"
                },
                "lastname": {
                    field: "lastname",
                    value: '',
                    saveAble: true,
                    label: "Last Name",
                    type: "text"
                },
                "nickname": {
                    field: "nickname",
                    value: '',
                    saveAble: true,
                    label: "Nick Name",
                    type: "text"
                },
                "creditCard": {
                    field: "creditCard",
                    value: '',
                    saveAble: false,
                    label: "Credit Card",
                    type: "text"
                }
            },
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

        let formFields = { ...this.state.formFields };
        formFields[key]['value'] = value;

        this.setState({
            formFields
        });
        this.setState({ message: null })

        localStorage.setItem(key, value)

    }

    goOnline() {
        if (!this.state.online) {
            this.setState({ online: true })
        }
    }

    goOffline() {
        console.log('going offline')
        if (this.state.online) {
            this.setState({ online: false })
        }
    }

    componentDidMount() {
        window.addEventListener("online", this.goOnline);
        window.addEventListener("offline", this.goOffline);

        // Check if we're loading this offline (ie. from cache)
        if (!navigator.onLine) {
            this.goOffline();
        }
        let formFields = { ...this.state.formFields };
        Object.keys(formFields).forEach(fieldName => {
            let itemValue = localStorage.getItem(fieldName);
            if (itemValue) {
                formFields[fieldName]['value'] = itemValue;
            }
        });
        this.setState({ formFields });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ message: "This demo doesn't actually submit anywhere." })
    }

    render() {
        let button = this.state.online ? <button className="online">Send Form</button> : <button className="offline">Offline Mode</button>
        let message = this.state.message ? this.state.message : '';
        return (
            <Form handleSubmit={this.handleSubmit} handleChange={this.handleChange} fields={this.state.formFields} button={button} message={message} />
        );
    }
}

function Form(props) {

    return (
        <form onSubmit={props.handleSubmit}>
            {Object.keys(props.fields).map(fieldName => <Field key={fieldName} handleChange={props.handleChange} {...props.fields[fieldName]} />)}
            <p>{props.message}</p>
            <div>{props.button}</div>
        </form>
    );

}

function Field(props) {

    return (
        <div>
            <label htmlFor={props.field}>{props.label}</label>
            <input
                type={props.type}
                id={props.field}
                name={props.field}
                value={props.value}
                onChange={(e) => props.handleChange(e)}
            />
        </div>
    );

}

ReactDOM.render(<FormContainer />, document.querySelector("#root"))