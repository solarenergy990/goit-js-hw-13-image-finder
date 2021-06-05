const API_KEY = '21934405-57162f124158c436f0bdddd5d';
const BASE_URL = 'https://pixabay.com/api';

export default class ImagesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.perPage = 12;
  }

  // fetchImages() {
  //   console.log(this);
  //   const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=${this.perPage}&key=${API_KEY}`;

  //   return fetch(url)
  //     .then(response => response.json())
  //     .then(data => {
  //       // console.log(data.hits);
  //       this.incrementPage();

  //       return data.hits;
  //     });
  // }

  async fetchImages() {
    const url = await fetch(
      `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=${this.perPage}&key=${API_KEY}`,
    );

    const data = await url.json().then(data => {
      this.incrementPage();

      return data;
    });

    return data.hits;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
