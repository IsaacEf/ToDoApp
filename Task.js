import React , {useState} from 'react'
import {List, ListItemAvatar, ListItem, ListItemText, Modal, Button} from '@material-ui/core' ;
import db from './firebase';
import {makeStyles} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";


const useStyles = makeStyles((theme) => ({
    paper:{
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2,4,3),
    },
}));

function Task(props) {
    
    const classes = useStyles();
    const [open,setOpen] = useState(false);
    const [input,setInput] = useState();

    const updateTask = () => {
        db.collection('tasks').doc(props.task.id).set({
            task: input
        }, { merge: true });

        setOpen(false);
    }

    return (
    
    <>
    <Modal
        open = {open}
        onClose = {e => setOpen(false)}
    >
        <div className = {classes.paper}>
            <h1>Edit Task</h1>
            <input placeholder = {props.task.task} value = {input} onChange = {event => setInput(event.target.value)}/>
            <Button onClick = {updateTask}>Update</Button>     
        </div>
    </Modal>
    <List>
      <ListItem>
      <ListItemAvatar>
      </ListItemAvatar>
        <ListItemText primary = {props.task.task}  />
      </ListItem>
      <Grid container justify = "left">
        <Button onClick = {e => setOpen(true)} variant="outlined" color="primary" >📝 Edit 📝  </Button>
      <Button onClick = {event => { db.collection('tasks').doc(props.task.id).delete()}} variant="outlined" color="secondary">
        ❌ Delete Task ❌
      </Button>
      </Grid>
    </List>
    </>
  )
}

export default Task