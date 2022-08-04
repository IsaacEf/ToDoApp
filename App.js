import React, {useState} from 'react';
import Task from './Task'
import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import './App.css';
import db from './firebase';
import {useEffect} from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';



function App() {
   
  const styles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

  };

  //Short term memory
  const [tasks, setTasks] = useState([]);
  //List should be empty initially
  const [input, setInput] = useState('');
  
  useEffect(() => {
    //When app loads execute this
    db.collection('tasks').orderBy('timestamp','desc').onSnapshot(snapshot => { 
      setTasks(snapshot.docs.map(doc =>  ({id: doc.id ,task: doc.data().task})))
    })
  }, []);

  const addTask = (event) => {
    //Prevent the page from refresh
    event.preventDefault();

    //Add to db, fire off snapshot, updates list
    db.collection('tasks').add({
      task: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    //Reset the button field
    setInput('');
    
  }

  return (
    <div className = 'bg_'>
      <div className="App">
        <h1>To do list!</h1>
        
        <form>
        
          <FormControl>
            
            <InputLabel>Enter a task</InputLabel>
              <Input value = {input} onChange ={event => setInput(event.target.value)}/>
      
          </FormControl>

          <Button disabled = {!input} type = "submit" onClick = {addTask} variant="contained" color="primary">
            Add Task
          </Button>
          {/* <button type = "submit" onClick = {addTask}>Add Task</button> */}
        </form>
      
        <ul>
          {tasks.map(task => (
            //Get data from the task component
            <div style = {styles}>
              <Task task = {task}/>
            </div>
          ))}
        </ul>
        
      </div>
    </div>
  );
}

export default App;
