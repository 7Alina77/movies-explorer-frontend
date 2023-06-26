import './MoviesCard.css';
import save from '../../images/save.svg';
import saved from '../../images/saved.svg';
import delele from '../../images/delete.svg';
import movieImg from '../../images/movie.jpg';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

function MoviesCard({card, handleDeleteCard }) {
  const location = useLocation();
  const path = location.pathname;
  const [savedCard, setIsSavedCard ] = useState(false);

  function handleSaveCard() {
    setIsSavedCard(!savedCard);
  }

  function handleClickDeleteCard() {
    handleDeleteCard(card)
  }

  return (
    <section className='movies-card'>
      <div className='movies-card__info'>
        <div className='movies-card__headers'>
          <h2 className='movies-card__title'>{card.nameRU}</h2>
          <p className='movies-card__subtitle'>1ч 47м</p>
        </div>
        {path === '/movies' && (
          <button onClick={handleSaveCard} className={`movies-card__btn ${savedCard && `movies-card__btn_state_active`}`} type='button'>
            <img className='movies-card__saved link-hover' src={savedCard ? saved : save} alt='значок сохраненного фильма'/>
          </button>
        )}
        {path === '/saved-movies' && (
          <button onClick={handleClickDeleteCard} className='movies-card__btn' type='button'>
            <img className='movies-card__delete link-hover' src={delele} alt='значок удаления фильма'/>
          </button>
        )}
      </div>
      <img className='movies-card__img' src={movieImg} alt='обложка фильма' />
    </section>
  )
}

export default MoviesCard;