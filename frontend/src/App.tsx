
import './App.css'
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import HomePage from './pages/HomePage.tsx'
import ProfilePage from './pages/ProfilePage.tsx'

function App() {

  return (
  <>
  <Router>
    <Routes>
      <Route  path='/' element={<HomePage />}  />
      <Route  path='/profile' element={<ProfilePage />}  />
    </Routes>
  </Router>
  </>
  )
}

export default App
