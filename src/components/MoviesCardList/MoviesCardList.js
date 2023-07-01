import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';

function MoviesCardList({onCardLike, onCardClick, onCardDelete, allFilms}) {
  const location = useLocation();
  const path = location.pathname;
  const [filmsForRender, setFilmsForRender] = useState([]);
  const [step, setStep ] = useState(3);
  const [filmsOnDisplay, setFilmsOnDisplay] = useState(12);

  function resizeScreen() {
    const width = window.innerWidth;
    if(width < 768) {
      setFilmsOnDisplay(8);
      setStep(2);
    }
    if(width < 480) {
      setFilmsOnDisplay(5);
      setStep(2);
    }
  }

  window.addEventListener('resize', function() {
    resizeScreen();
  });

  useEffect(() => {
    if(filmsForRender !== 0) {
      setFilmsForRender(allFilms);
    }
  },[filmsForRender, allFilms])

  async function handleOnCardDelete(cardToDelete) {
    onCardDelete(cardToDelete)
    const newFilmsForRender = await filmsForRender.filter((film) => JSON.stringify(film) !== JSON.stringify(cardToDelete));
    console.log(newFilmsForRender);
  }

  return (
    <section className='movies-list'>
      {filmsForRender.length === 0 ? (
        <p className='movies-list__empty'>Упс! Фильмы не найдены</p>
      ) : (
        <>
          <div className='movies-list__items'>
            {filmsForRender.length && (
              filmsForRender.slice(0, filmsOnDisplay).map((card) => {
                return (
                <MoviesCard 
                  onCardLike={onCardLike}
                  onCardClick={onCardClick}
                  onCardDelete={handleOnCardDelete}
                  key = {card.id}
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
                  like = {card.like}
                />)
              })
            )}
          </div>
          {path === '/movies' && <button onClick={()=> setFilmsOnDisplay(filmsOnDisplay + step)} className='movies-list__btn link-hover' type='button'>Еще</button>}
        </>
      )
      }
    </section>
  )
}

export default MoviesCardList;