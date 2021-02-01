import React from 'react';
import PropTypes from 'prop-types';
import Task from '../Task';
import './Task-list.css';
import Footer from '../Footer';

const TaskList = ({
  todos, onDeleted, onEditButton,
  onToggleCompleted, leftTodo, showTasks,
  onEditForm, deletCompleted, pressedButton,
}) => {
  const elements = todos.map((item) => {
    const {
      id, label, edit, completed, timeToComplete,
    } = item;

    return (
      <Task
        label={label}
        edit={edit}
        id={id}
        completed={completed}
        timeToComplete={timeToComplete}
        pressedButton={pressedButton}
        onDeleted={() => { onDeleted(item.id); }}
        onEditButton={() => { onEditButton(item.id); }}
        onEditForm={onEditForm}
        onToggleCompleted={() => { onToggleCompleted(item.id); }}
        key={id}
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
        showTasks={showTasks}
        deletCompleted={deletCompleted}
      />
    </section>
  );
};

TaskList.defaultProps = {
  leftTodo: () => { },
  showTasks: () => { },
  deletCompleted: () => { },
};

TaskList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  leftTodo: PropTypes.number,
  pressedButton: PropTypes.string.isRequired,
  deletCompleted: PropTypes.func,
  showTasks: PropTypes.func,
  onDeleted: PropTypes.func.isRequired,
  onEditButton: PropTypes.func.isRequired,
  onToggleCompleted: PropTypes.func.isRequired,
  onEditForm: PropTypes.func.isRequired,
};
export default TaskList;
