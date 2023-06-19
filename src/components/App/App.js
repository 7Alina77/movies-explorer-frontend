import React from 'react';
import './App.css';
import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import '../Multipurpose/Multipurpose.css';
import Landing from '../Landing/Landing';
import NotFound from '../NotFound/NotFound';
import BurgerMenu from '../BurgerMenu/BurgerMenu';

function App() {
  const [isBurger, setIsBurger] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleBurger = () => {
    setIsBurger(!isBurger);
  };

  const handleChecked = () => {
    setIsChecked(!isChecked);
  }

  return (
    <div className='page'>
      <Routes>
        <Route path='/' element={<Landing onBurgerClick={handleBurger}/>}/>
        <Route path='/movies' element={<Movies isChecked={isChecked} onSwitchClick={handleChecked} onBurgerClick={handleBurger} />}/>
        <Route path='/saved-movies' element={<SavedMovies isChecked={isChecked} onSwitchClick={handleChecked} onBurgerClick={handleBurger} />}/>
        <Route path='/profile' element={<Landing onBurgerClick={handleBurger} />}/>
        <Route path='/signin' element={{/**<Login />**/}}/>
        <Route path='/signin' element={{/**<Register />}**/}}/>
        <Route path='*' element={<NotFound />}/>
      </Routes>
      <BurgerMenu isBurger={isBurger} onClose={handleBurger}/>
    </div>
  );
}

export default App;
