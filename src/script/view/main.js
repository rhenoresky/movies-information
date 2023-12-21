import '../component/movie-container.js';
import '../component/movie-detail.js';
import DataSource from '../data/data-source.js';

const main = async () => {
  const mainElement = document.querySelector('main');
  const movieContainerElement = document.createElement('movie-container');
  const movieDetailElement = document.createElement('movie-detail');
  mainElement.appendChild(movieDetailElement);
  mainElement.appendChild(movieContainerElement);

  const searchAction = async () => {
    if (!movieContainerElement.search) {
      renderPopularMovies();
    } else {
      const name = movieContainerElement.search;
      movieContainerElement.renderLoading();
      const searchMovie = await DataSource.searchMovie(name);

      if (searchMovie < 0) {
        movieContainerElement.data = {title: `${name} movies not found`, listMovie: undefined};
        movieContainerElement.search = {status: true, action: searchAction};
      } else {
        const movies = [];
        for (let i = 0; i < searchMovie.length; i++) {
          const id = searchMovie[i].split('/')[2];
          const result = await DataSource.getDetailMovie(id);
          movies.push(result);
        }

        movieDetailElement.movie = movies[0];
        movieContainerElement.data = {title: `search results of ${name}`, listMovie: movies};
        movieContainerElement.search = {status: true, action: searchAction};
      }
    }
  };

  const renderPopularMovies = async () => {
    movieContainerElement.renderLoading();
    const popularMovies = await DataSource.getPopularMovies();
    const movies = [];
    for (let i = 0; i < popularMovies.length; i++) {
      const id = popularMovies[i].split('/')[2];
      const result = await DataSource.getDetailMovie(id);
      movies.push(result);
    }

    movieDetailElement.movie = movies[0];
    movieContainerElement.data = {title: 'Popular Movies', listMovie: movies};
    movieContainerElement.search = {status: true, action: searchAction};
  };

  renderPopularMovies();
};

export default main;
