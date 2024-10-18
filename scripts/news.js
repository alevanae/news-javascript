"use strict";

const news = document.getElementById("news-container");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const pageNum = document.getElementById("page-num");
const navPage = document.getElementById("nav-page-num");

/**** DATA ****/
const setting = JSON.parse(getFromStorage(KEY_SET, "[]"));
const curUser = JSON.parse(getFromStorage(KEY_CUR, "0"));
let [userNews] = setting.filter((user) => user.username === curUser.username);
if (!userNews) {
  userNews = {
    pageSize: 10,
    category: "General",
  };
}
let url = `https://newsapi.org/v2/top-headlines?country=us&category=${userNews.category}&pageSize=${userNews.pageSize}&page=1&apiKey=${API_KEY}`;
let totalResults = 0;

/**** FUNCTIONS ****/
function changePage(nextOrPrev, pageSize, category) {
  const curPage = Number(pageNum.textContent);
  let futurePage = nextOrPrev === "Next" ? curPage + 1 : curPage - 1;
  pageNum.textContent = futurePage;
  if (futurePage === 1) {
    btnPrev.classList.add("hide");
  } else if (futurePage * pageSize > totalResults) {
    btnNext.classList.add("hide");
  } else {
    btnNext.classList.remove("hide");
    btnPrev.classList.remove("hide");
  }
  url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&pageSize=${pageSize}&page=${futurePage}&apiKey=${API_KEY}`;
  news.innerHTML = "";
  displayNews(url);
}
function addNews(article) {
  const newsChild = document.createElement("div");
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
    totalResults = newsArr.totalResults;
    if (totalResults < userNews.pageSize) navPage.classList.add("hide");
    for (const article of newsArr.articles) {
      addNews(article);
    }
  } catch (err) {
    console.error(err);
  }
}

/**** ACTIONS ****/
displayNews(url);
btnPrev.classList.add("hide");
btnNext.addEventListener("click", function () {
  changePage("Next", userNews.pageSize, userNews.category);
});
btnPrev.addEventListener("click", function () {
  changePage("Prev", userNews.pageSize, userNews.category);
});
