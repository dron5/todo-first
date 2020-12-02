import React, { Component } from 'react';

// import './footer.css'

export default class Footer extends Component {
  render() {
    const {
      leftTodo, showCompleted,
      showActive, showAll, deletCompleted,
    } = this.props;
    return (
      <footer className="footer">
        <span className="todo-count">
          {' '}
          { leftTodo }
          {' '}
          items left
        </span>
        <ul className="filters">
          <li>
            <button
              className="selected"
              onClick={showAll}
            >
              All
            </button>
          </li>
          <li>
            <button onClick={showActive}>
              Active
            </button>
          </li>
          <li>
            <button onClick={showCompleted}>
              Completed
            </button>
          </li>
        </ul>
        <button
          className="clear-completed"
          onClick={deletCompleted}
        >
          Clear completed
        </button>
      </footer>
    );
  }
}
