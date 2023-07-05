import './MoviesCard.css';
import save from '../../images/save.svg';
import saved from '../../images/saved.svg';
import deleteCard from '../../images/delete.svg';
import { useLocation } from 'react-router-dom';
import { convertTime } from '../../utils/common';
import { MOVIES_URL } from '../../utils/constants';

function MoviesCard({ isLiked, onCardLike, onCardClick, card, onCardDelete }) {
  const location = useLocation();
  const path = location.pathname;

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
          <button onClick={handleClickSaveCard} className={`movies-card__btn ${isLiked && `movies-card__btn_state_active`}`} type='button'>
            <img className='movies-card__saved link-hover' src={isLiked ? saved : save} alt='значок сохраненного фильма'/>
          </button>
        )}
        {path === '/saved-movies' && (
          <button onClick={handleClickDeleteCard} className='movies-card__btn' type='button'>
            <img className='movies-card__delete link-hover' src={deleteCard} alt='значок удаления фильма'/>
          </button>
        )}
      </div>
      <img onClick={handleOnCardClick} className='movies-card__img' src={path === '/movies' ? `${MOVIES_URL}${card.image.url}` : `${card.image}`} alt='обложка фильма' />
    </section>
  )
}

export default MoviesCard;