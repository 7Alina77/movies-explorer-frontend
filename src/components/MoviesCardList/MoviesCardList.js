import './MoviesCardList.css';
import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Preloader from '../Preloader/Preloader';
import { handleFilterMoviesByTime, handleSearchMovies } from '../../utils/common';

function MoviesCardList({isLoading,  isCheckedOnMovies, isCheckedOnSavedMovies, allSearchedFilms, filteredMovies, shortFilms, onCardLike, onCardClick, onCardDelete, allSavedFilms}) {
  const location = useLocation();
  const path = location.pathname;
  const [filmsForRender, setFilmsForRender] = useState([]);
  const [step, setStep ] = useState(3);
  const [filmsOnDisplay, setFilmsOnDisplay] = useState(12);

  //Вывод карточек относительно размера экрана
  function resizeScreen() {
    const width = window.innerWidth;
    setTimeout(() => {
      if(width < 768) {
        setFilmsOnDisplay(8);
        setStep(2);
      }
      if(width < 480) {
        setFilmsOnDisplay(5);
        setStep(2);
      }
    }, 2000);
  }

  window.addEventListener('resize', function() {
    resizeScreen();
  });

  function checkIsLiked(savedFilms, film) {
    return savedFilms.some((card) => film.id === card.movieId)
  }

  //Отрисовка на страницу относительно пути и после перезагрузки страницы
  useEffect(() => {
    if(path === '/movies') {
      const searchOnMovies = localStorage.getItem('moviesSearchOnMovies');
      if(isCheckedOnMovies === true) {
        const filmsForRenderList = handleSearchMovies(shortFilms, searchOnMovies)
        setFilmsForRender(filmsForRenderList);
      } else if(isCheckedOnMovies === false) {
        setFilmsForRender(filteredMovies);
      }
    }
  },[path, filteredMovies, shortFilms, isCheckedOnMovies]);

  useEffect(() => {
    if(path === '/movies') {
      if((!filteredMovies || filteredMovies.length === 0) && isCheckedOnMovies === true){
        const filteredFilmsList = JSON.parse(localStorage.getItem('filteredMoviesOnMovies'));
        const shortFilmsList = handleFilterMoviesByTime(filteredFilmsList);
        setFilmsForRender(shortFilmsList);
      }else if((!filteredMovies || filteredMovies.length === 0) && isCheckedOnMovies === false) {
        const filteredFilmsList = JSON.parse(localStorage.getItem('filteredMoviesOnMovies'));
        const searchOnMovies = localStorage.getItem('moviesSearchOnMovies');
        if(searchOnMovies) {
          const newFilteredFilms = handleSearchMovies(filteredFilmsList, searchOnMovies);
          setFilmsForRender(newFilteredFilms);
        }
      }
    }
  },[filteredMovies, path, isCheckedOnMovies]);

  useEffect(() => {
    if(path === '/saved-movies') {
      const searchOnSavedMovies = localStorage.getItem('moviesSearchOnSavedMovies');
      if(isCheckedOnSavedMovies === true) {
        const shortSavedFilms = handleFilterMoviesByTime(allSavedFilms);
        setFilmsForRender(shortSavedFilms);
      } else if(isCheckedOnSavedMovies ===false) {
        const searchOnSavedMovies = localStorage.getItem('moviesSearchOnSavedMovies');
        if(searchOnSavedMovies) {
          setFilmsForRender(handleSearchMovies(allSavedFilms, searchOnSavedMovies));
        } else {
          setFilmsForRender(allSavedFilms);
        }
      }
    }
  },[path, allSavedFilms, isCheckedOnSavedMovies]);

  //Удаление карточки
  async function handleOnCardDelete(cardToDelete) {
    onCardDelete(cardToDelete)
    const newFilmsForRender = await filmsForRender.filter((film) => JSON.stringify(film) !== JSON.stringify(cardToDelete));
  }

  return (
    <section className='movies-list'>
      {isLoading && <Preloader/>}
      {(!filmsForRender || filmsForRender.length === 0) ? (
        <p className='movies-list__empty'>Упс! Фильмы не найдены</p>
      ) : (
        <>
          <div className='movies-list__items'>
            {filmsForRender && (
              filmsForRender.slice(0, filmsOnDisplay).map((card) => { 
                return (
                <MoviesCard 
                  isLiked = {checkIsLiked(allSavedFilms, card)}
                  onCardLike={onCardLike}
                  onCardClick={onCardClick}
                  onCardDelete={handleOnCardDelete}
                  key = {card.id || card.movieId}
                  card = {card}
                  country = {card.country}
                  director = {card.director}
                  duration = {card.duration}
                  year = {card.year}
                  description = {card.description}
                  image = {card.image}
                  trailerLink = {card.trailerLink}
                  thumbnail = {card.thumbnail}
                  owner = {card.owner}
                  movieId = {card.movieId}
                  nameRU = {card.nameRU}
                  nameEN = {card.nameEN} 
                />)
              })
            )}
          </div>
          {(path === '/movies' && ((filmsForRender >3 || filmsForRender.length > 3) && (filmsForRender < allSearchedFilms || filmsForRender.length < allSavedFilms.length))) && <button onClick={()=> setFilmsOnDisplay(filmsOnDisplay + step)} className='movies-list__btn link-hover' type='button'>Еще</button>}
        </>
      )
      }
    </section>
  )
}

export default MoviesCardList;