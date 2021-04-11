import { makeStyles } from "@material-ui/styles";
import "./App.css";
import Todo from "./components/Todo";

const useStyles = makeStyles({
  root : {
    marginTop : '3em',
    textAlign : 'center'
  }
})

function App() {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <h1>Real-Time TODO App 🚀</h1>
      <Todo />
    </div>
  );
}
export default App;
