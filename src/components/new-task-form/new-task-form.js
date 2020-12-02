import React, { Component } from 'react';

// import './new-task-form.css';

export default class NewTaskForm extends Component {

    state = {
        label: ''
    }

    onAddItem = (e) => {
        this.setState({
            label: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.label){
            this.props.onAdded(this.state.label);
            this.setState({
                label: ''
            })
        };
    }

    render() {
        const searchText = 'What needs to be done?';
        return (
        <form onSubmit={ this.onSubmit }>
            <input className="new-todo" 
                placeholder={ searchText }
                autoFocus={ true }
                onChange={ this.onAddItem }
                value={ this.state.label }
            />
        </form>
    );
    }
}

