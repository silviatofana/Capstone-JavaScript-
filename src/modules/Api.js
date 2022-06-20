import DisplayCards from './Functions.js';

export default class Api {
  constructor() {
    this.InvolvementApiEP = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/';
    this.InvolvementAppID = 'YrrcGavt9pgNOYlenrro';
    this.FreeMealEP = 'https://www.themealdb.com/api/json/v1/';
  }

      GetMeals = async () => {
        await fetch(`${this.FreeMealEP}/1/categories.php`)
          .then((response) => response.json())
          .then((json) => { DisplayCards(json.categories); });
      }
}