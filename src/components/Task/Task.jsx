/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/state-in-constructor */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import EditingItem from './Editing-item';
import './task.css';

export default class Task extends Component {
  constructor(props) {
    super(props);
    this.date = new Date();
    this.formatedDate = [this.date.getFullYear(), this.date.getMonth(),
      this.date.getDate(), this.date.getHours(),
      this.date.getMinutes(), this.date.getSeconds()];
    // this.formatedDate = this.date.toString().slice(4, 24);
    this.state = {
      createDate: this.formatedDate,
    };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000,
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState(() => ({
      createDate: this.formatedDate,
    }));
  }

  render() {
    const {
      label, edit, onEditButton,
      onToggleCompleted, completed, onDeleted,
      onEditForm, id, pressedButton,
    } = this.props;
    let visibility = true;
    let className = '';

    const { createDate } = this.state;

    if (!completed && pressedButton === 'Completed') {
      visibility = false;
    }
    if (completed && !edit) {
      className += 'completed';
      if (pressedButton === 'Active') {
        visibility = false;
      }
    }
    if (edit) {
      className = 'editing';
    }
    if (!visibility) { className += ' hidden'; }
    return (
      <li className={className}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            onClick={onToggleCompleted}
          />
          <label>
            <span className="description">
              { label }
            </span>
            <span className="created">
              {`${'created '}`}
              {formatDistanceToNow(
                new Date(...createDate),
                { addSuffix: true, includeSeconds: true },
              )}
            </span>
          </label>
          <button
            type="button"
            className="icon icon-edit"
            onClick={onEditButton}
          />
          <button
            type="button"
            className="icon icon-destroy"
            onClick={onDeleted}
          />
        </div>
        {edit && (
        <EditingItem
          edit={edit}
          label={label}
          onEditForm={onEditForm}
          id={id}
        />
        )}
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
