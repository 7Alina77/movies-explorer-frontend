import {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import './Auth.css';
import MainLogo from "../MainLogo/MainLogo";

function Login({errorOfAuth, onSubmit}) {
  const [emailError, setEmailError] = useState('');
  const [passError, setPassError] = useState(''); 
  const [emailDirty, setEmailDirty] = useState(false);
  const [passDirty, setPassDirty] = useState(false);
  const [formValid, setFormValid] = useState(false); 
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  });

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    if(!formValue.email || !formValue.pass) {
      return;
    }
    onSubmit(formValue.email, formValue.pass);
    setFormValue({email: '', password: ''});
  }

  const blurHandler = (e) => {
    switch (e.target.name) {
      case 'email':
        setEmailDirty(true)
        break
      case 'pass':
        setPassDirty(true)
        break
    }
  }

  const handleChangeLogin = (e) => {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });

    if(e.target.name === 'email' && !isValidEmail(e.target.value)) {
      setEmailError('Необходимо соответствие шаблону: data@domain.zone');
    } else if(e.target.name === 'email' && !e.target.validity.valid) {
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
    if(emailError || passError || !emailDirty || !passDirty) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [emailError, passError, emailDirty, passDirty]);

  return(
    <main className="authorization">
      <MainLogo />
      <h2 className="authorization__title">Рады видеть!</h2>
        <form onSubmit={handleSubmitLogin} className='authorization__form' /**noValidate**/>
          <div className="authorization__container authorization__container-login">
            <label className='authorization__label'>Email</label>
            <input className='authorization__input'
              required
              value={formValue.email}
              onBlur={e => blurHandler(e)}
              name="email"
              type="email"
              onChange={handleChangeLogin} 
            ></input>
            <p className={`authorization__validate ${(emailDirty && emailError) && `authorization__validate_state_active`}`}>{emailError}</p>
            <label className='authorization__label'>Пароль</label>
            <input className='authorization__input'
              required
              value={formValue.pass}
              maxLength={15}
              minLength={3}
              onBlur={e => blurHandler(e)}
              name="pass"
              type="password"
              onChange={handleChangeLogin}
            ></input>
            <p className={`authorization__validate ${(passDirty && passError) && `authorization__validate_state_active`}`}>{passError}</p>
          </div>
          <p className='authorization__error'>{errorOfAuth}</p>
          <button disabled={!formValid} className={`authorization__submit link-hover ${!formValid && `authorization__submit_type_active`}`} type="submit">Войти</button>
        </form>
        <div className="authorization__login">
          <p>Ещё не зарегистрированы?</p>
          <Link to='/signup'className="authorization__link link link-hover">Регистрация</Link>
        </div>
    </main>
  )
}

export default Login;