const FilterType = {
  DEFAULT: 'filter-default',
  RANDOM:'filter-random',
  DISCUSSED: 'filter-discussed'
};
const filtersList = document.querySelector('.img-filters');
const filterButtons = document.querySelectorAll('.img-filters__button');


const onFiltersClick = (evt,pictures) =>{
  filterButtons.forEach((button) => button.classList.remove('img-filters__button--active'));

  const filterButton = evt.target;
  filterButton.classList.add('img-filters__button--active');

  console.log(pictures);
};

const addFilterListener = (pictures) => {
  filtersList.addEventListener('click', (evt) => {
    onFiltersClick(evt, pictures);
  });
};

const showFilters = (pictures) => {
  filtersList.classList.remove('img-filters--inactive');
  addFilterListener(pictures);
};
export {showFilters};

