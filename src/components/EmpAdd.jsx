import React, { useState } from 'react'
import { createEmployee } from '../services/EmpService'
import { useNavigate } from 'react-router-dom'

const EmpAdd = () => {

  const [empFirstName, setEmpFirstName] = useState('')
  const [empLastName, setEmpLastName] = useState('')
  const [empEmail, setEmpEmail] = useState('')



  const handleEmpFirstName = (e) => setEmpFirstName(e.target.value);

  const handleEmpLastName = (e) => setEmpLastName(e.target.value);

  const handleEmpEmail = (e) => setEmpEmail(e.target.value);

  const [errors, setErrors] = useState({
    empFirstName: '',
    empLastName: '',
    empEmail: ''
  })

  const navigator = useNavigate();

  function saveEmployee(e) {
    e.preventDefault();

    if (validateForm()) {
      const employee = { empFirstName, empLastName, empEmail };
      console.log(employee)

      createEmployee(employee).then((response) => {
        console.log(response.data);
        navigator('/employees')
      })
    }


  }

  function validateForm() {
    let valid = true;

    const errorsCopy = { ...errors }

    if (empFirstName.trim()) {
      errorsCopy.empFirstName = '';
    } else {
      errorsCopy.empFirstName = 'First Name is required';
      valid = false;
    }

    if (empLastName.trim()) {
      errorsCopy.empLastName = '';
    } else {
      errorsCopy.empLastName = 'Last Name is required';
      valid = false;
    }

    if (empEmail.trim()) {
      errorsCopy.empEmail = '';
    } else {
      errorsCopy.empEmail = 'Email ID is required';
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;

  }

  return (
    <div className='container' >
      <br></br>
      <div className='row' >
        <div className='card col-md-6 offset-md-3 offset-md-3' >
          <h2 className='text-center' >Add Employee</h2>
          <div className='card-body'>
            <form>
              <div className='form-group mb-2'>
                <label className='form-label' >First Name</label>
                <input type='text'
                  placeholder='Enter First Name'
                  name='empFirstName'
                  value={empFirstName}
                  className={`form-control ${errors.empFirstName ? 'is-invalid' : ''}`}
                  onChange={handleEmpFirstName} >
                </input>
                {errors.empFirstName && <div className='invalid-feedback'>{errors.empFirstName}</div>}
              </div>
              <div className='form-group mb-2'>
                <label className='form-label' >Last Name</label>
                <input type='text'
                  placeholder='Enter Last Name'
                  name='empLastName'
                  value={empLastName}
                  className={`form-control ${errors.empLastName ? 'is-invalid' : ''}`}
                  onChange={handleEmpLastName} >
                </input>
                {errors.empLastName && <div className='invalid-feedback'>{errors.empLastName}</div>}
              </div>
              <div className='form-group mb-2'>
                <label className='form-label' >Email ID</label>
                <input type='text'
                  placeholder='Enter Email ID'
                  name='empEmail'
                  value={empEmail}
                  className={`form-control ${errors.empEmail ? 'is-invalid' : ''}`}
                  onChange={handleEmpEmail} >
                </input>
                {errors.empEmail && <div className='invalid-feedback'>{errors.empEmail}</div>}
              </div>

              <button className='btn btn-success' onClick={saveEmployee}>Submit</button>

            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmpAdd