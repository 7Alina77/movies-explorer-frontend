import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useCallback, useEffect, useState } from 'react';

function Movies({onCardLike, onCardClick, allFilms, onSearch, isChecked, onSwitchClick, onBurgerClick}) {

  const handleOnSearch = useCallback(async ( search) => {
    const moviesSearch = await onSearch(search);
  },[onSearch]);

  return (
    <section className='movies'>
      <Header onBurgerClick={onBurgerClick}/>
      <main>
        <SearchForm handleOnSearch={handleOnSearch} isChecked={isChecked} onSwitchClick={onSwitchClick}/>
        <MoviesCardList onCardLike={onCardLike} onCardClick={onCardClick} allFilms={allFilms}/>
      </main>
      <Footer />
    </section>
  )
}

export default Movies;