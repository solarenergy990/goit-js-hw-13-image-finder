import './sass/main.scss';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { error } from '@pnotify/core';

import searchForm from '../src/templates/search-form.hbs';
import imageCard from '../src/templates/image-card.hbs';

import debounce from 'lodash.debounce';
// import getRefs from './js/refs';
import ImagesApiService from './js/apiService';

// const refs = getRefs();
const refs = {
  mainContainer: document.querySelector('.js-main-container'),
  searchForm: document.querySelector('#search-form'),
  gallery: document.querySelector('.js-gallery'),
  submitBtn: document.querySelector('[data-action="submit"]'),
  loadMoreBtn: document.querySelector('[data-action="load-more"]'),
};

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

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
