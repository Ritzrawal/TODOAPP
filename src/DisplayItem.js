import React, { Component } from 'react';
export default class DisplayItem extends Component {

   constructor(){
       super();
       this.state={
           editing:false,
           startId:"",
          

       };
   }

componentDidMount(){
  
    this.setState({
        changedText:this.props.todo.title
    });
}




handleEditing(event){
this.setState({
    editing:true,
    changedText:this.props.todo.title
});


}

handleEditingDone(event){
    console.log("editing is done");
    if(event.keyCode===13){
        this.setState({
            editing:false
        });
       
    }
}

handleEditingChange(event){
   var _changedText= event.target.value;
   this.setState({
       changedText:_changedText
   });
   localStorage.setItem("changedText", JSON.stringify(_changedText));
}
dragEnd = (event) => {
    this.setState({targetbox: null})
  }
dragStart = (event) => {
    event.dataTransfer.setData("text", event.target.id)
    this.setState({targetbox: true})
  }
drop = (event) => {
    if (event.target.id) {
      this.props.swap(event.dataTransfer.getData("text"), event.target.id)
      event.dataTransfer.clearData()
    }
  }
  

render(){
    var changedText=this.state.changedText;
    var todo=this.props.todo;

    var viewStyle={};
    var editStyle={};

    if(this.state.editing){
        viewStyle.display='none';
    }else{
        editStyle.display='none';
    }
   
        return (<li className={ todo.done ? 'done' : '' }>

<div className="style" draggable="true" id={title } onDragOver={(e)=>this.allowDrop(e)} onDragStart={dragStart(event)} onDrop={drop(event)} style={viewStyle} onDoubleClick={this.handleEditing.bind(this)}>
    <div >


        <input className="checkbox"
        type="checkbox" id ="confirm"style={{
            fontSize:'x-large'}}
            
            checked={todo.done}
            onChange={this.props.handleDone.bind(null,todo.id)}/>
            
            
          <label className="todoItems">

          {changedText} 
          


          </label>
          </div>
         
     
          <button className="delete" id="reset"href='#' onClick={this.props.handleDelete.bind(null,todo.id)}>
              Delete
              </button>
              </div>

              <input type="text" className="displayitem"
              onKeyDown={this.handleEditingDone.bind(this)}
              onChange={this.handleEditingChange.bind(this)}
              style={editStyle}
              value={this.state.changedText}/>
       </li>
        )}
}
