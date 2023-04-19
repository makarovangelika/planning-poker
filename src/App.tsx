import React from 'react';
import './App.css';
import { Routes, Route, NavLink } from 'react-router-dom';
import { Main } from '../src/components/Main/Main';
import { Room } from './components/Room/Room';

function App() {
  return (
    <div className="container mx-auto px-4 text-slate-700 text-lg h-screen">
      <header>
        <nav>
          <h1 className="text-2xl sm:text-3xl text-indigo-500 m-4"><NavLink to='/'>PoPlan - Planning Poker</NavLink></h1>
        </nav>
      </header>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/rooms/:id' element={<Room />}  />
      </Routes>
    </div>
  );
}

export default App;
