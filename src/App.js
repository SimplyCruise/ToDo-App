import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck, faPen, faTrashCan
} from '@fortawesome/free-solid-svg-icons'


import './App.css';

const App = () => {

  const [list, setList] = useState([
  ]);


  const [input, setInput] = useState("");
  const [updateData, setUpdateData] = useState('')

  const addTodo = (todo) => {
    /* const newTodo = {
       id: Math.random(),
       todo: todo,*/
    if (input) {
      let num = list.length + 1;
      let newEntry = { id: num, title: input, status: false }
      setList([...list, newEntry])
      setInput('');
    }
  };

  /* setList([...list, newTodo]);
 
   setInput("");*/



  const deleteTodo = (id) => {
    let input = list.filter((todo) => todo.id !== id)
    setList(input);
  }

  const markDone = (id) => {
    let input = list.map(task => {
      if (task.id === id) {
        return ({ ...task, status: !task.status })
      }
      return task;
    })
    setList(input);

  }

  const cancelTodo = () => {
    setUpdateData('');
  }

  const changeTask = (e) => {
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false
    }
    setUpdateData(newEntry);
  }

  const updateTask = (e) => {
    let filterRecords = [...list].filter(task => task.id !== updateData.id);
    let updatedObject = [...filterRecords, updateData]
    setList(updatedObject);
    setUpdateData('');
  }

  return (

    <div className="container App">

      <br /><br />
      <h1>To Do List App</h1>
      <br /><br />

      {updateData && updateData ? (
        
          <div className="row">
            <div className='col'>
              <input
                value={updateData && updateData.title}
                onChange={(e) => changeTask(e)}
                className='form-control form-control-lg' />
            </div>
            <div className='col-auto'>
              <button
                onClick={updateTask}
                className='btn btn-lg btn-success mr-20'>Update</button>
              <button
              onClick={cancelTodo}
                className='btn btn-lg btn-warning'>
                cancel
              </button>
            </div>
          </div>
      
      
      ) : (
        
          <div className='row'>
            <div className='col'>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className='form-control form-control -lg' />
            </div>
            <div className='col-auto'>
              <button
                onClick={addTodo}
                className='btn btn-lg btn-success'>Add Task
              </button>
            </div>
          </div>
      
      )}



      {list && list.length ? '' : 'No Task Added Yet....'}

      {list && list
        .sort((a, b) => a.id > b.id ? 1 : -1)
        .map((task, index) => {
          return (
            <React.Fragment key={task.id}>
              <div className='col taskBg'>

                <div className={task.status ? 'done' : ''}>
                  <span className='taskNumber'>{index + 1}</span>
                  <span className='taskText'>{task.title}</span>
                </div>
                <div className="iconsWrap" >
                  <span title='completed / Not completed '
                    onClick={(e) => markDone(task.id)}>
                    <FontAwesomeIcon icon={faCircleCheck} />
                  </span>

                  {task.status ? null : (
                    <span title='Edit'
                      onClick={() => setUpdateData({
                        id: task.id,
                        title: task.title,
                        status: task.status ? true : false
                      })}>
                      <FontAwesomeIcon icon={faPen} />
                    </span>
                  )}

                  <span title='Delete'
                    onClick={() => deleteTodo(task.id)}
                  >
                    <FontAwesomeIcon icon={faTrashCan} />
                  </span>
                </div>
              </div>

            </React.Fragment>
          )
        })
      }
    </div>

    /*  <div class="form">
        <h1>To Do List App</h1>
        <div class="formcard">
          <div class="card">
            <input class="text"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
   
            <button onClick={() => addTodo(input)}>Add</button>
            <ul>
              {list.map((todo) => (
                <li key={todo.id}>
                  {todo.todo}
                  <button onClick={() => deleteTodo(todo.id)}>&times;</button>
                </li>
              ))}
            </ul>
          </div>
   
        </div>
      </div>*/
  );
}


export default App
