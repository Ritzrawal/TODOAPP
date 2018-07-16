import React, { Component } from 'react';
//import React from 'react'
import DisplayItem from './DisplayItem';


export default class DisplayList extends Component {

    render () {
        return  <ul>
                  { this.props.todos.map((todo,index) => {
                      return  (  <DisplayItem
                      key={todo.id}
                      handleDelete={this.props.handleDelete.bind(null,todo.id)}
                      handleDone={this.props.handleDone}
                      todo={todo}/>

                      )
                   
                  }) }
              
             
                </ul>;
      }
    
    }
