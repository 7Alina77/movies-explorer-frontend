import './Footer.css';

function Footer() {
  return (
    <footer className='footer'>
      <div className='footer__wrapper'>
        <h3 className='footer__header'>Учебный проект Яндекс.Практикум х BeatFilm.</h3>
        <div className='footer__all'>
          <p className='footer__year'>&#169; {new Date().getFullYear()}</p>
          <div className='footer__links'>
            <a className='footer__links-yandex link-hover link' href='https://practicum.yandex.ru/'>Яндекс.Практикум</a>
            <a className='footer__links-github link-hover link' href='https://github.com/7Alina77'>Github</a> 
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;