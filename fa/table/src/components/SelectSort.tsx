import React,{FunctionComponent as FC} from 'react';

interface Props {
  currentData(): any;
  getField(field:string):any;
}

const SelectSort : FC<Props>= ({currentData,getField}) => {
    return (
    <div>
      <div className="dropdown d-flex flex-row">
        <h2>OrderBy</h2>
        <button className="btn  dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Select field to sort
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a className="dropdown-item" 
              onClick={()=>{ 
                getField('id')
                return currentData()}}
            >id</a>
            <a className="dropdown-item" onClick={()=>{ 
                getField('Fist Name')
                return currentData()}}>Fist Name</a>
            <a className="dropdown-item" onClick={()=>{ 
                getField('Email')
                return currentData()}}>Email</a>
            <a className="dropdown-item" onClick={()=>{ 
                getField('Birthday')
                return currentData()}}>Birthday</a>
            <a className="dropdown-item" onClick={()=>{ 
                getField('Salary')
                return currentData()}}>Salary</a>
        </div>
        </div>
    </div>
    )
}
export default SelectSort
