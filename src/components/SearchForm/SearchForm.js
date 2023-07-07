import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import search from '../../images/search.svg';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';


function SearchForm({ handleOnSearch, isCheckedOnMovies, isCheckedOnSavedMovies, onSwitchClick}) {
  const location = useLocation();
  const path = location.pathname;
  const [searchError, setSearchError] = useState('');
  const [searchDirty, setSearchDirty] = useState(false);
  const [formValue, setFormValue] = useState({search: ''});
  const [formValid, setFormValid] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(true);

  useEffect(() => {
    if(path === '/movies') {
      const searchOnMovies = localStorage.getItem('moviesSearchOnMovies');
      if(searchOnMovies) {
        setFormValue({search: searchOnMovies})
      }
    }
    if(path ==='/saved-movies') {
      const searchOnSavedMovies = localStorage.getItem('moviesSearchOnSavedMovies');
      if(searchOnSavedMovies) {
        setFormValue({search: searchOnSavedMovies});
      }
    }
  },[path]);

  useEffect(() => {
    if(path === '/movies') {
      if(searchError || !searchDirty) {
        setFormValid(false);
      } else {
        setFormValid(true);
      }
    }
  }, [searchError, searchDirty, path]);

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
 
    if(path === '/movies') {
      if(e.target.name === 'search' && e.target.value) {
        setBtnDisabled(false);
        if(!e.target.value) {
          setSearchError('Необходимо заполнить поле')
        }
      } else {
        setSearchError('');
      }
    } else {
      setSearchError('');
      setBtnDisabled(false)
    }
  }

  function handleOnSearchSubmit(e) {
    e.preventDefault();
    handleOnSearch(formValue.search);
  }

  return (
    <section className='search-form'>
      <form onSubmit={handleOnSearchSubmit} className='search-form__form' id='search' noValidate>
        <input required className='search-form__input' form='search' placeholder='Фильм'
        value={formValue.search ?? ''}
        onBlur={e => blurHandler(e)}
        name="search"
        onChange={handleChangeSearch} 
        ></input>
        <button className={`search-form__btn link-hover ${btnDisabled && `search-form__btn_state_active`}`} type='submit' form='search'>
          <img className='search-form__btn-img' src={search} alt='кнопка поиска' />
        </button>
      </form>
      <p className={`search-form__validate ${(searchDirty && searchError) && `search-form__validate_state_active`}`}>{searchError}</p>
      <FilterCheckbox isCheckedOnMovies={isCheckedOnMovies} isCheckedOnSavedMovies={isCheckedOnSavedMovies} onSwitchClick={onSwitchClick}/>
      <hr className='search-form__line' />
    </section>
  )
}

export default SearchForm;