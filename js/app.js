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
            <a class="nav-link" aria-current="page" href="#">${newsCategory.category_name}</a>
        `;
        newsCategoriesContainer.appendChild(newsCategoryLi);
    });
}

loadNewsCategories()