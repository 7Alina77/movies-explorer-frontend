import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import search from '../../images/search.svg';

function SearchForm({isChecked, onSwitchClick}) {
  return (
    <section className='search-form'>
      <form className='search-form__form' id='search'>
        <input className='search-form__input' form='search' placeholder='Фильм'></input>
        <button className='search-form__btn link-hover' type='submit' form='search'>
          <img className='search-form__btn-img' src={search} alt='кнопка поиска' />
        </button>
      </form>
      <FilterCheckbox isChecked={isChecked} onSwitchClick={onSwitchClick}/>
      <hr className='search-form__line' />
    </section>
  )
}

export default SearchForm;