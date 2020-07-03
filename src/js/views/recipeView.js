import { elements } from './base';
import { Fraction } from 'fractional';

export const clearRecipe = () => {
  elements.recipe.innerHTML = ' ';
};

const formatCount = count => {
 if (count) {
 // newCount = 2.5 --> 2 1/2
 // newCount = 0.5 --> 1/2
 const newCount = Math.round(count * 1000) / 1000;
 const [int, dec] = newCount.toString().split('.').map(el => parseInt(el, 10));

 if (!dec) return newCount;

 if (int === 0) {
   const fr = new Fraction(newCount);
   return `${fr.numerator}/${fr.denominator}`;
 } else {
    const fr = new Fraction(newCount - int);
    return `${int} ${fr.numerator}/${fr.denominator}`;
 }
 }
 return '?';
};

const createIngredient = ingredient => `
<li class="recipe__item">
    <svg class="recipe__icon">
        <use href="img/icons.svg#icon-check"></use>
    </svg>
    <div class="recipe__count">${formatCount(ingredient.count)}</div>
    <div class="recipe__ingredient">
        <span class="recipe__unit">${ingredient.unit}</span>
       ${ingredient.ingredient}
    </div>
</li>
`;

export const renderRecipe = (recipe, isLiked) => {
  const markup = `
  <figure class="recipe__fig">
      <img src="${recipe.img}" alt="${recipe.title}" class="recipe__img">
      <h1 class="recipe__title">
          <span>${recipe.title}</span>
      </h1>
  </figure>

  <div class="recipe__details">
      <div class="recipe__info">
          <svg class="recipe__info-icon">
              <use href="img/icons.svg#icon-stopwatch"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${recipe.time}</span>
          <span class="recipe__info-text"> minutes</span>
      </div>
      <div class="recipe__info">
          <svg class="recipe__info-icon">
              <use href="img/icons.svg#icon-man"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
          <span class="recipe__info-text"> servings</span>

          <div class="recipe__info-buttons">
              <button class="btn-tiny btn-decrease">
                  <svg>
                      <use href="img/icons.svg#icon-circle-with-minus"></use>
                  </svg>
              </button>
              <button class="btn-tiny btn-increase">
                  <svg>
                      <use href="img/icons.svg#icon-circle-with-plus"></use>
                  </svg>
              </button>
          </div>

      
      </a>
  </div>
  `;
  elements.recipe.insertAdjacentHTML('afterbegin', markup);
};

export const updateServingsIngredients = recipe => {
   // Update the servings
document.querySelector('.recipe__info-data--people').textContent = recipe.servings;

   // Update the Ingredients
const countElements = Array.from(document.querySelectorAll('.recipe__count'));
countElements.forEach((el, i) => {
  el.textContent = formatCount(recipe.ingredients[i].count);
});
};
