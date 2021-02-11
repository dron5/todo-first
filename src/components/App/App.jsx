/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable react/state-in-constructor */
/* eslint-disable no-plusplus */
import React, { useState } from 'react';

import Header from '../Header';
import TaskList from '../TaskList';

import './app.css';

let maxId = 100;

const App = () => {
  const [todoData, setTodoData] = useState([]);
  const [pressedButton, setPressedButton] = useState('All');

  const addItem = (taskName, timeToComplete) => {
    const newTask = {
      label: taskName,
      edit: false,
      completed: false,
      id: maxId++,
      timeToComplete,
    };
    setTodoData(() => [...todoData, newTask]);
  };

  const deletItem = (id) => {
    setTodoData([...todoData.filter((el) => el.id !== id)]);
  };

  const toggleProperty = (taskToEdit, id, propName) => {
    const toggledProperty = taskToEdit.map((el) => (
      el.id === id ? { ...el, [propName]: !el[propName] } : el));
    return toggledProperty;
  };

  const onToggleCompleted = (id) => {
    setTodoData((todoData) => (
      [...toggleProperty(todoData, id, 'completed')]));
  };

  const editItemButton = (id) => {
    const [taskToEdit] = todoData.filter((el) => el.id === id);
    const alreadyEditTask = todoData.filter((el) => el.edit);
    if (!taskToEdit.completed && !alreadyEditTask.length) {
      setTodoData((todoData) => ([...toggleProperty(todoData, id, 'edit')]));
    }
  };

  const editItemForm = (id, text) => {
    const newData = todoData.map((el) => {
      if (el.id === id) {
        el.label = text;
        el.edit = false;
        return el;
      }
      return el;
    });
    setTodoData(() => [...newData]);
  };

  const onShowTasks = (name) => {
    setPressedButton(name.target.name);
  };

  const onDeletCompleted = () => {
    setTodoData([...todoData.filter((el) => !el.completed)]);
  };

  const completedCount = todoData
    .filter((el) => el.completed).length;
  const todoCount = todoData.length - completedCount;
  return (
    <section className="todoapp">
      <Header
        onAdded={addItem}
      />
      <TaskList
        todos={todoData}
        pressedButton={pressedButton}
        onDeleted={deletItem}
        onEditButton={editItemButton}
        onEditForm={editItemForm}
        onToggleCompleted={onToggleCompleted}
        leftTodo={todoCount}
        showTasks={onShowTasks}
        deletCompleted={onDeletCompleted}
      />
    </section>
  );
};

export default App;
// export default class App extends Component {
//   maxId = 100;

//   state = {
//     todoData: [
//       this.createItem('Completed task', 60),
//       this.createItem('Editing task', 60),
//       this.createItem('Active task', 60),
//     ],
//     pressedButton: 'All',
//   }

//   addItem = (taskName, timeToComplete) => {
//     const newTask = this.createItem(taskName, timeToComplete);
//     this.setState(({ todoData }) => ({
//       todoData: [...todoData, newTask],
//     }));
//   }

//   deletItem = (id) => {
//     const { todoData } = this.state;
//     this.setState({
//       todoData: [...todoData.filter((el) => el.id !== id)],
//     });
//   }

//   editItemButton = (id) => {
//     const { todoData } = this.state;
//     const [taskToEdit] = todoData.filter((el) => el.id === id);
//     const alreadyEditTask = todoData.filter((el) => el.edit);
//     if (!taskToEdit.completed && !alreadyEditTask.length) {
//       this.setState({
//         todoData: this.toggleProperty(todoData, id, 'edit'),
//       });
//     }
//   }

//   editItemForm = (id, text) => {
//     const { todoData } = this.state;
//     const newData = todoData.map((el) => {
//       if (el.id === id) {
//         el.label = text;
//         el.edit = false;
//         return el;
//       }
//       return el;
//     });
//     this.setState({
//       todoData: [...newData],
//     });
//   }

//   onToggleCompleted = (id) => {
//     this.setState(({ todoData }) => ({
//       todoData: this.toggleProperty(todoData, id, 'completed'),
//     }));
//   }

//   onShowTasks = (name) => {
//     this.setState({
//       pressedButton: name.target.name,
//     });
//   };

//   onDeletCompleted = () => {
//     const { todoData } = this.state;
//     this.setState({
//       todoData: [...todoData.filter((el) => !el.completed)],
//     });
//   }

//   toggleProperty = (taskToEdit, id, propName) => {
//     const toggledProperty = taskToEdit.map((el) => (
//       el.id === id ? { ...el, [propName]: !el[propName] } : el));
//     return toggledProperty;
//   }

//   createItem(label, timeToComplete) {
//     return {
//       label,
//       edit: false,
//       completed: false,
//       id: this.maxId++,
//       timeToComplete,
//     };
//   }

//   render() {
//     const { todoData, pressedButton } = this.state;
//     const completedCount = todoData
//       .filter((el) => el.completed).length;
//     const todoCount = todoData.length - completedCount;
//     return (
//       <section className="todoapp">
//         <Header
//           onAdded={this.addItem}
//         />
//         <TaskList
//           todos={todoData}
//           pressedButton={pressedButton}
//           onDeleted={this.deletItem}
//           onEditButton={this.editItemButton}
//           onEditForm={this.editItemForm}
//           onToggleCompleted={this.onToggleCompleted}
//           leftTodo={todoCount}
//           showTasks={this.onShowTasks}
//           deletCompleted={this.onDeletCompleted}
//         />
//       </section>
//     );
//   }
// }
