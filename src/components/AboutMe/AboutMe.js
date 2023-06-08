import './AboutMe.css';
import Portfolio from '../Portfolio/Portfolio';
import me from '../../images/me.jpeg';

function AboutMe() {
  return (
    <section className='me'>
      <h2 className='me__header'>Студент</h2>
      <hr className='me__line'/>
      <div className='me__wrapper'>
        <div className='me__info'>
          <div className='me__texts'>
            <h2 className='me__title'>Алина</h2>
            <h3 className='me__subtitle'>Фронтенд-разработчик, 25 лет</h3>
            <p className='me__text'>Меня зовут Алина, я закончила курс Веб-разработчик от Яндекс.Практикума. До этоого работала медиа-байером, помощником продакт-менеджера, проджект-менеджером, но всегда хотелось кодить. На данный момент работаю на фрилансе.</p>
          </div>
          <a target='blank' className='me__github' href='https://github.com/7Alina77'>Github</a>
        </div>
        <img className='me__photo' src={me} alt='мое фото'/>
      </div>
      <Portfolio />    
    </section>
  );
}

export default AboutMe;