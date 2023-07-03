import './FilterCheckbox.css';
import { useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function FilterCheckbox({isCheckedOnMovies, isCheckedOnSavedMovies, onSwitchClick}) {
  const location = useLocation();
  const path = location.pathname;
  const [stateOfCheckbox, setStateOfCheckbox] = useState();

  useEffect(() => {
    const checkboxOnMovies = JSON.parse(localStorage.getItem('isCheckedShortMoviesOnMovies'));
    const checkboxOnSavedMovies = JSON.parse(localStorage.getItem('isCheckedShortMoviesOnSavedMovies'));
    if(path === '/movies') {
      setStateOfCheckbox(isCheckedOnMovies);
      if(checkboxOnMovies) {
        setStateOfCheckbox(checkboxOnMovies);
      }
    }
    if(path === '/saved-movies') {
      setStateOfCheckbox(isCheckedOnSavedMovies)
      if(checkboxOnSavedMovies) {
        setStateOfCheckbox(checkboxOnSavedMovies);
      }
    }
  },[path, stateOfCheckbox, isCheckedOnMovies, isCheckedOnSavedMovies])

  function handleSwithClick(){
    onSwitchClick();
  }
 
  return (
    <div className='checkbox'>
      <label className='checkbox__switch'>
        <input onClick={handleSwithClick} className={`checkbox__switch-input ${(stateOfCheckbox) && `checkbox__switch-input_state_active`}`} type="checkbox" />
        <span className='checkbox__switch-round'></span>
      </label>
      <p className='checkbox__text'>Короткометражки</p>
    </div>
  )
}

export default FilterCheckbox;