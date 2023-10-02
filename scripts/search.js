'use strict';

const search = document.getElementById('input-query');
const btnSubmit = document.getElementById('btn-submit');
const news = document.getElementById('news-container');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const pageNum = document.getElementById('page-num');
const navPage = document.getElementById('nav-page-num');

/**** DATA ****/
let totalResults = 0;
let pageSize = 5;
let url;
let searchKey;

/**** FUNCTIONS ****/
function initDisplay() {
  pageNum.textContent = '1';
  btnPrev.classList.add('hide');
  navPage.classList.remove('hide');
}
function validate(searchKey) {
  if(!searchKey){
    alert('Put some words pls!');
    return false;
  }
  return true;
}
function changePage(nextOrPrev, pageSize, searchKey) {
  const curPage = Number(pageNum.textContent);
  let futurePage = nextOrPrev === 'Next' ? curPage+1 : curPage-1;
  pageNum.textContent = futurePage;
  if(futurePage === 1){
    btnPrev.classList.add('hide');  
  } else if (futurePage * pageSize > totalResults) {
    btnNext.classList.add('hide');
  }
  else {
    btnNext.classList.remove('hide');
    btnPrev.classList.remove('hide');
  }
  url = `https://newsapi.org/v2/everything?q=${searchKey}&pageSize=${pageSize}&page=${futurePage}&apiKey=${API_KEY}`;
    news.innerHTML = '';
    console.log(url);
    displayNews(url);
}
function addNews(article) {
  const newsChild = document.createElement('div');
  newsChild.innerHTML = `<div class="card mb-3" style="max-width: 100%;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${article.urlToImage}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
      <h5 class="card-title">${article.title}</h5>
      <p class="card-text">${article.description}</p>
      <p class="card-text"><small class="text-body-secondary">${article.author}</small></p>
      <p class="card-text"><small class="text-body-secondary">${article.publishedAt}</small></p>
      <a href="${article.url}" class="btn btn-primary" target="_blank">View</a>
    </div>
  </div>
</div>
</div>`;
  news.appendChild(newsChild);
}
async function displayNews(url) {
  try {
    const newsArr = await getNews(url);
    console.log(newsArr);
    totalResults = newsArr.totalResults;
    console.log(totalResults, pageSize);
    if(totalResults < pageSize) navPage.classList.add('hide');
    for(const article of newsArr.articles){
      addNews(article);
    }
  } catch(err){
    console.error(err);
  }
}
function searching() {
  searchKey = search.value;
  if(validate(searchKey)){
    const url = `https://newsapi.org/v2/everything?q=${searchKey}&pageSize=${pageSize}&page=1&apiKey=53ca57338a7d42b4b1d107ff106c281d`;
    news.innerHTML = '';
    displayNews(url);
    initDisplay();
  }
}

/**** ACTION ****/
btnSubmit.addEventListener('click', searching)
document.addEventListener('keydown', function(e){
  if(e.key === 'Enter') searching();
})
btnNext.addEventListener('click', function() {
  changePage('Next', pageSize, searchKey);
})
btnPrev.addEventListener('click', function() {
  changePage('Prev', pageSize, searchKey);
})