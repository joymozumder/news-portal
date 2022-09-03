const loadNewsCategories = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => displayNewsCategories(data.data.news_category))
      .catch((error) => alert(error));
}

const displayNewsCategories = (newsCategories) => {
    const newsCategoriesContainer = document.getElementById('news-categories-container');
    newsCategories.forEach(newsCategory => {
        const newsCategoryLi = document.createElement('li');
        newsCategoryLi.classList.add("nav-item");
        newsCategoryLi.innerHTML = `
            <a class="nav-link" aria-current="page" onclick = "loadAllNews('${newsCategory.category_id}')" >${newsCategory.category_name}</a>
        `;
        newsCategoriesContainer.appendChild(newsCategoryLi);
    });
}

const loadAllNews = categoryId => {
    const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
    fetch(url)
    .then(res => res.json())
    .then(data => console.log(data.data))
    .catch(error => alert(error));
}

loadNewsCategories()