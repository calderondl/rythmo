import { Route, Routes} from 'react-router-dom' 

import 'tailwindcss/tailwind.css'

import Navbar from './Navbar'
import Home from './pages/Home';
import Athletes from './pages/Athletes';
import Stats from './pages/Stats';
import Login from './pages/Login';

function App() {
  return (
    <div className='pl-8 pr-8'>      
      <Navbar />     
      <h1 className=' text-center font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'>RYTHMO</h1>
      <h3 className='text-center'>Sistema inteligente de música de fondo para <span className='font-bold inline-block'>El Gimnasio</span></h3>                        
      <div className='mt-10 bg-gray-300'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Atletas' element={<Athletes />} />
          <Route path='/Estadisticas' element={<Stats />} />
          <Route path='/Login' element={<Login />} />
        </Routes>
      </div>             
    </div>  
  );
}

export default App;
