import React from 'react';
import './App.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import { Routes, Route, Navigate, useNavigate } from 'react-router-dom/dist';
import Header from '../Header/Header';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Footer from '../Footer/Footer';

function App() {
  return (
    <div className='page'>
      <Header />
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Footer />
    </div>
  );
}

export default App;
