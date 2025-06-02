import React from 'react';
import Todos from './components/Todos';


const App: React.FC = () => {  return (
    <main className='flex flex-col justify-center items-center w-full h-[100vh]'>
      <h1 className='text-7xl font-raleway font-light text-pink-300'>todos</h1>
      <Todos />
    </main>
  );
};

export default App;
