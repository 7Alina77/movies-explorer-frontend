import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import cards from '../../utils/cards';
import { useLocation } from 'react-router-dom';

function MoviesCardList({ isSaved, onCardClick}) {
  const location = useLocation();
  const path = location.pathname;
  const cardsElements = cards.map((card) => {
    return (
    <MoviesCard
      key = {card._id}
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
  return (
    <section className='movies-list'>
      {cards.length === 0 ? (
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