import './Movies.css';
import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useCallback, useState } from 'react';

function Movies({loggedIn, onCardLike, onCardClick, onCardDelete, allFilms, filteredMovies, shortMovies, onSearch, isCheckedOnMovies, onSwitchClick, onBurgerClick, allSavedFilms}) {
  const [isLoading, setIsLoading] = useState(false)

  const handleOnSearch = useCallback(async (search) => {
    setIsLoading(true)
    const moviesSearch = await onSearch(search);
    (localStorage.setItem('moviesSearchOnMovies', search));
    setIsLoading(false);
  },[onSearch]);

  return (
    <section className='movies'>
      <Header onBurgerClick={onBurgerClick}/>
      <main>
        <SearchForm
        handleOnSearch={handleOnSearch} 
        isCheckedOnMovies={isCheckedOnMovies} 
        onSwitchClick={onSwitchClick}
        />
        <MoviesCardList
        allSavedFilms={allSavedFilms}
        isLoading={isLoading} 
        isCheckedOnMovies={isCheckedOnMovies} 
        onCardLike={onCardLike} 
        onCardClick={onCardClick} 
        onCardDelete={onCardDelete}
        allSearchedFilms={allFilms} 
        filteredMovies={filteredMovies} 
        shortFilms={shortMovies}
        />
      </main>
      <Footer />
    </section>
  )
}

export default Movies;