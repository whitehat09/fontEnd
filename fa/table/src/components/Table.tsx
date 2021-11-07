import React,{FunctionComponent as FC} from 'react';

import moment from 'moment'
import TABLEI from '../interfaces/TableInterface';
interface Props {
    dataTable: TABLEI[];
}

const Table : FC<Props>= ({dataTable}) => {
    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Birthday</th>
                        <th scope="col">Salary</th>
                        <th scope="col">Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {dataTable.map((user:TABLEI): any =>(
                    <tr key={user.id}>
                        <th scope="row">{user.id}</th>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.email}</td>
                        <td>{user.gender}</td>
                        <td>{moment(user.birthday).format('DD/MM/YYYY')}</td>
                        <td>{user.salary}</td>
                        <td> (+84)<span>{user.phone.split('-')}</span></td>
                    </tr>
                    ))
                    }
                </tbody>
            </table>
        </div>
    )
}
export default Table
