const FilterType = {
  DEFAULT: 'filter-default',
  RANDOM:'filter-random',
  DISCUSSED: 'filter-discussed'
};

const filtersList = document.querySelector('.img-filters');
const filterButtons = document.querySelectorAll('.img-filters__button');
let currentFilter = FilterType.DEFAULT;
let defaultPictures = [];

const getFilters = () => {
  if (currentFilter === FilterType.DEFAULT) {
    return defaultPictures;
  }

  if (currentFilter === FilterType.RANDOM) {
    return defaultPictures.slice().sort(() => Math.random() - 0.5).slice(0, 10);
  }

  if (currentFilter === FilterType.DISCUSSED) {
    return defaultPictures.slice().sort((a, b)=>(b.comments.length - a.comments.length));
  }
};

const onFiltersClick = (evt, callback) =>{
  if (evt.target.classList.contains('img-filters__button')){
    if (evt.target.id === currentFilter) {
      return;
    }
    const filterButton = evt.target;
    currentFilter = evt.target.id;
    filterButtons.forEach((button) => button.classList.remove('img-filters__button--active'));
    filterButton.classList.add('img-filters__button--active');
    callback(getFilters());

  }
};

const addFilterListener = (callback) => {
  filtersList.addEventListener('click', (evt) => {
    onFiltersClick(evt, callback);
  });
};

const showFiltredPhotos = (pictures, callback) => {
  filtersList.classList.remove('img-filters--inactive');
  defaultPictures = pictures.slice();
  addFilterListener(callback);
};
export {showFiltredPhotos};

