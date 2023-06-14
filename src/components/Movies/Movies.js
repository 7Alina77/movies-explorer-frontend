import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function Movies() {
  return (
    <section className='movies'>
      <Header />
      <SearchForm />
      <MoviesCardList />
      <Footer />
    </section>
  )
}

export default Movies;