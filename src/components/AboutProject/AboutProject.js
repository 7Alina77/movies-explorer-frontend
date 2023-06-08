import './AboutProject.css';

function AboutProject() {
  return (
    <section className='project'>
      <h2 className='project__header'>О проекте</h2>
      <hr className='project__line'/>
      <div className='project__columns'>
        <div className='project__column'>
          <h3 className='project__column-title'>Дипломный проект включал 5 этапов</h3>
          <p className='project__column-text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className='project__column'>
          <h3 className='project__column-title'>На выполнение диплома ушло 5 недель</h3>
          <p className='project__column-text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className='project__duration'>
        <div className='project__duration-item'>
          <p className='project__duration-time project__duration-time_color_blue'>1 неделя</p>
          <p className='project__duration-text'>Back-end</p>
        </div>
        <div className='project__duration-item'>
          <p className='project__duration-time project__duration-time_color_grey'>4 недели</p>
          <p className='project__duration-text'>Front-end</p>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;