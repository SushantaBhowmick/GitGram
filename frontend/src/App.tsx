
import './App.css'
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import HomePage from './pages/HomePage.tsx'
import ProfilePage from './pages/ProfilePage.tsx'
import MessagePage from './pages/MessagePage.tsx'
import MobileHeader from './components/layout/MobileHeader.tsx'
import MobileSidebar from './components/Home/MobileSidebar.tsx'
import LoginPage from './pages/AuthPage/LoginPage.tsx'
import Register from './pages/AuthPage/Register.tsx'

function App() {

  return (
  <>
  <Router>
  <div className='fixed top-0 block sm:hidden w-full z-50'>
  <MobileHeader />
</div>
    <Routes>
      <Route  path='/' element={<HomePage />}  />
      <Route  path='/profile' element={<ProfilePage />}  />
      <Route  path='/message' element={<MessagePage />}  />
      <Route  path='/login' element={<LoginPage />}  />
      <Route  path='/register' element={<Register />}  />
    </Routes>
      {/* Mobile Sidebar */}

      <div className='fixed bottom-0 block sm:hidden w-full'>
      <MobileSidebar />
    </div>
     
  </Router>
  </>
  )
}

export default App
