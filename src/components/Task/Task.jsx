/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prefer-template */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import './task.css';

const Task = ({
  label, edit, onEditButton, pressedButton,
  onToggleCompleted, completed, onDeleted, id,
  onEditForm, timeToComplete,
}) => {
  const date = new Date();
  const formatedDate = [date.getFullYear(), date.getMonth(),
    date.getDate(), date.getHours(),
    date.getMinutes(), date.getSeconds()];

  const initialState = {
    createDate: formatedDate,
    stateLabel: label,
  };

  const [dataState, setDataState] = useState(initialState);
  const [timerStatus, setTimerStatus] = useState(false);
  const [time, setTime] = useState(timeToComplete);
  const countRef = useRef(time);
  countRef.current = time;

  useEffect(() => {
    let intervalId;
    if (timerStatus) {
      if (completed) {
        setTimerStatus(() => false);
      }
      intervalId = setInterval(() => {
        const curCount = countRef.current;
        setTime(() => curCount - 1);
        if (curCount < 2) {
          setTimerStatus(() => false);
          onToggleCompleted();
        }
      }, 1000);
    } else {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [timerStatus, completed]);

  const onToggleTimer = () => {
    if (!timerStatus && (completed || time === 0)) return;
    setTimerStatus(() => !timerStatus);
  };

  const onChangeInput = (event) => {
    setDataState(() => ({ ...dataState, stateLabel: event.target.value }));
  };

  const onSubmitForm = (event) => {
    event.preventDefault();
    let { stateLabel } = dataState;
    stateLabel = stateLabel.trim();
    if (stateLabel && stateLabel !== ' ') { onEditForm(id, stateLabel); }
  };

  const dummyFunc = () => { };
  // this is necessary for the checkbox to work properly

  let visibility = true;
  let className = '';
  const condition = completed;

  const { createDate } = dataState;

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
  let timerClassName = 'icon-stop';
  if (!timerStatus) {
    timerClassName = 'icon-play';
  }
  return (
    <li className={className}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={condition}
          onChange={dummyFunc}
          onClick={onToggleCompleted}
        />
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
            <div className="time">
              {`${min < 10 ? '0' + min : min}: ${sec < 10 ? '0' + sec : sec}`}
            </div>
            <button type="button" className={timerClassName} onClick={onToggleTimer} />
          </div>
        </label>
        <button type="button" className="icon icon-edit" onClick={onEditButton} />
        <button type="button" className="icon icon-destroy" onClick={onDeleted} />
      </div>
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          className="edit"
          defaultValue={label}
          onChange={onChangeInput}
        />
      </form>
    </li>
  );
};
Task.defaultProps = {
  onDeleted: () => {},
  onEditButton: () => { },
  timeToComplete: 300,
};

Task.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  timeToComplete: PropTypes.number,
  edit: PropTypes.bool.isRequired,
  completed: PropTypes.bool.isRequired,
  pressedButton: PropTypes.string.isRequired,
  onEditButton: PropTypes.func,
  onToggleCompleted: PropTypes.func.isRequired,
  onDeleted: PropTypes.func,
  onEditForm: PropTypes.func.isRequired,
};

export default Task;
