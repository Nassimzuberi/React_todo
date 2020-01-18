import * as actions from'./actions';


export const todosReducer = (state = {
    data: [],
    loading:false,
    error:null,
},action) => {
    switch(action.type){
        case actions.ADD_TODO_SUCCESS : {
            return {
                ...state,
                data : [...state.data,action.todo]
            };
        }
        case actions.ADD_TODO_ERROR: {
            return {
                ...state,
                error:action.error
            }
        }
        case actions.DELETE_TODO_SUCCESS: {
            return {
                ...state,
                data : state.data.filter((t,i) => i !== action.index)
            }
        }
        case actions.DELETE_TODO_SUCCESS: {
            return {
                ...state,
                error: action.error
            }
        }
        case actions.TOOGLE_TODO_SUCCESS: {
            return {
                ...state,
                data : state.data.map( (t,i) =>   i === action.index ? {...t,done : !t.done} : t)
            }
        }
        case actions.TOOGLE_TODO_ERROR: {
            return {
                ...state,
                error : action.error
            }
        }
        case actions.REQUEST_TODO: {
            return {
                ...state,
                loading: true
            }
        }
        case actions.FETCH_TODO_SUCCESS : {
            if (action.todos){
                return {
                    ...state,
                    data: [...state.data,...action.todos],
                    loading:false,
                    error:null,
                }
            }
            else {
                return {
                    ...state,
                    loading:false,
                }
            }

        }
        case actions.FETCH_TODO_ERROR : {
            return {
                ...state,
                loading:false,
                error:action.error,
            }
        }
        default : {
            return state
        }
    }
}

//export const todosReducer = (state,action) => {
    //return {
      //  todos: todoReducer(state.todos,action),
        //filter: filterReducer(state.filter,action),
    //}
//}

