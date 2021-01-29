/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import './new-task-form.css';

export default class NewTaskForm extends Component {
  state = {
    stateLabel: '',
  }

    onAddItem = (event) => {
      this.setState({
        stateLabel: event.target.value,
      });
    }

    onSubmit = (event) => {
      event.preventDefault();
      let { stateLabel } = this.state;
      const { onAdded } = this.props;
      stateLabel = stateLabel.trim();
      if (stateLabel && stateLabel !== ' ') {
        onAdded(stateLabel);
        this.setState({ stateLabel: '' });
      }
    }

    render() {
      const searchText = 'What needs to be done?';
      const { stateLabel } = this.state;
      return (
        <form onSubmit={this.onSubmit}>
          <input
            className="new-todo"
            placeholder={searchText}
            onChange={this.onAddItem}
            value={stateLabel}
          />
          <input
            className="new-todo__timer"
            placeholder="min"
            name="min"
          />
          <input
            className="new-todo__timer"
            placeholder="sec"
            name="sec"
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
