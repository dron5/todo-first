import React from 'react';
import PropTypes from 'prop-types';
// import './footer.css'

const Footer = ({
  leftTodo, pressedButton, deletCompleted, showTasks,
}) => {
  const block = document.getElementsByTagName('BUTTON');
  const buttons = Array.from(block);
  buttons.forEach((el) => {
    el.classList.remove('selected');
    if (el.innerHTML === pressedButton) {
      el.classList.add('selected');
    }
  });

  return (
    <footer className="footer">
      <span className="todo-count">
        {' '}
        {leftTodo}
        {' '}
        items left
      </span>
      <ul className="filters">
        <li>
          <button type="button" name="All" onClick={showTasks}>
            All
          </button>
        </li>
        <li>
          <button type="button" name="Active" onClick={showTasks}>
            Active
          </button>
        </li>
        <li>
          <button type="button" name="Completed" onClick={showTasks}>
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
};

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
