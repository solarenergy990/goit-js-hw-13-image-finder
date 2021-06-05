export default function getRefs() {
  return {
    mainContainer: document.querySelector('.js-main-container'),
    searchForm: document.querySelector('#search-form'),
    gallery: document.querySelector('.js-gallery'),
    submitBtn: document.querySelector('[data-action="submit"]'),
    loadMoreBtn: document.querySelector('[data-action="load-more"]'),
  };
}
