import React, { useEffect, useState } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../services/EmpService'
import { useNavigate, useParams } from 'react-router-dom'

const EmpAdd = () => {

  const [empFirstName, setEmpFirstName] = useState('')
  const [empLastName, setEmpLastName] = useState('')
  const [empEmail, setEmpEmail] = useState('')



  const handleEmpFirstName = (e) => setEmpFirstName(e.target.value);

  const handleEmpLastName = (e) => setEmpLastName(e.target.value);

  const handleEmpEmail = (e) => setEmpEmail(e.target.value);

  const { empUserId } = useParams();

  const [errors, setErrors] = useState({
    empFirstName: '',
    empLastName: '',
    empEmail: ''
  })

  const navigator = useNavigate();

  useEffect(() => {
    if (empUserId) {
      getEmployee(empUserId).then((response) => {
        setEmpFirstName(response.data.empFirstName);
        setEmpLastName(response.data.empLastName);
        setEmpEmail(response.data.empEmail);
      }).catch(error => {
        console.error(error);
      })
    }


  }, [empUserId])

  function saveOrUpdateEmployee(e) {
    e.preventDefault();

    if (validateForm()) {

      const employee = { empFirstName, empLastName, empEmail };
      console.log(employee)

      if (empUserId) {
        updateEmployee(empUserId, employee).then((response) => {
          console.log(response.data);
          navigator('/employees')
        }).catch(error => {
          console.error(error);
        })
      } else {
        createEmployee(employee).then((response) => {
          console.log(response.data);
          navigator('/employees')
        }).catch(error => {
          console.error(error);
        })
      }
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

  function pageTitle() {
    if (empUserId) {
      return <h2 className='text-center' >Update Employee</h2>
    } else {
      return <h2 className='text-center' >Add Employee</h2>
    }
  }

  return (
    <div className='container' >
      <br></br>
      <div className='row' >
        <div className='card col-md-6 offset-md-3 offset-md-3' >
          {
            pageTitle()
          }
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

              <button className='btn btn-success' onClick={saveOrUpdateEmployee}>Submit</button>

            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmpAdd