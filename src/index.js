import './sass/main.scss';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
// import { error } from '@pnotify/core';

import imageCard from '../src/templates/image-card.hbs';

import debounce from 'lodash.debounce';
import getRefs from './js/refs';
import ImagesApiService from './js/apiService';

const refs = getRefs();

const imagesApiService = new ImagesApiService();

const onSearch = evt => {
  evt.preventDefault();

  clearGalleryContainer();
  imagesApiService.query = evt.currentTarget.elements.query.value;
  imagesApiService.resetPage();

  imagesApiService.fetchImages().then(appendImagesMarkUp);
};

const onLoadMore = () => {
  imagesApiService.fetchImages().then(appendImagesMarkUp);
};

const appendImagesMarkUp = hits => {
  console.log(hits);
  refs.gallery.insertAdjacentHTML('beforeend', imageCard(hits));
};

const clearGalleryContainer = () => {
  refs.gallery.innerHTML = '';
};

const element = document.getElementById('js-gallery');

const moveTo = () => {
  console.log(element);
  element.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
};

refs.searchForm.addEventListener('submit', onSearch);
refs.searchForm.addEventListener('submit', debounce(moveTo, 750));
refs.loadMoreBtn.addEventListener('click', onLoadMore);
refs.loadMoreBtn.addEventListener('click', debounce(moveTo, 750));
