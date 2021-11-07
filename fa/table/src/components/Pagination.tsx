import React,{FunctionComponent as FC} from 'react';

interface Props {
    getPagination(valuePagination: string): any;  
}
const Pagination : FC<Props>= ({getPagination}) => {
    return (
        <div>
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                    <li className="page-item ">
                        <a className="page-link" onClick={()=>( getPagination('pre') )}  >
                            Previous
                        </a>
                    </li>
                    <li className="page-item">
                        <a className="page-link"
                        onClick={()=>( getPagination('next'))}
                        >Next</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
export default Pagination
