import React, { useContext } from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Auth from './components/Auth.jsx'
import Profile from './components/Profile.jsx'
import Public from './components/Public.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import {UserContext} from './context/UserProvider.jsx'

function App() {
  const {token, logout} = useContext(UserContext)

  return (
    <div>
      {token && <Navbar logout={logout}/>}
      <Routes>
        <Route
          path="/"
          element={token ? <Navigate to="/profile"/> : <Auth/>}
          />
        <Route
          path="/"
          element={token ? <Navigate to="/public"/> : <Auth/>}
        />
        <Route
          path="/profile"
          element={<ProtectedRoute token={token}>
            <Profile/>
          </ProtectedRoute>}
        />
        <Route
          path="/public"
          element={<ProtectedRoute token={token}>
              <Public/>
          </ProtectedRoute>}
        />
      </Routes>
    </div>
  )
}

export default App
