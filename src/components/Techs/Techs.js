import './Techs.css';

function Techs() {
  return (
    <section className='techs'>
      <div className='techs__wrapper'>
        <h2 className='techs__header'>Технологии</h2>
        <hr className='techs__line'/>
        <h3 className='techs__title'>7 технологий</h3>
        <p className='techs__subtitle'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        <ul className='techs__units'>
          <li className='techs__unit link link-hover'>HTML</li>
          <li className='techs__unit link link-hover'>CSS</li>
          <li className='techs__unit link link-hover'>JS</li>
          <li className='techs__unit link link-hover'>React</li>
          <li className='techs__unit link link-hover'>Git</li>
          <li className='techs__unit link link-hover'>Express.js</li>
          <li className='techs__unit link link-hover'>mongoDB</li>
        </ul>
      </div>
    </section>
  );
}

export default Techs;