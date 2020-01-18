import React from 'react';
import TodoItem from './TodoItem';
import { connect } from 'react-redux';
import { tryToggleTodo, tryDeleteTodo, fetchTodo} from "../store/actions";
import { filteredTodoDataSelector } from '../store/selectors';

class TodoList extends React.Component {
  constructor(props){
    super(props);
    props.fetchTodo()
  }

  render(){
    const {todos,tryDeleteTodo,tryToggleTodo} = this.props;
    return (
      <ul className="list-group">
        { todos && todos.map((t,i) => 
          <TodoItem 
          key={t.name} 
          todo={t} 
          toggleTodo={() => tryToggleTodo(i)} 
          deleteTodo={()=>  tryDeleteTodo(i)} />
        )}
      </ul>
    )
  }
} 

export default connect((state,ownProps) => {
  const filter = ownProps.match.params.filter;
  return {
    todos : filteredTodoDataSelector(state,filter)
  };
}, {
  tryToggleTodo,
  tryDeleteTodo,
  fetchTodo
})(TodoList);
