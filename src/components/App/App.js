import React from 'react';
import './App.css';
import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import '../Multipurpose/Multipurpose.css';
import Landing from '../Landing/Landing';
import NotFound from '../NotFound/NotFound';

function App() {
  return (
    <div className='page'>
      <Routes>
        <Route path='/' element={<Landing />}/>
        <Route path='/movies' element={<Movies />}/>
        <Route path='/saved-movies' element={<SavedMovies />}/>
        <Route path='/profile' element={<Landing />}/>
        <Route path='/signin' element={{/**<Login />**/}}/>
        <Route path='/signin' element={{/**<Register />}**/}}/>
        <Route path='*' element={<NotFound />}/>
      </Routes>
    </div>
  );
}

export default App;
