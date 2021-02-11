import React from 'react';
import PropTypes from 'prop-types';

import NewTaskForm from '../NewTaskForm';
// import './header.css'

const Header = ({ onAdded }) => (
  <header className="header">
    <h1>todos</h1>
    <NewTaskForm onAdded={onAdded} />
  </header>
);

Header.defaultProps = {
  onAdded: () => {},
};

Header.propTypes = {
  onAdded: PropTypes.func,
};

export default Header;
