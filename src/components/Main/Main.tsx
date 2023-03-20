import { useState } from 'react';

export function Main() {
    let [name, setName] = useState('');
    let handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }
    return (
        <div className="h-screen">
            <h1 className="text-2xl sm:text-3xl text-indigo-500 m-4">PoPlan - Planning Poker</h1>
            <div className="flex flex-col items-center justify-center h-1/2">
                <h2 className="text-left w-4/5 sm:w-1/3 font-bold mb-6 text-2xl">Register</h2>
                <input type='text' value={name} placeholder='Name' onChange={handleNameChange}
                    className="w-4/5 sm:w-1/3 border-2 border-gray-200 focus:outline-indigo-500 focus:border-0 rounded-md p-3 mb-4" />
                <button className="w-4/5 sm:w-1/3 font-bold bg-indigo-500 hover:opacity-50 ease-in-out duration-200 rounded-md text-slate-50 p-3">Sign up</button>
            </div>
        </div>
    )
}