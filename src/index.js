import './sass/main.scss';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { error } from '@pnotify/core';
import '../node_modules/material-design-icons';

import searchForm from '../src/templates/search-form.hbs';
import imageCard from '../src/templates/image-card.hbs';
import API from './js/apiService';
import debounce from 'lodash.debounce';
import getRefs from './js/refs';

const refs = getRefs();
const toFind = 'cat';
// const pageNumber = '1';

const renderSearchForm = () => {
  const searchMarkUp = searchForm();
  refs.searchForm.innerHTML = searchMarkUp;
};

renderSearchForm();

const onSearch = searchQuery => {
  //   refs.cardContainer.innerHTML = '';
  if (!searchQuery) {
    return;
  }
  API.fetchImages(searchQuery).then(renderImages).catch(onError);
};

const renderImages = img => {
  const imgMarkUp = imageCard(img);
  console.log(imgMarkUp);
  return refs.gallery.insertAdjacentHTML('beforeend', imgMarkUp);
};

const onError = () => {
  return error({ delay: 2000, text: 'Nothing found' });
};

refs.searchForm.addEventListener(
  'input',
  debounce(evt => onSearch(evt.target.value.trim()), 500),
);
