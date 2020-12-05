/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import ruLocale from 'date-fns/locale/ru';

import EditingItem from './editing-item';
import './task.css';

export default class Task extends Component {
  constructor(props) {
    super(props);
    const { date } = this.props;
    this.state = {
      startTime: date,
      lastTime: ' ',
    };
  }
  // state = {
  //   startTime: this.props.date,
  //   lastTime: '1',
  // }

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
    const { startTime } = this.state;
    this.setState({
      lastTime: formatDistanceToNow(startTime,
        {
          addSuffix: true,
          locale: ruLocale,
          includeSeconds: true,
        }),

    });
  }

  render() {
    const {
      label, edit, onEditButton,
      onToggleCompleted, completed, onDeleted,
      visibility, onEditForm, id,
    } = this.props;
    let className = '';

    const { lastTime } = this.state;
    const time = ` ${lastTime}`;

    if (completed && !edit) {
      className += 'completed';
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
              created
              { time }
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
        <EditingItem
          edit={edit}
          label={label}
          onEditForm={onEditForm}
          id={id}
        />
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
  visibility: PropTypes.bool.isRequired,
  completed: PropTypes.bool.isRequired,
  onEditButton: PropTypes.func,
  onToggleCompleted: PropTypes.func.isRequired,
  onDeleted: PropTypes.func,
  onEditForm: PropTypes.func.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
};
