
import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
  elements.searchInput.value = '';
};


// type 'prev' or 'next'
const createButton = (page, type) => `
<button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
<span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
    <svg class="search__icon">
        <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
    </svg>
</button>
`;

const renderButtons = (page, numResults, resPerPage) => {
   const pages = Math.ceil(numResults / resPerPage);

    let button;
   if (page === 1 && pages > 1) {
       // Only button to go to next page
       button = createButton(page, 'next');
     } else if (page < pages) {
       // Both buttons
       button = `
       ${createButton(page, 'prev')}
       ${createButton(page, 'next')}
       `;
     } else if (page === pages && pages > 1) {
      // Only button to go to prev page
      button = createButton(page, 'prev');
   }

   elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
  // render results of current page
  const start = (page - 1) * resPerPage;
  const end = page * resPerPage;

   recipes.slice(start, end).forEach(renderRecipe);

    // render pagination renderButtons
    renderButtons(page, recipes.length, resPerPage);
};
