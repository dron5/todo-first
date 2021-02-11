import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './newTaskForm.css';

const NewTaskForm = ({ onAdded }) => {
  const initialState = {
    stateLabel: '',
    mins: '',
    seconds: '',
  };

  const [dataState, setDataState] = useState(initialState);

  const onAddItem = (event) => {
    setDataState(() => ({ ...dataState, stateLabel: event.target.value }));
  };

  const onMinEnter = (event) => {
    setDataState(() => ({ ...dataState, mins: event.target.value }));
  };

  const onSecEnter = (event) => {
    setDataState(() => ({ ...dataState, seconds: event.target.value }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    let { stateLabel, mins } = dataState;
    const { seconds } = dataState;
    stateLabel = stateLabel.trim();
    if (stateLabel && stateLabel !== ' ') {
      if (+mins + +seconds === 0) {
        mins = 5;
      }
      onAdded(stateLabel, +mins * 60 + +seconds);
      setDataState(initialState);
    }
  };
  const searchText = 'What needs to be done?';
  const { stateLabel, mins, seconds } = dataState;
  return (
    <form id="form" action="" onSubmit={onSubmit}>
      <input
        type="text"
        className="new-todo"
        placeholder={searchText}
        onChange={onAddItem}
        value={stateLabel}
        name="taskText"
      />
      <input
        type="number"
        className="new-todo__timer"
        placeholder="min"
        onChange={onMinEnter}
        name="min"
        min="0"
        max="60"
        value={mins}
      />
      <input
        type="number"
        className="new-todo__timer"
        placeholder="sec"
        onChange={onSecEnter}
        name="sec"
        min="0"
        max="60"
        value={seconds}
      />
      <input type="submit" className="hidden" />
    </form>
  );
};

NewTaskForm.defaultProps = {
  onAdded: () => {},
};

NewTaskForm.propTypes = {
  onAdded: PropTypes.func,
};

export default NewTaskForm;
