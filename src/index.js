import { comment, modal } from './modules/Dom.js';
import './reset.css';
import Api from './modules/Api.js';

const ApiCalls = new Api();

ApiCalls.GetMeals();
comment.forEach((item) => {
  item.addEventListener('click', () => {
    modal.classList.toggle('hide');
    ApiCalls.GetMealInfos(comment.id);
  });
});
