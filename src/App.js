import { Route, Routes} from 'react-router-dom' 

import 'tailwindcss/tailwind.css'

import Navbar from './components/Navbar'
import Home from './pages/Home';
import Athletes from './pages/Athletes';
import Stats from './pages/Stats';
import Login from './pages/Login';

function App() {
  return (
  <div className='max-w-7xl mx-auto lg:max-w-4xl'>
    <Navbar />
    <h1 className='text-center font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-r from-orange-700 to-orange-200'>RYTHMO</h1>
    <h3 className='text-center'>Sistema inteligente de música de fondo para <span className='font-bold inline-block'>El Gimnasio</span></h3>
    <div className='mt-12'>
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