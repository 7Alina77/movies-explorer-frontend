import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';

function MoviesCardList({filteredMovies,  isCheckedOnMovies, isCheckedOnSavedMovies, shortFilms, onCardLike, onCardClick, onCardDelete, allSearchedFilms, allSavedFilms}) {
  const location = useLocation();
  const path = location.pathname;
  const [filmsForRender, setFilmsForRender] = useState([]);
  const [noFilms, setNoFilms] = useState(false);
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

  //Отрисовка на страницу относительно пути
  useEffect(() => {
    if(path === '/movies' && isCheckedOnMovies === false) {
      setFilmsForRender(allSearchedFilms);
      if(allSearchedFilms.length === 0) {
        const films = JSON.parse(localStorage.getItem('filteredMoviesOnMovies'));
        if(films) {
          setFilmsForRender(films);
        }
      }
    } else if(path === '/movies' && isCheckedOnMovies === true) {
      console.log(shortFilms)
      if(shortFilms.length > 0){
        setFilmsForRender(shortFilms);
      } else {
        setNoFilms(true);
      }
    }
  },[path, isCheckedOnMovies,shortFilms, allSearchedFilms]);

  useEffect(() => {
    if(path === '/saved-movies'){
      console.log(allSavedFilms);
      setFilmsForRender(allSavedFilms);
    }
  },[ path, allSavedFilms])

  async function handleOnCardDelete(cardToDelete) {
    onCardDelete(cardToDelete)
    const newFilmsForRender = await filmsForRender.filter((film) => JSON.stringify(film) !== JSON.stringify(cardToDelete));
    console.log(newFilmsForRender);
  }

  return (
    <section className='movies-list'>
      {(filmsForRender.length === 0 || noFilms === true)? (
        <p className='movies-list__empty'>Упс! Фильмы не найдены</p>
      ) : (
        <>
          <div className='movies-list__items'>
            {filmsForRender.length && (
              filmsForRender.slice(0, filmsOnDisplay).map((card) => {
                return (
                <MoviesCard 
                  filteredMovies={filteredMovies}
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
          {(path === '/movies' && (filmsForRender.length > 3 && filmsForRender.length < allSearchedFilms)) && <button onClick={()=> setFilmsOnDisplay(filmsOnDisplay + step)} className='movies-list__btn link-hover' type='button'>Еще</button>}
        </>
      )
      }
    </section>
  )
}

export default MoviesCardList;