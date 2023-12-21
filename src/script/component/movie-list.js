import './movie-item.js';

class MovieList extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({mode: 'open'});
  }

  set listMovie(listMovie) {
    this._listMovie = listMovie;
    this.render();
  }

  render() {
    this.shadowDOM.innerHTML = `
      <style>
        :host {
          width: 100%;
          display: flex;
          list-style: none;
          gap: 16px;
          flex-wrap: wrap;
          justify-content: center;
        }
      </style>
    `;
    this._listMovie.forEach((movie) => {
      const movieItemElement = document.createElement('movie-item');
      movieItemElement.item = movie;
      this.shadowDOM.appendChild(movieItemElement);
    });
  }
}

customElements.define('movie-list', MovieList);
