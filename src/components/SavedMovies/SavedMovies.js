import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function SavedMovies({savedCard, isSavedCard, isChecked, onSwitchClick, onBurgerClick}) {
  return (
    <section className='saved-movies'>
      <Header onBurgerClick={onBurgerClick}/>
      <SearchForm isChecked={isChecked} onSwitchClick={onSwitchClick}/>
      <MoviesCardList savedCard={savedCard} isSavedCard={isSavedCard}/>
      <Footer />
    </section>
  )
}

export default SavedMovies;