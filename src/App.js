import React  from 'react';
import './App.css';
import FormProject from './components/form-project';
import Previa from './components/previa'
import { Routes, Route } from 'react-router-dom';


export default function App() {

  return (
    <div className="App">
      <Routes>
        <Route element={<FormProject />} path="/" exact />
        <Route element={<Previa />} path="/previa" exact/>
      </Routes>  
    </div>
  );
}

