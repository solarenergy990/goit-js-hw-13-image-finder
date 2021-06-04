import './sass/main.scss';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { error } from '@pnotify/core';
import '../node_modules/material-design-icons';

import searchForm from '../src/templates/search-form.hbs';
import API from './js/apiService';
import getRefs from './js/refs';

const refs = getRefs();
const toFind = 'cat';
const pageNumber = '1';

const renderSearchForm = () => {
  const searchMarkUp = searchForm();
  refs.searchForm.innerHTML = searchMarkUp;
};

renderSearchForm();
