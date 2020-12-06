/* eslint-disable no-plusplus */
import React, { Component } from 'react';
// import { setTimeout } from 'timers';

import Header from '../header';
import TaskList from '../task-list';

import './app.css';

export default class App extends Component {
  maxId = 100;

  constructor(props) {
    super(props);
    this.state = {
      todoData: [
        this.createItem('Completed task'),
        this.createItem('Editing task'),
        this.createItem('Active task'),
      ],
    };
  }

  // state = {
  //   todoData: [
  //     this.createItem('Completed task'),
  //     this.createItem('Editing task'),
  //     this.createItem('Active task'),
  //   ],
  // }

  addItem = (text) => {
    const newTask = this.createItem(text);
    this.setState(({ todoData }) => {
      const newTodoData = [
        ...todoData, newTask,
      ];
      return {
        todoData: newTodoData,
      };
    });
  }

  deletItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newTodoData = [
        ...todoData.slice(0, idx),
        ...todoData.slice(idx + 1),
      ];
      return {
        todoData: newTodoData,
      };
    });
  }

  editItemButton = (id) => {
    this.setState(({ todoData }) => ({
      todoData: this.togglePropertySign(todoData, id,
        'edit', true),
    }));
  }

  editItemForm = (id, text) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const oldItem = todoData[idx];
      const newItem = {
        ...oldItem,
        label: text,
      };
      const newTodo = [
        ...todoData.slice(0, idx),
        newItem,
        ...todoData.slice(idx + 1),
      ];
      return {
        todoData: newTodo,
      };
    });
    this.setState(({ todoData }) => ({
      todoData: this.togglePropertySign(todoData,
        id, 'edit', false),
    }));
  }

  onToggleCompleted = (id) => {
    this.setState(({ todoData }) => ({
      todoData: this.toggleProperty(todoData, id, 'completed'),
    }));
  }

  switchAllProps = (arr, prop, flag) => {
    arr.forEach((el) => {
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
    this.setState({ todoData: [...notCompletedTask] });
  }

  // если не работает, сделать внизу как было
  toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((el) => el.id === id);

    const oldItem = arr[idx];
    const newItem = {
      ...oldItem,
      [propName]: !oldItem[propName],
    };
    return [
      ...arr.slice(0, idx),
      newItem,
      ...arr.slice(idx + 1),
    ];
  }

  togglePropertySign = (arr, id, propName, sign) => {
    const idx = arr.findIndex((el) => el.id === id);

    const oldItem = arr[idx];
    const newItem = {
      ...oldItem,
      [propName]: sign,
    };
    return [
      ...arr.slice(0, idx),
      newItem,
      ...arr.slice(idx + 1),
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
