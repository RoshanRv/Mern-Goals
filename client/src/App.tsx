import React from 'react';
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Header from './components/Header';

function App() {
  return (
    <Router>
      <div className='w-full flex flex-col h-screen' >
        <Header/>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/' element={<Dashboard/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
