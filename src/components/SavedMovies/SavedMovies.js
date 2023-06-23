import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function SavedMovies({ isChecked, onSwitchClick, onBurgerClick}) {

  return (
    <section className='saved-movies'>
      <Header onBurgerClick={onBurgerClick}/>
      <main>
        <SearchForm isChecked={isChecked} onSwitchClick={onSwitchClick}/>
        <MoviesCardList />
      </main>
      <Footer />
    </section>
  )
}

export default SavedMovies;