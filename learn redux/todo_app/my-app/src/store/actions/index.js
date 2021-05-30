export const ADD_TODO = 'ADD_TODO';

export const addTodo = (todo = {}) => {
    return {
        todo,
        type: ADD_TODO
    }
}