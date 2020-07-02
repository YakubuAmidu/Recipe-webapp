import axios from 'axios';
import { key, proxy } from '../config';

export default class Recipe {
  constructor(id) {
    this.id = id
  }

  async getRecipe() {
    try {
      const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
        this.title = res.data.recipe.title;
        this.author = res.data.recipe.publisher;
        this.img = res.data.recipe.image_url;
        this.url = res.data.recipe.source_url;
        this.ingredients = res.data.recipe.ingredients;
    } catch(error) {
      console.log(error);
      alert('Something went wrong :(');
    }
  }

  calcTime() {
    const numIng = this.ingredients.length;
    const periods = Math.ceil(numIng / 3);
    this.time = periods * 15;
  }

  calcServings() {
    this.servings = 4;
  }
  async getRecipe() {
    try {
      const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
        this.title = res.data.recipe.title;
        this.author = res.data.recipe.publisher;
        this.img = res.data.recipe.image_url;
        this.url = res.data.recipe.source_url;
        this.ingredients = res.data.recipe.ingredients;
    } catch(error) {
      console.log(error);
      alert('Something went wrong :(');
    }
  }

  calcTime() {
    const numIng = this.ingredients.length;
    const periods = Math.ceil(numIng / 3);
    this.time = periods * 15;
  }

  calcServings() {
    this.servings = 4;
  }



     objIng = {
       count,
       unit: arrIng[unitIndex],
       ingredient: arrIng.slice(unitIndex + 1).join(' ')
     };

     } else if (parseInt(arrIng[0], 10)){
       // There is NO unt, but 1st element is number
       objIng = {
         count: parseInt(arrIng[0], 10),
         unit: ' ',
         ingredient: arrIng.slice(1).join(' ')
       }
     } else if (unitIndex === -1) {
       // There is NO unit and NO number in 1st position
       objIng = {
         count: 1,
         unit: ' ',
         ingredient
       }
     }

      return objIng;
    });
    this.ingredients = newIngredients;
  }

  updateServings (type) {
    // Servings
const newServings = type === 'dec' ? this.servings -1 : this.servings + 1;

    // Ingredients
this.ingredients.forEach(ing => {
  ing.count *= (newServings / this.serving);
});

    this.servings = newServings;
  }
}
