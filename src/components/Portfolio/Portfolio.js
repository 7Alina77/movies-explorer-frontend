import './Portfolio.css';
import arrow from '../../images/arrow.svg';

function Portfolio() {
  return (
    <div className='portfolio'>
      <h3 className='portfolio__title'>Портфолио</h3>
      <ul className='portfolio__units'>
        <li className='portfolio__unit link-hover link'>
          <a className='portfolio__link link' href='https://github.com/7Alina77/how-to-learn' target='blank'>
            <p className='portfolio__link-title'>Статичный сайт</p>
            <img className='portfolio__link-img' src={arrow} alt='указатель на сайт' />
          </a>
        </li>
        <li className='portfolio__unit link-hover link'>
          <a className='portfolio__link link' href='https://github.com/7Alina77/russian-travel' target='blank'>
            <p className='portfolio__link-title'>Адаптивный сайт</p>
            <img className='portfolio__link-img' src={arrow} alt='указатель на сайт' />
          </a>
        </li>
        <li className='portfolio__unit link-hover link'>
          <a className='portfolio__link link' href='https://github.com/7Alina77/react-mesto-auth' target='blank'>
            <p className='portfolio__link-title'>Одностраничное приложение</p>
            <img className='portfolio__link-img' src={arrow} alt='указатель на сайт' />
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Portfolio;