import './sass/main.scss';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

import imageCard from '../src/templates/image-card.hbs';

// import debounce from 'lodash.debounce';
import getRefs from './js/refs';
import ImagesApiService from './js/apiService';

const refs = getRefs();
const element = document.getElementById('js-gallery');

const imagesApiService = new ImagesApiService();

const onSearch = evt => {
  evt.preventDefault();

  clearGalleryContainer();
  imagesApiService.query = evt.currentTarget.elements.query.value;
  imagesApiService.resetPage();

  imagesApiService.fetchImages().then(appendImagesMarkUp);
};

const onLoadMore = () => {
  imagesApiService.fetchImages().then(appendImagesMarkUp).then(moveTo); // fn moveTo was called here to avoid scroll after search button
};

const appendImagesMarkUp = hits => {
  console.log(hits);
  refs.gallery.insertAdjacentHTML('beforeend', imageCard(hits));

  if (hits.length >= 12) {
    refs.loadMoreBtn.classList.remove('hidden');
  } else {
    refs.loadMoreBtn.classList.add('hidden');
  }
  // moveTo();
};

const clearGalleryContainer = () => {
  refs.gallery.innerHTML = '';
};

const moveTo = () => {
  element.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
};

refs.searchForm.addEventListener('submit', onSearch);

refs.loadMoreBtn.addEventListener('click', onLoadMore);
