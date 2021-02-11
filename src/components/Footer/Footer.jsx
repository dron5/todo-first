import React from 'react';
import PropTypes from 'prop-types';
// import './footer.css'

const Footer = ({
  leftTodo, pressedButton, deletCompleted, showTasks,
}) => (
  <footer className="footer">
    <span className="todo-count">
      {' '}
      {leftTodo}
      {' '}
      items left
    </span>
    <ul className="filters">
      <li>
        <button
          type="button"
          name="All"
          className={pressedButton === 'All' ? 'selected' : ''}
          onClick={showTasks}
        >
          All
        </button>
      </li>
      <li>
        <button
          type="button"
          name="Active"
          className={pressedButton === 'Active' ? 'selected' : ''}
          onClick={showTasks}
        >
          Active
        </button>
      </li>
      <li>
        <button
          type="button"
          name="Completed"
          className={pressedButton === 'Completed' ? 'selected' : ''}
          onClick={showTasks}
        >
          Completed
        </button>
      </li>
    </ul>
    <button
      type="button"
      className="clear-completed"
      onClick={deletCompleted}
    >
      Clear completed
    </button>
  </footer>
);
Footer.defaultProps = {
  showTasks: () => {},
  deletCompleted: () => {},
};

Footer.propTypes = {
  leftTodo: PropTypes.number.isRequired,
  pressedButton: PropTypes.string.isRequired,
  showTasks: PropTypes.func,
  deletCompleted: PropTypes.func,
};

export default Footer;
