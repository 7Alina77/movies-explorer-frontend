import './MoviesCard.css';
import save from '../../images/save.svg';
import saved from '../../images/saved.svg';
import delele from '../../images/delete.svg';
import movieImg from '../../images/movie.jpg';
import { useLocation } from 'react-router-dom';

function MoviesCard({savedCard, isSavedCard, card}) {
  const location = useLocation();
  const path = location.pathname;
  
  function handleSaveCard() {
    isSavedCard(card);
  }

  return (
    <section className='movies-card'>
      <div className='movies-card__info'>
        <div className='movies-card__headers'>
          <h2 className='movies-card__title'>{card.nameRU}</h2>
          <p className='movies-card__subtitle'>{card.duration}</p>
        </div>
        <button onClick={handleSaveCard} className='movies-card__btn' type='button'>
          {path === '/movies' ? (
            <img className='movies-card__saved link-hover' src={savedCard ? saved : save} alt='значок сохраненного фильма'/>
          ) : (
            <img className='movies-card__saved link-hover' src={delele} alt='значок удаления фильма'/>
          )}
        </button>
      </div>
      <img className='movies-card__img' src={movieImg} alt='обложка фильма' />
    </section>
  )
}

export default MoviesCard;