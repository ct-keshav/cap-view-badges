import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home';
import Notfound from './Pages/Notfound';
import BadgeInfoCard from './Cards/BadgeInfoCard';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/view" element={<Home />} />
        <Route path="*" element={<Notfound />} />
        <Route path="/test" element={<BadgeInfoCard />} />
      </Routes>
    </>
  )
}

export default App;