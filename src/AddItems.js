
import React, { Component } from 'react';
import DisplayList from './DisplayList';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import CssBaseline from '@material-ui/core/CssBaseline';
var rand=require('random-key');

export default class AddList extends Component{


  constructor () {
    super();
    this.state = { title: '',
     todos:
      [
        {title:'eggs', done:false, id:1},
        {title:'banana', done:false, id:2},
        {title:'bread', done:false, id:3}
      ] };
  }
    updateInput(key, value) {
    this.setState({ [key]: value });

    localStorage.setItem(key, value);
    
  }

  handleDone(idToBeMarkedAsDone){
  var _todos=this.state.todos;
  var todo=_todos.filter((todo)=>{
    return todo.id===idToBeMarkedAsDone;
  })[0];
  todo.done=!todo.done;
  this.setState({
    todo:_todos
  });
  }
  handleDelete (idToBeDeleted) {
   
   
    var newTodos = this.state.todos.filter( (todo) => {
      return todo.id !== idToBeDeleted;
    } )
  
    alert("are u sure");

    this.setState({ todos: newTodos });

    localStorage.setItem("todos", JSON.stringify(newTodos));
  }

  handleSubmit (event) {
    event.preventDefault();
   

    var title = this.state.title;
    var newTodos = this.state.todos.concat(
      {title:title,
        id:rand.generate(),
        done:false});

    this.setState({ title: '', todos: newTodos });

    localStorage.setItem('todos', JSON.stringify(newTodos));
    localStorage.setItem("title","");
  }

  hydrateStateWithLocalStorage() {
    for (let key in this.state) {
      if (localStorage.hasOwnProperty(key)) {
        let value = localStorage.getItem(key);
        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          this.setState({ [key]: value });
        }
      }
    }
  }

  componentDidMount() {
    this.hydrateStateWithLocalStorage();
 }
 handleChange (event) {
    var title = event.target.value;
 
    this.setState({ title: title });
    
    
  }

  handleClearCompleted() {
    var newTodos=this.state.todos.filter((todos)=>{
      return !todos.done;
    });
    this.setState({
todos:newTodos
    });
    localStorage.setItem("todos", JSON.stringify(newTodos));
  }
  render () {
    return ( 
      <React.Fragment>
      <CssBaseline />
<AppBar position="static">
            <Toolbar>
                <Typography variant="title" color="inherit" alignitems= 'center'>
                    Daily notes
                </Typography>
            </Toolbar>
        </AppBar>
<div className="all">
              <form className="form" onSubmit={this.handleSubmit.bind(this)}>
              <div className="todo"> TODO-APP </div>
              <div className="test">
                <input className="values" onChange={this.handleChange.bind(this)} value={this.state.title} />
               <button className="addtask"disabled={!this.state.title}>ADD TASK</button>
              
               </div>
    
               <DisplayList className="displayList"
              handleDone={this.handleDone.bind(this)}
                handleDelete={this.handleDelete.bind(this)}
                todos={this.state.todos}  />
               <footer className="footer">Total:({this.state.todos.length})<br/>
              Done:({this.state.todos.filter((todo)=>
                {
                    return todo.done
                }).length})<br/>
                Remain:({this.state.todos.filter((todo)=>
                {
                    return !todo.done
                }).length})<br/>
                
                <button className="completed" onClick={this.handleClearCompleted.bind(this)}>Clear Done</button><br/>

                </footer>
                </form>
                </div>

</React.Fragment>

)
  }
}
