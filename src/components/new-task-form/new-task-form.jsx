import React, { Component } from 'react';

// import './new-task-form.css';

export default class NewTaskForm extends Component {
    state = {
      label: '',
    }

    onAddItem = (event) => {
      this.setState({
        label: event.target.value,
      });
    }

    onSubmit = (event) => {
      event.preventDefault();
      if (this.state.label) {
        this.props.onAdded(this.state.label);
        this.setState({
          label: '',
        });
      }
    }

    render() {
      const searchText = 'What needs to be done?';
      return (
        <form onSubmit={this.onSubmit}>
          <input
            className="new-todo"
            placeholder={searchText}
            autoFocus
            onChange={this.onAddItem}
            value={this.state.label}
          />
        </form>
      );
    }
}
