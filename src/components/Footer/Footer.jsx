import React from 'react';
import PropTypes from 'prop-types';
// import './footer.css'

const Footer = ({
  leftTodo, showCompleted, pressedButton,
  showActive, showAll, deletCompleted,
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
          <button type="button" onClick={showAll}>
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
};

Footer.defaultProps = {
  showCompleted: () => {},
  showActive: () => {},
  showAll: () => {},
  deletCompleted: () => {},
};

Footer.propTypes = {
  leftTodo: PropTypes.number.isRequired,
  pressedButton: PropTypes.string.isRequired,
  showCompleted: PropTypes.func,
  showActive: PropTypes.func,
  showAll: PropTypes.func,
  deletCompleted: PropTypes.func,
};

export default Footer;
