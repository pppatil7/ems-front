import React, { useEffect, useState } from 'react'
import { listEmployees } from '../services/EmpService'
import { useNavigate } from 'react-router-dom'

const EmpList = () => {

    const [employees, setEmployees] = useState([])

    const navigator = useNavigate();

    useEffect(() => {
        listEmployees().then((response) => {
            setEmployees(response.data)
        }).catch(error => {
            console.error(error);
        })
    }, [])

    function addNewEmp() {
        navigator('/add-employee')
    }

    function updateEmployee(empUserId){
        navigator(`/edit-employee/${empUserId}`)
    }

    return (
        <div className='container'>
            <h2 className='text-center'>List of Employees</h2>
            <button className='btn btn-primary mb-2' onClick={addNewEmp} >Add Employee</button>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email ID</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employees.map(employee =>
                            <tr key={employee.empUserId}>
                                <td>{employee.empUserId}</td>
                                <td>{employee.empFirstName}</td>
                                <td>{employee.empLastName}</td>
                                <td>{employee.empEmail}</td>
                                <td>
                                    <button className='btn btn-info' onClick={() => updateEmployee(employee.empUserId)} >Update</button>
                                </td>
                            </tr>
                        )
                    }
                    <tr></tr>
                </tbody>
            </table>
        </div>
    )
}

export default EmpList