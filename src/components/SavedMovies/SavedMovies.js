import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function Movies({onBurgerClick}) {
  return (
    <section className='movies'>
      <Header onBurgerClick={onBurgerClick}/>
      <SearchForm />
      <MoviesCardList />
      <Footer />
    </section>
  )
}

export default Movies;