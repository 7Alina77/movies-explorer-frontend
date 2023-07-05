import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useCallback } from 'react';

function SavedMovies({loggedIn, onCardClick, onCardDelete, allFilms, onSearch, isCheckedOnSavedMovies, onSwitchClick, onBurgerClick}) {

  const handleOnSearch = useCallback(async (search) => {
    const moviesSearch = await onSearch(search);
    localStorage.setItem('moviesSearchOnSavedMovies', search);
},[onSearch]);

  return (
    <section className='saved-movies'>
      <Header onBurgerClick={onBurgerClick}/>
      <main>
        <SearchForm handleOnSearch={handleOnSearch} isCheckedOnSavedMovies={isCheckedOnSavedMovies} onSwitchClick={onSwitchClick}/>
        <MoviesCardList isCheckedOnSavedMovies={isCheckedOnSavedMovies} onCardDelete={onCardDelete} onCardClick={onCardClick} allSavedFilms={allFilms} />
      </main>
      <Footer />
    </section>
  )
}

export default SavedMovies;