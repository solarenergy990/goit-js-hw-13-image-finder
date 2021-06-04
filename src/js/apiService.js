const API_KEY = '21934405-57162f124158c436f0bdddd5d';
const BASE_URL = 'https://pixabay.com/api';

async function fetchPictures(searchQuery) {
  const response = await fetch(
    `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${pageNumber}&per_page=12&key=${API_KEY}`,
  );
  const data = response.json();

  if (response.ok === false) {
    return error({ delay: 1000, text: 'Nothing found' }); // in case fetch reacts wrong on error 404
  }
  return data;
}

export default { fetchPictures };
