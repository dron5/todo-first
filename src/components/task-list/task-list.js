import React from 'react';
import PropTypes from 'prop-types';
import Task from '../task';
import './task-list.css'
import Footer from '../footer';

const TaskList = ({ todos, onDeleted, onEditButton,
                    onToggleCompleted, leftTodo, 
                    showAll, showActive, onEditForm,
                    showCompleted, deletCompleted
                    }) => {

    const elements = todos.map((item) => {
        const { id } = item;
        return (
            <Task { ...item }
                  onDeleted={() => {onDeleted(item.id)}}
                  onEditButton={() => {onEditButton(item.id)}}
                  onEditForm={ onEditForm }
                  onToggleCompleted={() => {onToggleCompleted(item.id)}}
                  key={ id }
                  date= { new Date(Date.now()) }
            />
        );
    });
    return (
        <section className="main">
            <ul className="todo-list">
                { elements }            
            </ul>
            <Footer 
                leftTodo={ leftTodo }
                showAll={ showAll }
                showActive={ showActive }
                showCompleted={ showCompleted }
                deletCompleted={ deletCompleted }
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
}

TaskList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.object),
    leftTodo: PropTypes.number,
    showAll: PropTypes.func,
    showActive: PropTypes.func,
    showCompleted: PropTypes.func,
    deletCompleted: PropTypes.func
}
export default TaskList;
