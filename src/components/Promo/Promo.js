import './Promo.css';
import imgLanding from '../../images/text_landing.svg';

function Promo() {
  return (
    <section className='promo'>
      <div className='promo__wrapper'>
        <h1 className='promo__header'>Учебный проект студента факультета Веб-разработки.</h1>
        <div className='promo__img-overflow'>
          <img className='promo__img' alt='картинка на главной' src={imgLanding}/>
        </div>
      </div>
    </section>
  );
}

export default Promo;