import React,{lazy} from 'react';
import { Route,Routes } from 'react-router-dom';
import './App.css';

const Test = lazy(()=>import('@pages/test'))
const Mine = lazy(()=>import('@pages/mine'))

function App() {
  return (
    <Routes>
      <Route path='/test' element={<Test/>}/>
      <Route path='/mine' element={<Mine/>}/>
    </Routes>
  );
}

export default App;
