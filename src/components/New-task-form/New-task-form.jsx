/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './new-task-form.css';

export default class NewTaskForm extends Component {
  state = {
    stateLabel: '',
    mins: '',
    seconds: '',
  }

  onAddItem = (event) => {
    this.setState({
      stateLabel: event.target.value,
    });
  }

  onMinEnter = (event) => {
    this.setState({
      mins: event.target.value,
    });
  }

  onSecEnter = (event) => {
    this.setState({
      seconds: event.target.value,
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    let { stateLabel } = this.state;
    const { mins, seconds } = this.state;
    const { onAdded } = this.props;
    stateLabel = stateLabel.trim();
    if (stateLabel && stateLabel !== ' ') {
      onAdded(stateLabel, +mins * 60 + +seconds);
      this.setState({ stateLabel: '', mins: '', seconds: '' });
    }
  }

  render() {
    const searchText = 'What needs to be done?';
    const { stateLabel, mins, seconds } = this.state;
    return (
      <form id="form" action="" onSubmit={this.onSubmit}>
        <input
          type="text"
          className="new-todo"
          placeholder={searchText}
          onChange={this.onAddItem}
          value={stateLabel}
          name="taskText"
        />
        <input
          type="number"
          className="new-todo__timer"
          placeholder="min"
          onChange={this.onMinEnter}
          name="min"
          min="0"
          max="60"
          value={mins}
        />
        <input
          type="number"
          className="new-todo__timer"
          placeholder="sec"
          onChange={this.onSecEnter}
          name="sec"
          min="0"
          max="60"
          value={seconds}
        />
        <input type="submit" className="hidden" />
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
