import {
  DisplayPopup,
  DisplayCards,
  Counter,
  CountComment,
  DisplayComments,
  CounterLikes,
} from './Functions.js';
import { modal } from './Dom.js';

export default class Api {
  constructor() {
    this.InvolvementApiEP = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/';
    this.InvolvementAppID = 'nt6MV6FCiUNpFq4MPkDA';
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

  GetExamples = async (item) => {
    await fetch(`${this.FreeMealEP}/1/filter.php?c=${item.strCategory}`)
      .then((response) => response.json())
      .then((json) => {
        DisplayPopup(item, json);
        this.CountComments(item.idCategory);
        this.DisplayComm(item.idCategory);

        const form = document.querySelector('.form');
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          const username = document.getElementById('name').value;

          const comment = document.querySelector('#comment').value;
          const button = document.querySelector('.submit').id;
          if (username && comment) {
            const newComment = {
              username,
              comment,
              item_id: button,
            };
            this.AddComment(newComment);
          }
        });
      });
  };

  GetStats = async (products) => {
    Counter(products);
    this.CountLikes();
  };

  GetMeals = async () => {
    await fetch(`${this.FreeMealEP}/1/categories.php`)
      .then((response) => response.json())
      .then((json) => {
        DisplayCards(json.categories);
        this.GetStats(json.categories);
        const likeBtn = document.querySelectorAll('.fa-heart');
        const likeCount = document.querySelectorAll('.likes-counter');
        likeBtn.forEach((btn) => {
          btn.addEventListener('click', () => {
            if (!btn.classList.contains('liked')) {
              btn.classList.add('liked');
              likeCount.forEach((count) => {
                if (count.id === btn.id) {
                  this.AddLike(count.id);
                  count.innerHTML = Number(count.innerText) + 1;
                }
              });
            }
          });
        });
        const comment = document.querySelectorAll('.comment');
        comment.forEach((item) => {
          item.addEventListener('click', () => {
            modal.classList.toggle('hide');
            this.GetMealInfos(item.id);
          });
        });
      });
  };

  AddComment = async (data) => {
    await fetch(
      `${this.InvolvementApiEP}apps/${this.InvolvementAppID}/comments`,
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      },
    );
    this.DisplayComm(data.item_id);
  };

  DisplayComm = async (data) => {
    await fetch(
      `${this.InvolvementApiEP}apps/${this.InvolvementAppID}/comments?item_id=${data}`,
    )
      .then((response) => response.json())
      .then((json) => {
        if (json.constructor === Array) {
          DisplayComments(json);
        }
      });
  };

  AddLike = async (id) => {
    await fetch(
      `${this.InvolvementApiEP}apps/${this.InvolvementAppID}/likes/`,
      {
        method: 'POST',
        body: JSON.stringify({
          item_id: id,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      },
    );
  };


   CountLikes = async () => {
    await fetch(
      `${this.InvolvementApiEP}apps/${this.InvolvementAppID}/likes/`,
    ).then((response) => response.json())
      .then((json) => {
        if (json.constructor === Array) {
          CounterLikes(json);
        }
      });
  };

  CountComments = async (data) => {
    await fetch(
      `${this.InvolvementApiEP}apps/${this.InvolvementAppID}/comments?item_id=${data}`,
    )
      .then((response) => response.json())
      .then((json) => {
        if (json.constructor === Array) {
          CountComment(json);

        }
      });
  };
}
