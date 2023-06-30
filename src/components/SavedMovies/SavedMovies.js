import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useCallback, useState } from 'react';

function SavedMovies({onCardClick, onCardDelete, allFilms, onSearch, isChecked, onSwitchClick, onBurgerClick}) {
  const [filmsForRender, setFilmsForRender] =useState([]);

  const handleOnSearch = useCallback(async ( search) => {
    const moviesSearch = await onSearch(search);
  },[onSearch]);

  return (
    <section className='saved-movies'>
      <Header onBurgerClick={onBurgerClick}/>
      <main>
        <SearchForm handleOnSearch={handleOnSearch} isChecked={isChecked} onSwitchClick={onSwitchClick}/>
        <MoviesCardList onCardDelete={onCardDelete} onCardClick={onCardClick} allFilms={allFilms} />
      </main>
      <Footer />
    </section>
  )
}

export default SavedMovies;