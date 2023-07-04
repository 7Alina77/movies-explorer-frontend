import './MoviesCard.css';
import save from '../../images/save.svg';
import saved from '../../images/saved.svg';
import deleteCard from '../../images/delete.svg';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { convertTime } from '../../utils/common';
import { MOVIES_URL } from '../../utils/constants';

function MoviesCard({ onCardLike, onCardClick, card, onCardDelete }) {
  const location = useLocation();
  const path = location.pathname;
  const [savedCard, setIsSavedCard ] = useState(false);
  const searchedMovies =  JSON.parse(localStorage.getItem('filteredMoviesOnMovies'));

  useEffect(() => {
    if(searchedMovies === 0) {
      const savedMovie = searchedMovies.filter((movie) => movie.id === card.id)
      if(savedMovie) {
        setIsSavedCard(true)
      }
    }
  },[card.id, searchedMovies])

  function handleClickSaveCard() {
    onCardLike(card);
  }

  function handleClickDeleteCard() {
    onCardDelete(card)
  }

  function handleOnCardClick() {
    onCardClick(card);
  }

  return (
    <section className='movies-card'>
      <div className='movies-card__info'>
        <div className='movies-card__headers'>
          <h2 className='movies-card__title'>{card.nameRU}</h2>
          <p className='movies-card__subtitle'>{convertTime(card.duration)}</p>
        </div>
        {path === '/movies' && (
          <button onClick={handleClickSaveCard} className={`movies-card__btn ${savedCard && `movies-card__btn_state_active`}`} type='button'>
            <img className='movies-card__saved link-hover' src={savedCard ? saved : save} alt='значок сохраненного фильма'/>
          </button>
        )}
        {path === '/saved-movies' && (
          <button onClick={handleClickDeleteCard} className='movies-card__btn' type='button'>
            <img className='movies-card__delete link-hover' src={deleteCard} alt='значок удаления фильма'/>
          </button>
        )}
      </div>
      <img onClick={handleOnCardClick} className='movies-card__img' src={`${MOVIES_URL}${card.image.url}`} alt='обложка фильма' />
    </section>
  )
}

export default MoviesCard;