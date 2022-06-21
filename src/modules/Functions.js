import { modal, Cards, ProductsCounter } from './Dom.js';

function DisplayPopup(data, examples) {
  modal.innerHTML = ` <div class="closeBtn">X</div>
  <div class="popup">
            <div class="popup-header" >
                
                    <div class="img-popcontainer">
                        <div class="img-pophold">
                            <div class="img">
                                <img src="${data.strCategoryThumb}">
                            </div>
                        </div>
                    </div>
                <div class="popup-title">${data.strCategory}</div>
            </div>

            <div class="popup-details">
              
                <div class="details">
                    <div class="images">
                    </div>
                    <hr />
                   <div class="details-text">
                   ${data.strCategoryDescription}
                    </div>
                </div>
                <div class="popup-comments">
                    <div class="container-comments">
                        <form class="form">
                    
                    <textarea id="comment" type="text" placeholder="Comment"/></textarea>
                    <div class="form-header"><input id="name" type="text" placeholder="Name" /> <button class="submit" id="${data.idCategory}">submit</button></div>
                        </form>
                        <div class="Comment-counter">
                        Total Comments(0)
                        </div>
                     <hr/>
                     
                    <div class="comment-list">
                        
                        <ul class="comments">
                                        
                        </ul>
                    </div>
                </div>
            </div>
        </div>
   </div>`;
  const images = document.querySelector('.images');
  examples.meals.slice(0, 3).forEach((element) => {
    const div = document.createElement('div');
    div.classList.add('single-product-example');
    div.innerHTML = ` 
    <div class="img-popholdpop">
        <div class="imgex">
            <img src=${element.strMealThumb}>

        </div>
    </div>
    <p class="title-example">${element.strMeal.substr(0, 15)}</p>
`;
    images.appendChild(div);
  });

  const closeBtn = document.querySelector('.closeBtn');

  closeBtn.addEventListener('click', () => {
    modal.classList.toggle('hide');
  });
}

function DisplayCards(data) {
  data.forEach((element) => {
    Cards.innerHTML += `
          <div class="card">
          <div class="img-container">
              <div class="img-hold">
                  <div class="img">
                      <img src="${element.strCategoryThumb}">
                  </div>
              </div>//   const LikesCounter = document.querySelectorAll('.likes-counter');
          </div>
          <div class="title-container">
              <h3>${element.strCategory}</h3>
              <div class="interactions">
              <div><i id="${
  element.idCategory
}" class="fa-solid fa-comment fa-lg"></i>  355  </div>       <div><i id="${
  element.idCategory
}" class="fa-solid fa-heart fa-lg"></i> <b id="${
  element.idCategory
}" class="likes-counter"></b> </div>
              </div>
              <div>
              ${element.strCategoryDescription.substr(0, 50)}...
              </div>
              
          <button id="${
  element.idCategory
}" class="button comment"><i class="fa-solid fa-comments"></i> Comments</button>
          </div>
  
      </div>
          `;
  });
}

function calculateComments(data) {
  const msg = `Total Comments(${data.length})`;
  return msg;
}

function CountComment(data) {
  const CommentCounter = document.querySelector('.Comment-counter');
  CommentCounter.innerHTML = calculateComments(data);
}

function DisplayComments(data) {
  const commentSection = document.querySelector('.comments');
  let comment = '';
  data.forEach((item) => {
    comment += `<li class="single-comment">
      <img class="user" src="https://www.w3schools.com/howto/img_avatar.png" alt="user" >
      <b class="user-comment">${item.comment}</b>
      </li>`;
  });
  commentSection.innerHTML = comment;
  CountComment(data);
}

function countProducts(data) {
  return data.length;
}

function Counter(data) {
  ProductsCounter.innerHTML = countProducts(data);
}

function CounterLikes(data) {
  const likeCount = document.querySelectorAll('.likes-counter');
  likeCount.forEach((item) => {
    data.forEach((likes) => {
      if (item.id === likes.item_id) {
        item.innerHTML = likes.likes;
      }
    });
  });
}

export {
  DisplayCards,
  DisplayPopup,
  Counter,
  DisplayComments,
  CountComment,
  CounterLikes,
  calculateComments,
  countProducts,
};
