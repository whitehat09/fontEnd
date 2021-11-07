import React,{FunctionComponent as FC} from 'react'
import { FormEvent } from 'react';
//import { HTMLFormtElement } from 'react';

import { useState } from "react";
import TODOI from '../interfaces/TodoInterface';

interface Props {
    addTodo(todo: string) : void;
}

const Form: FC<Props> = ({addTodo}) => {

    const [todo,setTodo]= useState<string>('');
    const handleSubmit = (e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(!todo)return window.alert('Bạn chưa thêm nội dung cần nhớ!');
        
        addTodo(todo);
        setTodo('');
    };
    return (
        <div className="col-md-6 mx-auto my-5">
            <form onSubmit={handleSubmit}>
                <div className="form-group rounded-0 d-flex">
                    <input 
                        className='form-control rounded-0' 
                        type="text" 
                        placeholder='Input to do '
                        value={todo}
                        onChange={(e)=>setTodo(e.target.value)}
                    />
                    <button className=' btn-add-todo' type='submit'>
                    <i className="fas fa-plus"></i>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Form
