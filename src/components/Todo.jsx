import React, { useEffect, useState } from "react";
import { Button, makeStyles, TextField } from "@material-ui/core";
import List from "./List";
import db from "../config/firebase";
import firebase from 'firebase'
const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "#f1f1f1",
    height: 48,
    padding: "0, 50px",
  },
  mt: {
    margin: "2em auto",
  },
});
function Todo() {
  const classes = useStyles();
  const [todoItem, setTodoItem] = useState("");
  const [todoItems, setTodoItems] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if(todoItem){
        db.collection('tasks').add({
          text : todoItem,
          timestamp : firebase.firestore.FieldValue.serverTimestamp()
        })
        //reset the todoitem after settodoitem
        setTodoItem('')
    }
  };

  useEffect(() => {
    db.collection('tasks').orderBy('timestamp', 'desc').onSnapshot( snapshot => {
      setTodoItems(snapshot.docs.map(doc => ({id: doc.id, todo : doc.data().text}) ))
    })
  }, [])
  return (
    <>
      <div className={classes.mt}>
        <form onSubmit={handleSubmit}>
          <TextField
            autoFocus={true}
            label="Add new item"
            value={todoItem}
            onChange={(e) => setTodoItem(e.target.value)}
          />
          <Button
            className={classes.root}
            variant="contained"
            color="primary"
            type="submit"
          >
            Add New
          </Button>
        </form>
      </div>
      {
          todoItems.map((item, index) => <List key={index} item={item} />)
      }

    </>
  );
}
export default Todo;
