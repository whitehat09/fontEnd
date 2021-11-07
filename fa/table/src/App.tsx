import React,{ useState,useMemo } from 'react';
import Table from './components/Table';
import Pagination from './components/Pagination';
import SelectSort from './components/SelectSort';
import Search from './components/Search';
import getUsers from './data/users.json'
import TABLEI from './interfaces/TableInterface';

const App=()=> {
  const [dataTable,setDataTable] = useState<TABLEI[]>(getUsers);
  const [checkSort,setCheckSort]= useState(false);
  const [field,setField]= useState<string>('');
  const getField= (getField:string)=>(setField(getField));
  const [checkSearch,setCheckSearch]= useState(false);
  const [valueSearch,setValueSearch] = useState('');
  const [currentPage,setCurrentPage] = useState(1);
  
  const currentData = useMemo(()=>{
    let newDataTable = dataTable;
    if(checkSort){
      if(field==='id'){ 
        newDataTable = newDataTable.sort((a, b)=>( a.id - b.id));
        setCheckSort(false)
      }
      if(field==='Fist Name'){ 
        newDataTable = newDataTable.sort(function(a,b) {
          if ( a.firstName < b.firstName )
              return -1;
          if ( a.firstName > b.firstName )
              return 1;
          return 0;
      } );
        setCheckSort(false)
      }
      if(field==='Email'){ 
        newDataTable = newDataTable.sort(function(a,b) {
          if ( a.email < b.email )
              return -1;
          if ( a.email > b.email )
              return 1;
          return 0;
      } );
        setCheckSort(false)
      }
    if(field==='Salary'){
      newDataTable = newDataTable.sort((a, b)=>( a.salary - b.salary));
      setCheckSort(false)
    }
      if(field==='Birthday'){
        newDataTable = newDataTable.sort((a, b)=> {
          if(b.birthday >a.birthday) return 1;
         else if (b.birthday <a.birthday ) return -1;
         return 0;
      });
        setCheckSort(false)
      }
    }
    if(checkSearch){
      if(valueSearch===''){
        newDataTable = newDataTable;
      }
      else if(valueSearch!= ''){
        newDataTable =dataTable.filter((user) =>
                user.id.toString().includes(valueSearch.toLocaleLowerCase()) ||
                user.firstName.toLowerCase().includes(valueSearch.toLocaleLowerCase()) ||
                user.lastName.toLowerCase().includes(valueSearch.toLocaleLowerCase()) ||
                user.email.toLowerCase().includes(valueSearch.toLocaleLowerCase()) ||
                user.salary.toString().toLowerCase().includes(valueSearch.toLocaleLowerCase()) ||
                user.gender.toLowerCase().includes(valueSearch.toLocaleLowerCase()) ||
                user.phone.includes(valueSearch.toLocaleLowerCase()));
      }
    }
    if(currentPage){
      let total = 10;
      let skip = (currentPage-1)*total;
      let limit = currentPage*total;
      newDataTable =  newDataTable.slice(skip,limit);
    }
    return newDataTable;
  },[checkSort,checkSearch,currentPage]);
 
  const dataSearch = (valueSearch: string) =>{
    if(valueSearch==='') {
      setCheckSearch(false);
    }
    else if(valueSearch){
      setCheckSearch(true);
      setValueSearch(valueSearch);
    }
  };

  const getPagination = (valuePagination:string)=>{
   let limitPage= dataTable.length/10; 
   if(valuePagination==='pre'){
     if(currentPage==1){
      setCurrentPage(1)
     }else{
      let temp = currentPage -1 ;
      setCurrentPage(temp)
     }
   }
   else if(valuePagination==='next'){
    if(currentPage==limitPage){
      setCurrentPage(limitPage)
     }else{
      let temp = currentPage +1 ;
      setCurrentPage(temp)
     }
  }}
  return (
    <div className="container">
      <h2>A simple web app</h2>
      <SelectSort getField={getField} currentData={()=> setCheckSort(true)} />
      <Search  dataSearch={dataSearch} currentData={()=> setCheckSearch(true)}/>
      <Table  dataTable={currentData} />
      <Pagination  getPagination={getPagination} />
      
    </div>
  );
}
export default App;
