import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';

function SavedMovies({onCardClick, onCardDelete, allFilms, onSearch, isCheckedOnSavedMovies, onSwitchClick, onBurgerClick}) {
  const location = useLocation();
  const path = location.pathname;
  /**function handleOnSearch( search) {
    onSearch(search);
  };*/

  const handleOnSearch = useCallback(async (search) => {
    const moviesSearch = await onSearch(search);
    if(path ==='/saved-movies') {
      localStorage.setItem('moviesSearchOnSavedMovies',JSON.stringify(search));
    }
},[onSearch, path]);

  return (
    <section className='saved-movies'>
      <Header onBurgerClick={onBurgerClick}/>
      <main>
        <SearchForm handleOnSearch={handleOnSearch} isCheckedOnSavedMovies={isCheckedOnSavedMovies} onSwitchClick={onSwitchClick}/>
        <MoviesCardList onCardDelete={onCardDelete} onCardClick={onCardClick} allSavedFilms={allFilms} />
      </main>
      <Footer />
    </section>
  )
}

export default SavedMovies;