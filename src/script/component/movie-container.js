import './movie-list.js';
import './movie-search.js';

class MovieContainer extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({mode: 'open'});
    this._search = {
      status: false,
      action: undefined,
    };
    this._data = {
      title: '',
      listMovie: undefined,
    };
  }

  set data(data) {
    this._data = data;
    this.render();
  }

  set search(search) {
    this._search = search;
    this.render();
  }

  get search() {
    return this.shadowDOM.querySelector('movie-search').value;
  }

  renderLoading() {
    this.shadowDOM.innerHTML = `
    <style>
      :host {
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .lds-ring {
        display: inline-block;
        position: relative;
        width: 80px;
        height: 80px;
      }
      .lds-ring div {
        box-sizing: border-box;
        display: block;
        position: absolute;
        width: 64px;
        height: 64px;
        margin: 8px;
        border: 8px solid #fff;
        border-radius: 50%;
        animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: #fff transparent transparent transparent;
      }
      .lds-ring div:nth-child(1) {
        animation-delay: -0.45s;
      }
      .lds-ring div:nth-child(2) {
        animation-delay: -0.3s;
      }
      .lds-ring div:nth-child(3) {
        animation-delay: -0.15s;
      }
      @keyframes lds-ring {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    </style>
    <div class="lds-ring">
      <div></div>
    </div>
    `;
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
        gap: 28px;
      }

      .container {
        margin-top: 40px;
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 20px;
        align-items: center;
      }
      
      .container h2 {
        font-size: 30px;
        font-weight: 600;
        text-transform: uppercase;
        color: #EEEEEE;
      }
      
      @media screen and (min-width: 768px) {
        .container {
          flex-direction: row;
          justify-content: space-between;
        }
      }
    </style>
      <section class="container">
        <h2>${this._data.title}</h2>
      </section>
    `;

    if (this._data.listMovie) {
      const movieListElement = document.createElement('movie-list');
      movieListElement.listMovie = this._data.listMovie;
      this.shadowDOM.appendChild(movieListElement);
    }

    if (this._search.status) {
      const movieSearchElement = document.createElement('movie-search');
      const containerElemenet = this.shadowDOM.querySelector('.container');

      movieSearchElement.clickEvent = this._search.action;
      containerElemenet.appendChild(movieSearchElement);
    }
  }
}

customElements.define('movie-container', MovieContainer);
