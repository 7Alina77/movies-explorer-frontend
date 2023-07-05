import './Profile.css';
import React from 'react';
import Header from '../Header/Header';
import { useState, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { NAME_REG_EXP } from '../../utils/constants';

function Profile({loggedIn, errorOfAuth, onClick, onUpdateUser, onBurgerClick}) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name,setName] = useState('');
  const [email, setEmail] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [nameDirty, setNameDirty] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [disabledOfSave, setDisabledOfSave ] = useState(true);

  function handleDisabled() {
    setDisabled(!disabled);
  }

  function handleSave(e) {
      setDisabled(!disabled);
      handleSubmit(e);
  }
  
  useEffect(() => {
    setName(currentUser ? currentUser.name : "Виталий");
    setEmail(currentUser ? currentUser.email : "pochta@yandex.ru");
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    if(nameError || emailError) {
      console.log('Данные введены некорректно!');
      return;
    } else {
      onUpdateUser({
        name: name,
        email: email,
      });
    }
  }

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  function handleChangeName(e) {
    setName(e.target.value);
    if(e.target.name === 'name' && e.target.validity.patternMismatch) {
      setNameError('Поле может содержать только латиницу, кириллицу, пробел или дефис')
    } else if(e.target.name === 'name' && e.target.validationMessage) {
      setNameError(e.target.validationMessage);
      if(!e.target.value) {
        setNameError('Заполните поле')
      }
    } else {
      setNameError('');
      setDisabledOfSave(!disabledOfSave);
    }
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
    if(e.target.name === 'email' && !isValidEmail(e.target.value)) {
      setEmailError('Необходимо соответствие шаблону: data@domain.zone');
    } else if(e.target.name === 'email' && !e.target.validity.valid) {
      setEmailError(e.target.validationMessage);
      if(!e.target.value) {
        setEmailError('Заполните поле')
      }
    } else {
      setEmailError('');
      setDisabledOfSave(!disabledOfSave)
    }
  }

  const blurHandler = (e) => {
    switch (e.target.name) {
      case 'name':
        setNameDirty(true)
        break
      case 'email':
        setEmailDirty(true)
        break
    }
  }

  return (
    <section className="profile">
      <Header onBurgerClick={onBurgerClick}/>
        <h2 className="profile__title">Привет, {name}!</h2>
          <form onSubmit={handleSubmit} id='profile__form' className='profile__form' /**noValidate**/>
            <div className="profile__container">
              <div className='profile__items'>
                <label className='profile__label'>Имя</label>
                <input className='profile__input'
                  required
                  disabled={disabled}
                  pattern={NAME_REG_EXP}
                  maxLength={30}
                  minLength={3}
                  value={name}
                  onBlur={e => blurHandler(e)}
                  name="name"
                  type="text"
                  onChange={handleChangeName}          
                ></input>
              </div>
              <p className={`profile__validate ${(nameDirty && nameError) && `profile__validate_state_active`}`}>{nameError}</p>
              <div className='profile__items'>
                <label className='profile__label'>Email</label>
                <input className='profile__input'
                  required
                  disabled={disabled}
                  value={email}
                  onBlur={e => blurHandler(e)}
                  name="email"
                  type="email"
                  onChange={handleChangeEmail} 
                ></input>
              </div>
              <p className={`profile__validate ${(emailDirty && emailError) && `profile__validate_state_active`}`}>{emailError}</p>
            </div>
          </form>
          <p className='profile__error'>{errorOfAuth}</p>
          {disabled === true ? (
            <button onClick={handleDisabled} className='profile__submit link-hover' type="button">Редактировать</button>
          ) : (
            <button onClick={handleSave} className={`profile__submit link-hover ${disabledOfSave && `profile__submit_type_active`}`} type="submit">Сохранить</button>
          )}
          <button onClick={onClick} className="profile__link link link-hover">Выйти из аккаунта</button>
    </section>
  )
}

export default Profile;