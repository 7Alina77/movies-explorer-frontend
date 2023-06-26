import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import cards from '../../utils/cards';
import { useLocation } from 'react-router-dom';
import { useEffect,useState } from 'react';

function MoviesCardList() {
  const location = useLocation();
  const path = location.pathname;
  const [films, setFilms] = useState([]);

  useEffect(() => {
    setFilms(cards);
  },[]);

  function handleDeleteCard(cardToDelete) {
    setFilms(films.filter((film) => JSON.stringify(film) !== JSON.stringify(cardToDelete)))
  }

  const cardsElements = films.map((card) => {
    return (
    <MoviesCard 
      handleDeleteCard={handleDeleteCard}
      key = {card.movieId}
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

  return (
    <section className='movies-list'>
      {films.length === 0 ? (
        <p className='movies-list__empty'>Упс! Фильмы не найдены &#128531;</p>
      ) : (
        <>
          <div className='movies-list__items'>
            {cardsElements}
          </div>
          {path === '/movies' && <button className='movies-list__btn link-hover' type='button'>Еще</button>}
        </>
      )
      }
    </section>
  )
}

export default MoviesCardList;