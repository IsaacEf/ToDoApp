import React, {useState, useEffect} from 'react';
import Task from './Task'
import { Button, FormControl, Input, InputLabel , Typography} from '@material-ui/core';
import './App.css';
import db from './firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { createTheme, ThemeProvider } from "@material-ui/core/styles";


function App() {
   
  const styles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const theme = createTheme({
    typography: {
      fontFamily: [
        "Nunito",
        "Roboto",
        "Helvetica Neue",
        "Arial",
        "sans-serif"
      ].join(",")
    }
  });

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
      <ThemeProvider theme={theme}>
      <Typography variant="h1">To Do List! </Typography>
      </ThemeProvider>
      <text>
         {"\n"}
      </text>
        
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
            <div style = {styles} className = 'task_'>
              <Task task = {task}/>
            </div>
          ))}
        </ul>
        
      </div>
    </div>
  );
}

export default App;
