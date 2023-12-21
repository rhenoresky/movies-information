class MovieDetail extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({mode: 'open'});
  }

  set movie(movie) {
    this._movie = movie;
    this.render();
  }

  render() {
    this.shadowDOM.innerHTML = `
      <style>
        * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        }
        
        :host {
          width: 100%;
          display: flex;
          flex-direction: column;
          background-color: #393E46;
          border-radius: 8px;
          overflow: hidden;
        }
        
        .image-detail {
          width: 100%;
          height: 240px;
        }
        
        .image-detail img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top;
        }
        
        .information-detail {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 16px;
        }
        
        .information-detail h1 {
          font-size: 36px;
          font-weight: 600;
          text-transform: uppercase;
          color: #EEEEEE;
          line-height: 40px;
        }
        
        .information-detail div {
          font-weight: 600;
          color: #EEEEEE;
          font-size: 12px;
          letter-spacing: 2px;
          display: flex;
          gap: 8px;
          margin-top: 6px;
        }
        
        .star {
          color: #4ECCA3;
        }
        
        .slash {
          font-size: 10px;
        }
        
        .information-detail p {
          font-size: 16px;
          color: #EEEEEE;
          font-weight: 300;
          margin-top: 16px;
          text-align: justify;
        }
        
        .information-detail>ul {
          margin-top: 20px;
          display: flex;
          gap: 12px;
          list-style: none;
          width: 100%;
          flex-wrap: wrap;
        }
        
        .information-detail>ul>li {
          color: #EEEEEE;
          background-color: #4ECCA3;
          padding: 6px 8px;
          border-radius: 2px;
        }
        
        @media screen and (min-width: 768px) {
          :host {
            flex-direction: row;
            gap: 20px;
          }
        
          .image-detail {
            order: 2;
            flex-basis: 65%;
            height: 480px;
          }
        
          .image-detail img {
            height: auto;
          }
        
          .information-detail {
            order: 1;
            flex-basis: 35%;
          }
        }
      </style>
      <div class="image-detail">
        <img src="${this._movie.image}" alt="Cover ${this._movie.title}">
      </div>
      <section class="information-detail">
        <h1>${this._movie.title}</h1>
        <div>
          <span><i class="fa fa-star star" aria-hidden="true"></i> ${this._movie.rating}<i class="slash"> / </i>10</span>|<span>${this._movie.duration.hour}H ${this._movie.duration.minute}M</span>|<span>${this._movie.year}</span>
        </div>
        <p>${this._movie.plot}</p>
        <ul id="genres">
          <li>Horror</li>
          <li>Adventure</li>
          <li>Crime</li>
          <li>Fantasy</li>
        </ul>
      </section>
    `;
  }
}

customElements.define('movie-detail', MovieDetail);
