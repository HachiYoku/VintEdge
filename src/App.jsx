import React from 'react'
import AppLayout from './components/AppLayout'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import CreateItem from './pages/CreateItem'
import History from './pages/History'
import NotFoundPage from './pages/NotFoundPage'
import Setting from './pages/Setting'
import Cartpage from './pages/CartPage.jsx'
import Profile from './pages/Profile'



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/create-item' element={<CreateItem />} />
          <Route path='/history' element={<History/>} />
          <Route path='/setting' element={<Setting />} />
          <Route path='/cart' element={<Cartpage />} />
          <Route path='/profile' element={<Profile />} />
          
        </Route>
        <Route path="*" element={<NotFoundPage/>} />
      </Routes>
    
    </BrowserRouter>
  )
}

export default App