import { Link } from "react-router-dom";
import './Auth.css';
import MainLogo from "../MainLogo/MainLogo";
import useFormValidation from "../../hooks/useFormValidation";

function Login({errorOfAuth, onSubmit}) {
  const {values, errors, isFormValid, handleOnChange, handleResetValidation} = useFormValidation();

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    onSubmit(values.email , values.pass);
    handleResetValidation()
  }

  return(
    <main className="authorization">
      <MainLogo />
      <h2 className="authorization__title">Рады видеть!</h2>
        <form onSubmit={handleSubmitLogin} className='authorization__form' /**noValidate**/>
          <div className="authorization__container authorization__container-login">
            <label className='authorization__label'>Email</label>
            <input className='authorization__input'
              required
              value={values.email}
              name="email"
              type="email"
              onChange={handleOnChange} 
            ></input>
            <p className={`authorization__validate ${(errors.email) && `authorization__validate_state_active`}`}>{errors.email}</p>
            <label className='authorization__label'>Пароль</label>
            <input className='authorization__input'
              required
              value={values.pass}
              maxLength={15}
              minLength={3}
              name="pass"
              type="password"
              onChange={handleOnChange}
            ></input>
            <p className={`authorization__validate ${(errors.pass) && `authorization__validate_state_active`}`}>{errors.pass}</p>
          </div>
          <p className='authorization__error'>{errorOfAuth}</p>
          <button disabled={!isFormValid} className={`authorization__submit link-hover ${!isFormValid && `authorization__submit_type_active`}`} type="submit">Войти</button>
        </form>
        <div className="authorization__login">
          <p>Ещё не зарегистрированы?</p>
          <Link to='/signup'className="authorization__link link link-hover">Регистрация</Link>
        </div>
    </main>
  )
}

export default Login;