import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useLocation } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { handleSearchMovies } from '../../utils/common';

function Movies({ shortMovies, onCardLike, onCardClick, allFilms, onSearch, isCheckedOnMovies, onSwitchClick, onBurgerClick}) {
  const location = useLocation();
  const path = location.pathname;
  const [filmsForRender, setFilmsForRender] = useState([]);
  const [shortFilms, setShortFilms] = useState([]);
  const [searchOnMovies, setSearchOnMovies] = useState('');
  console.log(shortMovies)

  useEffect(() => {
    if(allFilms !== 0) {
      if(path === '/movies') {
        if(isCheckedOnMovies === false){
          setFilmsForRender(allFilms);
        } else {
          setShortFilms(shortMovies);
          JSON.stringify(localStorage.setItem('shortMoviesOnMovies', shortFilms))
        }
      }
    }
  },[allFilms, path, searchOnMovies, isCheckedOnMovies, shortFilms, shortMovies, filmsForRender]);

  const handleOnSearch = useCallback(async (search) => {
      const moviesSearch = await onSearch(search);
      if(path === '/movies') {
        localStorage.setItem('searchedMovies', JSON.stringify(moviesSearch));
        localStorage.setItem('moviesSearchOnMovies',JSON.stringify(search));
        setSearchOnMovies(search);
      }
  },[onSearch, path]);

  return (
    <section className='movies'>
      <Header onBurgerClick={onBurgerClick}/>
      <main>
        <SearchForm handleOnSearch={handleOnSearch} isCheckedOnMovies={isCheckedOnMovies} onSwitchClick={onSwitchClick}/>
        <MoviesCardList isCheckedOnMovies={isCheckedOnMovies} shortFilms={shortMovies} onCardLike={onCardLike} onCardClick={onCardClick} allSearchedFilms={filmsForRender}/>
      </main>
      <Footer />
    </section>
  )
}

export default Movies;