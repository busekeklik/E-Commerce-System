import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Ring from './pages/Ring';
import Bracelet from './pages/Bracelet';
import Necklace from './pages/Necklace';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';

import './App.css';

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div className="App">
        <Navbar user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
          <Route path="/profile" element={<Profile user={user} />} />
          <Route path="/ring" element={<Ring />} />
          <Route path="/bracelet" element={<Bracelet />} />
          <Route path="/necklace" element={<Necklace />} />
          <Route path="/:category/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
