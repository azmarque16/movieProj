import { useState } from 'react'
import './css/App.css'
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom'
import { MovieProvider } from './context/MovieContext'
import NavBar from './components/NavBar'
import Favorites from './pages/Favorites'

function App() {
  const [count, setCount] = useState(0)

  return (
    <MovieProvider>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
    </MovieProvider>
  );
}


export default App
