import './Auth.css';
import {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import MainLogo from '../MainLogo/MainLogo';

function Register({onSubmit}) {
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passError, setPassError] = useState(''); 
  const [nameDirty, setNameDirty] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);
  const [passDirty, setPassDirty] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    pass: ''
  });

  const handleSubmitRegister = (e) => {
    e.preventDefault();
    if(!formValue.email || !formValue.pass || !formValue.name) {
      console.log('Данные введены некорректно!');
      return;
    }
    onSubmit(formValue.name ,formValue.email , formValue.pass);
    setFormValue({
      name: '',
      email:'', 
      pass: ''
    })
  } 

  const blurHandler = (e) => {
    switch (e.target.name) {
      case 'name':
        setNameDirty(true)
        break
      case 'email':
        setEmailDirty(true)
        break
      case 'pass':
        setPassDirty(true)
        break
    }
  }

  const handleChangeRegister = (e) => {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });

    if(e.target.name === 'name' && e.target.validationMessage) {
      setNameError('Что-то пошло не так...');
      if(!e.target.value) {
        setNameError('Необходимо заполнить поле')
      }
    } else {
      setNameError('')
    }
    if(e.target.name === 'email' && !e.target.validity.valid) {
      setEmailError('Что-то пошло не так...');
      if(!e.target.value) {
        setEmailError('Необходимо заполнить поле')
      }
    } else {
      setEmailError('');
    }
    if(e.target.name === 'pass' && e.target.validationMessage) {
      setPassError('Что-то пошло не так...');
      if(!e.target.value) {
        setPassError('Необходимо заполнить поле')
      }
    } else {
      setPassError('');
    }
  }

  useEffect((e) => {
    if(nameError || emailError || passError || !nameDirty || !emailDirty || !passDirty) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [nameError, emailError, passError, nameDirty, emailDirty, passDirty]);

  return (
    <section className="authorization">
      <MainLogo />
      <h2 className="authorization__title">Добро пожаловать!</h2>
        <form onSubmit={handleSubmitRegister} id='authorization__form' className='authorization__form' noValidate>
          <div className="authorization__container">
            <label className='authorization__label'>Имя</label>
            <input className='authorization__input'
              maxLength={10}
              minLength={3}
              value={formValue.name}
              onBlur={e => blurHandler(e)}
              name="name"
              type="text"
              onChange={handleChangeRegister}          
            ></input>
            <p className={`authorization__validate ${(nameDirty && nameError) && `authorization__validate_state_active`}`}>{nameError}</p>
            <label className='authorization__label'>Email</label>
            <input className='authorization__input'
              value={formValue.email}
              onBlur={e => blurHandler(e)}
              name="email"
              type="email"
              onChange={handleChangeRegister} 
            ></input>
            <p className={`authorization__validate ${(emailDirty && emailError) && `authorization__validate_state_active`}`}>{emailError}</p>
            <label className='authorization__label'>Пароль</label>
            <input className='authorization__input'
              value={formValue.pass}
              maxLength={15}
              minLength={3}
              onBlur={e => blurHandler(e)}
              name="pass"
              type="password"
              onChange={handleChangeRegister}
            ></input>
            <p className={`authorization__validate ${(passDirty && passError) && `authorization__validate_state_active`}`}>{passError}</p>
          </div>
          <button form='authorization__form' disabled={!formValid} className={`authorization__submit link-hover ${!formValid && `authorization__submit_type_active`}`} type="submit">Зарегистрироваться</button>
        </form>
        <div className="authorization__login">
          <p>Уже зарегистрированы?</p>
          <Link to='/signin'className="authorization__link link link-hover">Войти</Link>
        </div>
    </section>
  )
}

export default Register;