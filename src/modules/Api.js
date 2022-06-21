import { DisplayPopup, DisplayCards } from './Functions.js';

export default class Api {
  constructor() {
    this.InvolvementApiEP = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/';
    this.InvolvementAppID = 'YrrcGavt9pgNOYlenrro';
    this.FreeMealEP = 'https://www.themealdb.com/api/json/v1/';
  }

  GetMealInfos = async (id) => {
    await fetch(`${this.FreeMealEP}/1/categories.php`)
      .then((response) => response.json())
      .then((json) => {
        json.categories.forEach((item) => {
          if (item.idCategory === id) {
            this.GetExamples(item, id);
          }
        });
      });
  };

  GetExamples = async (item, id) => {
    await fetch(`${this.FreeMealEP}/1/filter.php?c=${item.strCategory}`)
      .then((response) => response.json())
      .then((json) => DisplayPopup(item, id, json));
  };

  GetMeals = async () => {
    await fetch(`${this.FreeMealEP}/1/categories.php`)
      .then((response) => response.json())
      .then((json) => { DisplayCards(json.categories); });
  }
}
