/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
      const { label } = this.state;
      const { onAdded } = this.props;
      if (label) {
        onAdded(label);
        this.setState({
          label: '',
        });
      }
    }

    render() {
      const searchText = 'What needs to be done?';
      const { label } = this.state;
      return (
        <form onSubmit={this.onSubmit}>
          <input
            className="new-todo"
            placeholder={searchText}
            onChange={this.onAddItem}
            value={label}
          />
        </form>
      );
    }
}

NewTaskForm.defaultProps = {
  onAdded: () => {},
};

NewTaskForm.propTypes = {
  onAdded: PropTypes.func,
};
