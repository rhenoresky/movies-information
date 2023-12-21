class MovieItem extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({mode: 'open'});
  }

  set item(movie) {
    this._movie = movie;
    this.render();
  }

  async render(id) {
    this.shadowDOM.innerHTML = `
      <style>
        :host {
          width: 45%;
          max-width: 200px;
          height: 200px;
          border-radius: 8px;
          overflow: hidden;
          cursor: pointer;
        }
        
        :host img {
          width: 100%;
          object-fit: cover;
          object-position: center;
        }
        
        @media screen and (min-width: 768px) {
          :host {
            width: 15.5%;
            min-width: 180px;
            height: 220px;
          }
        }
      </style>
      <img src="${this._movie.image}" alt="Image ${this._movie.title}">
    `;

    this.addEventListener('click', this.showMovie);
  }

  showMovie() {
    document.querySelector('movie-detail').movie = this._movie;
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}

customElements.define('movie-item', MovieItem);
