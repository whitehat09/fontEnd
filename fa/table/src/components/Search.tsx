import React,{FunctionComponent as FC} from 'react';
import { FormEvent } from 'react';
import { useState } from "react";

interface Props {
    dataSearch(valueSearch: string): any;
    currentData(): any;
}
  
const Search : FC<Props>= ({dataSearch}) => {
    const [search,setSearch]= useState<string>('');
    const handleSubmit = (e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
       dataSearch(search);
        
    };
    return (
    <div>
        <form  onSubmit={handleSubmit}>
            <div className="form-group rounded-0 d-flex mt-2">
                <input 
                    className='form-control rounded-0' 
                    type="text" 
                    placeholder='Search... '
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                />
                    <button type="submit" className="btn btn-light">Search</button>
                
            </div>
        </form>
    </div>
    )
}
export default Search