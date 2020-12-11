import React from 'react';
import PropTypes from 'prop-types';
// import './footer.css'

const Footer = ({
  leftTodo, showCompleted,
  showActive, showAll, deletCompleted,
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
          className="selected"
          onClick={showAll}
        >
          All
        </button>
      </li>
      <li>
        <button type="button" onClick={showActive}>
          Active
        </button>
      </li>
      <li>
        <button type="button" onClick={showCompleted}>
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
  showCompleted: () => {},
  showActive: () => {},
  showAll: () => {},
  deletCompleted: () => {},
};

Footer.propTypes = {
  leftTodo: PropTypes.number.isRequired,
  showCompleted: PropTypes.func,
  showActive: PropTypes.func,
  showAll: PropTypes.func,
  deletCompleted: PropTypes.func,
};

export default Footer;
