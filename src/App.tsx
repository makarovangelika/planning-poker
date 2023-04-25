import React from 'react';
import './App.css';
import { Routes, Route, NavLink } from 'react-router-dom';
import { Main } from '../src/components/Main/Main';
import { Room } from './components/Room/Room';
import { useSelector } from 'react-redux';
import { State } from './models';

function App() {
  const currentUser = useSelector((state: State) => state.registration);
  return (
    <div className="container mx-auto px-4 text-slate-700 text-lg h-screen">
      <header>
        <nav className="flex justify-between">
          <h1 className="text-2xl sm:text-3xl text-indigo-500 m-4"><NavLink to='/'>PoPlan - Planning Poker</NavLink></h1>
          {currentUser && <span className="m-4 font-bold">{currentUser.user.name}</span>}
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
