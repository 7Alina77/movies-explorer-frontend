import './FilterCheckbox.css';

function FilterCheckbox({isChecked, onSwitchClick}) {
  return (
    <div className='checkbox'>
      <label className='checkbox__switch'>
        <input onClick={onSwitchClick} className={`checkbox__switch-input ${isChecked && `checkbox__switch-input_state_active`}`} type="checkbox" />
        <span className='checkbox__switch-round'></span>
      </label>
      <p className='checkbox__text'>Короткометражки</p>
    </div>
  )
}

export default FilterCheckbox;