import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function Movies({savedCard, isSavedCard, isChecked, onSwitchClick, onBurgerClick}) {
  return (
    <section className='movies'>
      <Header onBurgerClick={onBurgerClick}/>
      <main>
        <SearchForm isChecked={isChecked} onSwitchClick={onSwitchClick}/>
        <MoviesCardList/>
      </main>
      <Footer />
    </section>
  )
}

export default Movies;