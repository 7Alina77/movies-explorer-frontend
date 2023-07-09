import { SHORT_MOVIE } from "./constants";

export function convertTime(time) {
  const min = time % 60;
  const hour = (time - min) / 60;
  if(hour < 1) {
    return `${min}м`;
  } else {
    return `${hour}ч ${min}м`
  }
}

export function handleSearchMovies(movies, search) {
  const toLowerCaseSearch = search.toLowerCase().trim();
  const data = movies.filter((movie) => {
    const commonNameEn = movie.nameEN.toLowerCase().trim();
    const commonNameRu = movie.nameRU.toLowerCase().trim();
    return ( commonNameEn.includes(toLowerCaseSearch) || commonNameRu.includes(toLowerCaseSearch))
  })
  return data;
}

export function handleFilterMoviesByTime(movies) {
  const shortMovies = movies.filter((movie) => movie.duration <= SHORT_MOVIE);
  return shortMovies;
}