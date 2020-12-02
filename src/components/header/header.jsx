import React from 'react';

import NewTaskForm from '../new-task-form';
// import './header.css'

const Header = ({ onAdded }) => (
  <header className="header">
    <h1>todos</h1>
    <NewTaskForm onAdded={onAdded} />
  </header>
);

export default Header;
