import React,{FunctionComponent as FC} from 'react';
import TODOI from '../interfaces/TodoInterface';

interface Props {
    todos : TODOI[];
    completeTodo(id:number): void;
    deleteTodo(id:number): void;
}

const List : FC<Props> = ({todos,completeTodo,deleteTodo}) => {
    return (
        <div className="col-md-5 mx-auto my-5 ">
            {
                todos.map((todo: TODOI,index: number) : any =>(
                    <div className='d-flex align-items-center justify-content-start w-100 list-item-todo' key={index} >
                        <h1 className={`text-center py-2 ${
                            todo.completed ? "completed" : 'notCompleted'}`} style={{width:'80%'}}
                            onClick={()=> completeTodo(todo.id) }
                            >
                            {todo.text}
                        </h1>
                        {
                            todo.completed && <button type='button' className='btn btn-danger' 
                            onClick={()=> deleteTodo(todo.id) }
                            >X</button>
                        }
                    </div>
                ))
            }
        </div>
    )
};

export default List;
