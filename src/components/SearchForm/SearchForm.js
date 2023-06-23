import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import search from '../../images/search.svg';
import { useState, useEffect } from 'react';

function SearchForm({isChecked, onSwitchClick}) {
  const [searchError, setSearchError] = useState('');
  const [searchDirty, setSearchDirty] = useState(false);
  const [formValue, setFormValue] = useState({search: ''});
  const [formValid, setFormValid] = useState(true);

  useEffect((e) => {
    if(searchError || !searchDirty) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [searchError, searchDirty]);

  const blurHandler = (e) => {
    switch (e.target.name) {
      case 'search':
        setSearchDirty(true)
        break
    }
  }

  const handleChangeSearch = (e) => {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });

    if(e.target.name === 'search' && !e.target.validity.valid) {
      setSearchError('Что-то пошло не так...');
      if(!e.target.value) {
        setSearchError('Необходимо заполнить поле')
      }
    } else {
      setSearchError('');
    }
  }

  return (
    <section className='search-form'>
      <form className='search-form__form' id='search' noValidate>
        <input required className='search-form__input' form='search' placeholder='Фильм'
        value={formValue.search}
        minLength={3}
        onBlur={e => blurHandler(e)}
        name="search"
        onChange={handleChangeSearch} 
        ></input>
        <button className='search-form__btn link-hover' type='submit' form='search'>
          <img className='search-form__btn-img' src={search} alt='кнопка поиска' />
        </button>
      </form>
      <p className={`search-form__validate ${(searchDirty && searchError) && `search-form__validate_state_active`}`}>{searchError}</p>
      <FilterCheckbox isChecked={isChecked} onSwitchClick={onSwitchClick}/>
      <hr className='search-form__line' />
    </section>
  )
}

export default SearchForm;