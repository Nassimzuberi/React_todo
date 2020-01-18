import {default as apiFirebase} from '../../../config/api.firebase';

export const TRY_DELETE_TODO = 'try delete todo';
export const DELETE_TODO_SUCCESS = 'delete todo success';
export const DELETE_TODO_ERROR = 'delete todo error';

export const TRY_TOOGLE_TODO = 'try toggle todo';
export const TOOGLE_TODO_SUCCESS = 'toggle todo success';
export const TOOGLE_TODO_ERROR = 'toggle todo error';

export const TRY_ADD_TODO = 'try add todo';
export const ADD_TODO_SUCCESS = 'add todo success';
export const ADD_TODO_ERROR = 'add todo error';

export const REQUEST_TODO = 'request todo';
export const FETCH_TODO = 'fetch todo';
export const FETCH_TODO_SUCCESS = 'fetch todo success';
export const FETCH_TODO_ERROR = 'fetch todo error';

export const tryAddTodo = (todo) => {
    return (dispatch,getState) => {
        const todos = [...getState().todos.data,todo];
        return apiFirebase.put('todos.json',todos).then(
            response => dispatch(addTodoSuccess(todo)),
            error => dispatch(addTodoError(error))
        )
    }
}

export const addTodoSuccess = (todo) => {
    return {
        type: ADD_TODO_SUCCESS,
        todo
    }

}

export const addTodoError = (error) => {
    return {
        type: ADD_TODO_ERROR,
        error
    }
}
export const tryDeleteTodo = (index) => {
    return (dispatch,getState) => {
        const todos = getState().todos.data.filter((t,i) => index !== i);
        return apiFirebase.put('todos.json',todos).then(
            response => dispatch(deleteTodoSuccess(index)),
            error => dispatch(deleteTodoError(error))
        )
    }
}
export const tryToggleTodo = (index) => {
    return (dispatch,getState) => {
        const todos = getState().todos.data.map( (t,i) =>   i === index ? {...t,done : !t.done} : t);
        return apiFirebase.put('todos.json',todos).then(
            response => dispatch(toggleTodoSuccess(index)),
            error => dispatch(toggleTodoError(error))
        )
    }
}

export const deleteTodoSuccess = (index) => {
    return {
        type: DELETE_TODO_SUCCESS,
        index
    }
}
export const deleteTodoError = (error) => {
    return {
        type: DELETE_TODO_ERROR,
        error
    }
}

export const toggleTodoSuccess = (index) => {
    return {
        type: TOOGLE_TODO_SUCCESS,
        index
    }
}
export const toggleTodoError = (error) => {
    return {
        type: TOOGLE_TODO_ERROR,
        error
    }
}
export const requestTodo = () => {
    return {
        type: REQUEST_TODO
    }
}
export const fetchTodoSuccess = (todos) => {
    return {
        type: FETCH_TODO_SUCCESS,
        todos
    }
}

export const fetchTodoError = (error) => {
    return {
        type: FETCH_TODO_ERROR,
        error
    }
}

export const fetchTodo = () => {
    return (dispatch) => {
        dispatch(requestTodo());
        return apiFirebase.get('todos.json').then(
            (response) => {
                const data = response.data;
                dispatch(fetchTodoSuccess(data));
            },
            (error) => {
                dispatch(fetchTodoError(error));
            }
        )
    }
}