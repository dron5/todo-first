/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import './task.css';

export default class Task extends Component {
  constructor(props) {
    super(props);
    this.date = new Date();
    this.formatedDate = [this.date.getFullYear(), this.date.getMonth(),
      this.date.getDate(), this.date.getHours(),
      this.date.getMinutes(), this.date.getSeconds()];
    this.state = {
      createDate: this.formatedDate,
      stateLabel: this.props.label,
      time: 0,
      timerStatus: false,
      idInterval: null,
    };
  }

  componentDidMount() {
    this.timerFNSID = setInterval(
      () => this.tick(),
      1000,
    );
    const { timerStatus } = this.state;
    if (timerStatus) {
      this.timerSecID = setInterval(
        () => this.timerTick(),
        1000,
      );
    }
    this.setState(() => ({
      idInterval: this.timerSecID,
    }));
  }

  componentWillUnmount() {
    clearInterval(this.timerFNSID);
    clearInterval(this.state.idInterval);
  }

  onChangeInput = (event) => {
    this.setState({
      stateLabel: event.target.value,
    });
  }

  timerTick = () => {
    this.setState(({ time }) => ({
      time: time + 1,
    }));
  }

  timerStart = () => {
    const { timerStatus } = this.state;
    if (!timerStatus) {
      const intervalId = setInterval(
        () => this.timerTick(),
        1000,
      );
      this.setState(() => ({
        timerStatus: true,
        idInterval: intervalId,
      }));
    }
  }

  timerStop = () => {
    const { idInterval } = this.state;
    clearInterval(idInterval);
    this.setState(() => ({
      timerStatus: false,
    }));
  }

  onSubmitForm = (event) => {
    event.preventDefault();
    let { stateLabel } = this.state;
    const { onEditForm, id } = this.props;
    stateLabel = stateLabel.trim();
    if (stateLabel && stateLabel !== ' ') { onEditForm(id, stateLabel); }
  }

  tick() {
    this.setState(() => ({
      createDate: this.formatedDate,
    }));
  }

  render() {
    const {
      label, edit, onEditButton, pressedButton,
      onToggleCompleted, completed, onDeleted,
    } = this.props;
    let visibility = true;
    let className = '';

    const { createDate, time } = this.state;

    if (!completed && pressedButton === 'Completed') {
      visibility = false;
    }
    if (completed && !edit) {
      className += 'completed';
      if (pressedButton === 'Active') { visibility = false; }
    }
    if (edit) { className = 'editing'; }
    if (!visibility) { className += ' hidden'; }

    const min = Math.floor(time / 60);
    const sec = time % 60;
    return (
      <li className={className}>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={onToggleCompleted} />
          <label>
            <span className="description">{label}</span>
            <span className="created">
              {`${'created '}`}
              {formatDistanceToNow(
                new Date(...createDate),
                { addSuffix: true, includeSeconds: true },
              )}
            </span>
            <div className="time_container">
              <div className="time">{`${min}: ${sec}`}</div>
              <div>
                <button
                  type="button"
                  className="play"
                  onClick={this.timerStart}
                >
                  ▶
                </button>
                <button
                  type="button"
                  className="pause"
                  onClick={this.timerStop}
                >
                  ⏸
                </button>
              </div>
            </div>
          </label>
          <button type="button" className="icon icon-edit" onClick={onEditButton} />
          <button type="button" className="icon icon-destroy" onClick={onDeleted} />
        </div>
        <form onSubmit={this.onSubmitForm}>
          <input
            type="text"
            className="edit"
            defaultValue={label}
            onChange={this.onChangeInput}
          />
        </form>
      </li>
    );
  }
}
Task.defaultProps = {
  onDeleted: () => {},
  onEditButton: () => {},
};

Task.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  edit: PropTypes.bool.isRequired,
  completed: PropTypes.bool.isRequired,
  pressedButton: PropTypes.string.isRequired,
  onEditButton: PropTypes.func,
  onToggleCompleted: PropTypes.func.isRequired,
  onDeleted: PropTypes.func,
  onEditForm: PropTypes.func.isRequired,
};
