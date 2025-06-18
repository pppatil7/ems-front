import './App.css'
import EmpAdd from './components/EmpAdd'
import EmpList from './components/EmpList'
import Footer from './components/Footer'
import Header from './components/Header'
import EmpUpdate from './components/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          {/* // http://localhost:3000 */}
          <Route path='/' element={<EmpList />} ></Route>
          {/* // http://localhost:3000/employees */}
          <Route path='/employees' element={<EmpList />} ></Route>
          {/* // http://localhost:3000/add-employee */}
          <Route path='/add-employee' element={<EmpAdd />} ></Route>
          {/* // http://localhost:3000/edit-employee/1 */}
          <Route path='/edit-employee/:empUserId' element={<EmpAdd />} ></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
