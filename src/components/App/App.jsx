/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable react/state-in-constructor */
/* eslint-disable no-plusplus */
import React, { Component } from 'react';

import Header from '../Header';
import TaskList from '../Task-list';

import './app.css';

export default class App extends Component {
  maxId = 100;

  state = {
    todoData: [
      this.createItem('Completed task'),
      this.createItem('Editing task'),
      this.createItem('Active task'),
    ],
    pressedButton: 'All',
  }

  addItem = (text) => {
    const newTask = this.createItem(text);
    this.setState(({ todoData }) => ({
      todoData: [...todoData, newTask],
    }));
  }

  deletItem = (id) => {
    const { todoData } = this.state;
    this.setState(() => ({
      todoData: [...todoData.filter((el) => el.id !== id)],
    }));
  }

  editItemButton = (id) => {
    const { todoData } = this.state;
    const [taskToEdit] = todoData.filter((el) => el.id === id);
    const alreadyEditTask = todoData.filter((el) => el.edit);
    if (!taskToEdit.completed && !alreadyEditTask.length) {
      this.setState(() => ({
        todoData: this.toggleProperty(todoData, id, 'edit'),
      }));
    }
  }

  editItemForm = (id, text) => {
    const { todoData } = this.state;
    const newData = todoData.map((el) => {
      if (el.id === id) {
        el.label = text;
        el.edit = false;
        return el;
      }
      return el;
    });
    this.setState(() => ({
      todoData: [...newData],
    }));
  }

  onToggleCompleted = (id) => {
    this.setState(({ todoData }) => ({
      todoData: this.toggleProperty(todoData, id, 'completed'),
    }));
  }

  onShowTasks = (name) => {
    this.setState(() => ({
      pressedButton: name.target.name,
    }));
  };

  onDeletCompleted = () => {
    const { todoData } = this.state;
    this.setState(() => ({
      todoData: [...todoData.filter((el) => !el.completed)],
    }));
  }

  toggleProperty = (taskToEdit, id, propName) => {
    const toggledProperty = taskToEdit.map((el) => (
      el.id === id ? { ...el, [propName]: !el[propName] } : el));
    return toggledProperty;
  }

  createItem(label) {
    return {
      label,
      edit: false,
      completed: false,
      id: this.maxId++,
    };
  }

  render() {
    const { todoData, pressedButton } = this.state;
    const completedCount = todoData
      .filter((el) => el.completed).length;
    const todoCount = todoData.length - completedCount;
    return (
      <section className="todoapp">
        <Header
          onAdded={this.addItem}
        />
        <TaskList
          todos={todoData}
          pressedButton={pressedButton}
          onDeleted={this.deletItem}
          onEditButton={this.editItemButton}
          onEditForm={this.editItemForm}
          onToggleCompleted={this.onToggleCompleted}
          leftTodo={todoCount}
          showTasks={this.onShowTasks}
          deletCompleted={this.onDeletCompleted}
        />
      </section>
    );
  }
}
