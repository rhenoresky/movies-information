import axios from 'axios';

class DataSource {
  static async getDetailMovie(id) {
    const options = {
      method: 'GET',
      url: 'https://imdb8.p.rapidapi.com/title/get-overview-details',
      params: {
        tconst: `${id}`,
        currentCountry: 'US',
      },
      headers: {
        'X-RapidAPI-Key': process.env.API_KEY,
        'X-RapidAPI-Host': process.env.API_HOST,
      },
    };

    try {
      const response = await axios.request(options);
      return {
        title: response.data.title.title,
        image: response.data.title.image.url,
        rating: response.data.ratings.rating,
        duration: {
          minute: response.data.title.runningTimeInMinutes % 60,
          hour: Math.floor(response.data.title.runningTimeInMinutes / 60),
        },
        year: response.data.title.year,
        plot: response.data.plotSummary ? response.data.plotSummary.text : response.data.plotOutline.text,
      };
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }

  static async getPopularMovies() {
    const options = {
      method: 'GET',
      url: 'https://imdb8.p.rapidapi.com/title/get-most-popular-movies',
      params: {
        homeCountry: 'US',
        currentCountry: 'US',
        purchaseCountry: 'US',
      },
      headers: {
        'X-RapidAPI-Key': process.env.API_KEY,
        'X-RapidAPI-Host': process.env.API_HOST,
      },
    };

    try {
      const response = await axios.request(options);
      return response.data.slice(0, 6);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }

  static async searchMovie(name) {
    const options = {
      method: 'GET',
      url: 'https://imdb8.p.rapidapi.com/title/v2/find',
      params: {
        title: `${name}`,
        limit: '6',
        sortArg: 'moviemeter,asc',
      },
      headers: {
        'X-RapidAPI-Key': process.env.API_KEY,
        'X-RapidAPI-Host': process.env.API_HOST,
      },
    };

    try {
      const response = await axios.request(options);
      if (response.data.results) {
        return response.data.results.map((movie) => {
          return movie.id;
        });
      }
      return -1;
    } catch (error) {
      alert(error);
      console.error(error);
    }
  }
}

export default DataSource;
