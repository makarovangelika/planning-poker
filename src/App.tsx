import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Main } from '../src/components/Main/Main';
import { Room } from './components/Room/Room';

function App() {
  return (
    <div className="container mx-auto px-4 text-slate-700 text-lg">
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/rooms/:id' element={<Room />}  />
      </Routes>
    </div>
  );
}

export default App;
