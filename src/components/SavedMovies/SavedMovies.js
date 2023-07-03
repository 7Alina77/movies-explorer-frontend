import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useCallback } from 'react';

function SavedMovies({onCardClick, onCardDelete, allFilms, onSearch, isCheckedOnSavedMovies, onSwitchClick, onBurgerClick}) {

  function handleOnSearch( search) {
    onSearch(search);
  };

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