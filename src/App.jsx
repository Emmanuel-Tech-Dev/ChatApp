// import { useState, useEffect } from 'react';

import {BrowserRouter , Routes , Route, Navigate} from 'react-router-dom'

import './App.css';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Home from './pages/Home';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

function App() {
 
  const {currentUser} = useContext(AuthContext)
  
  const ProtectedRoute = ({children}) => {
if(!currentUser){
  return <Navigate to="/login" />
}

return children

  }
  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path='/'>
       <Route 
       index 
       element={
       <ProtectedRoute>
        <Home/>
        </ProtectedRoute>
      }>
        </Route>
       <Route path='login' element={<Login/>}></Route>
       <Route path='signup' element={<SignUp/>}></Route>
      </Route>
     </Routes>
     
     </BrowserRouter>
    </>
  );
}

export default App;
