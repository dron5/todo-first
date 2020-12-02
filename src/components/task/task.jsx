import React, { Component } from 'react';
import PropTypes from 'prop-types';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import ruLocale from 'date-fns/locale/ru';

import EditingItem from './editing-item';
import './task.css';

export default class Task extends Component {
    static defaultProps = {
      onDeleted: () => {},
      onEditButton: () => {},
      date: new Date(Date.now()),
    }

    static propTypes = {
      label: PropTypes.string,
      id: PropTypes.number,
      edit: PropTypes.bool,
      visibility: PropTypes.bool,
      completed: PropTypes.bool,
      onEditButton: PropTypes.func,
      onToggleCompleted: PropTypes.func,
      onDeleted: PropTypes.func,
      onEditForm: PropTypes.func,
    }

    state = {
      startTime: this.props.date,
      lastTime: '1',
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
      this.setState({
        lastTime: formatDistanceToNow(this.state.startTime,
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

      const time = ` ${this.state.lastTime}`;

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
              className="icon icon-edit"
              onClick={onEditButton}
            />
            <button
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
