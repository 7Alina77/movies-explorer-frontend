import './FilterCheckbox.css';

function FilterCheckbox() {
  return (
    <div className='checkbox'>
      <label className='checkbox__switch'>
        <input className='checkbox__switch-input' type="checkbox" />
        <span className='checkbox__switch-round'></span>
      </label>
      <p className='checkbox__text'>Короткометражки</p>
    </div>
  )
}

export default FilterCheckbox;