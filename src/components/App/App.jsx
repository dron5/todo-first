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
        todoData: this.togglePropertySign(todoData, id,
          'edit', true),
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

  switchAllProps = (taskToEdit, prop, flag) => {
    taskToEdit.forEach((el) => {
      const idx = el.id;
      this.setState(({ todoData }) => ({
        todoData: this.togglePropertySign(todoData, idx,
          prop, flag),
      }));
    });
  }

  onShowAll = () => {
    const { todoData } = this.state;
    this.switchAllProps(todoData, 'visibility', true);
  };

  onShowActive = () => {
    const { todoData } = this.state;
    const toHide = todoData.filter((el) => el.completed);
    const toShow = todoData.filter((el) => !el.completed);
    this.switchAllProps(toHide, 'visibility', false);
    this.switchAllProps(toShow, 'visibility', true);
  };

  onShowCompleted = () => {
    const { todoData } = this.state;
    const toHide = todoData.filter((el) => !el.completed);
    const toShow = todoData.filter((el) => el.completed);
    this.switchAllProps(toHide, 'visibility', false);
    this.switchAllProps(toShow, 'visibility', true);
  };

  onDeletCompleted = () => {
    const { todoData } = this.state;
    const notCompletedTask = todoData.filter((el) => !el.completed);
    this.setState(() => ({
      todoData: [...notCompletedTask],
    }));
  }

  toggleProperty = (taskToEdit, id, propName) => {
    const idx = taskToEdit.findIndex((el) => el.id === id);

    const oldItem = taskToEdit[idx];
    const newItem = {
      ...oldItem,
      [propName]: !oldItem[propName],
    };
    return [
      ...taskToEdit.slice(0, idx),
      newItem,
      ...taskToEdit.slice(idx + 1),
    ];
  }

  togglePropertySign = (taskToEdit, id, propName, sign) => {
    const idx = taskToEdit.findIndex((el) => el.id === id);

    const oldItem = taskToEdit[idx];
    const newItem = {
      ...oldItem,
      [propName]: sign,
    };
    return [
      ...taskToEdit.slice(0, idx),
      newItem,
      ...taskToEdit.slice(idx + 1),
    ];
  }

  createItem(label) {
    return {
      label,
      edit: false,
      completed: false,
      visibility: true,
      id: this.maxId++,
    };
  }

  render() {
    const { todoData } = this.state;
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
          onDeleted={this.deletItem}
          onEditButton={this.editItemButton}
          onEditForm={this.editItemForm}
          onToggleCompleted={this.onToggleCompleted}
          leftTodo={todoCount}
          showAll={this.onShowAll}
          showActive={this.onShowActive}
          showCompleted={this.onShowCompleted}
          deletCompleted={this.onDeletCompleted}
        />
      </section>
    );
  }
}
