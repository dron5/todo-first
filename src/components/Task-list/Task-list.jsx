import React from 'react';
import PropTypes from 'prop-types';
import Task from '../Task';
import './Task-list.css';
import Footer from '../Footer';

const TaskList = ({
  todos, onDeleted, onEditButton,
  onToggleCompleted, leftTodo,
  showAll, showActive, onEditForm,
  showCompleted, deletCompleted, pressedButton,
}) => {
  const elements = todos.map((item) => {
    const {
      id, label, edit, completed,
    } = item;

    return (
      <Task
        label={label}
        edit={edit}
        id={id}
        completed={completed}
        pressedButton={pressedButton}
        onDeleted={() => { onDeleted(item.id); }}
        onEditButton={() => { onEditButton(item.id); }}
        onEditForm={onEditForm}
        onToggleCompleted={() => { onToggleCompleted(item.id); }}
        key={id}
        date={new Date(Date.now())}
      />
    );
  });
  return (
    <section className="main">
      <ul className="todo-list">
        { elements }
      </ul>
      <Footer
        leftTodo={leftTodo}
        pressedButton={pressedButton}
        showAll={showAll}
        showActive={showActive}
        showCompleted={showCompleted}
        deletCompleted={deletCompleted}
      />
    </section>
  );
};

TaskList.defaultProps = {
  leftTodo: () => {},
  showAll: () => {},
  showActive: () => {},
  showCompleted: () => {},
  deletCompleted: () => {},
};

TaskList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  leftTodo: PropTypes.number,
  pressedButton: PropTypes.string.isRequired,
  showAll: PropTypes.func,
  showActive: PropTypes.func,
  showCompleted: PropTypes.func,
  deletCompleted: PropTypes.func,
  onDeleted: PropTypes.func.isRequired,
  onEditButton: PropTypes.func.isRequired,
  onToggleCompleted: PropTypes.func.isRequired,
  onEditForm: PropTypes.func.isRequired,
};
export default TaskList;
