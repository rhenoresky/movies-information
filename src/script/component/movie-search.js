class MovieSearch extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({mode: 'open'});
  }

  connectedCallback() {
    this.render();
  }

  set clickEvent(event) {
    this._clickEvent = event;
    this.render();
  }

  get value() {
    return this.shadowDOM.querySelector('#searchInput').value;
  }

  render() {
    this.shadowDOM.innerHTML = `
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css">
      <style>
      :host {
        width: fit-content;
        display: flex;
        border-radius: 5px;
        overflow: hidden;
      }
      
      #searchInput {
        width: 212px;
        padding: 10px;
        border: none;
        outline: none;
      }
      
      #searchInput::-webkit-search-cancel-button {
        cursor: pointer;
      }
      
      #searchButton {
        background-color: #4ECCA3;
        color: #fff;
        border: none;
        padding: 10px;
        cursor: pointer;
      }
      </style>
      <input placeholder="find any movie" id="searchInput" type="search">
      <button id="searchButton" type="submit">
        <i class="fas fa-search"></i>
      </button>
    `;

    this.shadowDOM.querySelector('#searchButton').addEventListener('click', this._clickEvent);
  }
}

customElements.define('movie-search', MovieSearch);
