import './NotFound.css';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  function handleClickBack() {
    navigate(-1)
  };

  return (
    <section className='not-found'>
      <h2 className='not-found__title'>404</h2>
      <p className='not-found__subtitle'>Страница не найдена</p>
      <button className='not-found__btn link-hover' type='button' onClick={handleClickBack}>Назад</button>
    </section>
  )
}

export default NotFound;