const loadNewsCategories = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayNewsCategories(data.data.news_category))
    .catch(error => alert(error));
}

const displayNewsCategories = (newsCategories) => {
    const newsCategoriesContainer = document.getElementById('news-categories-container');
    newsCategories.forEach(newsCategory => {
        const newsCategoryLi = document.createElement('li');
        newsCategoryLi.classList.add("nav-item", "cursor-pointer");
        newsCategoryLi.innerHTML = `
            <a class="nav-link" aria-current="page" onclick = "loadAllNews(this, '${newsCategory.category_id}', '${newsCategory.category_name}')" >${newsCategory.category_name}</a>
        `;
        newsCategoriesContainer.appendChild(newsCategoryLi);
    });
}

const loadAllNews = (element, categoryId, categoryName) => {
    
    const activeCategory = document.querySelector(".nav-link.active");
    activeCategory.classList.remove('active');
    element.classList.add('active');

    const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
    console.log(url);
    fetch(url)
    .then(res => res.json())
    .then(data => displayAllNews(data.data, categoryName))
    .catch(error => alert(error));
}

const displayAllNews = (allNews, categoryName) => {
    // console.log(allNews);
    // console.log("display all news => ",categoryName)

    const itemsFoundForCategoryContainer = document.getElementById('items-found-for-category-container');
    itemsFoundForCategoryContainer.innerHTML = `<p>${allNews.length} items found for category ${categoryName}</p>`;

    itemsFoundForCategoryContainer.innerHTML = `<p class="m-0">${allNews.length > 0 ? allNews.length+ ' items found for category ' + categoryName : 'No items found for category ' + categoryName}</p>`;

    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent = '';
    allNews.forEach(news => {
        // console.log(news);
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('col-12');
        newsDiv.innerHTML = `
                    <div class="card mb-3 border p-3">
                        <div class="row g-0">
                            <div class="col-md-2">
                                <img src="${news.thumbnail_url}" class="img-fluid rounded-start h-auto" alt="...">
                            </div>
                            <div class="col-md-10">
                                <div class="card-body">
                                    <h5 class="card-title fw-bold">${news.title}</h5>
                                    <p class="card-text">${news.details.length > 450 ? news.details.slice(0, 450)+'...' : news.details}</p>
                                    <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
                                        <div class="d-flex justify-content-md-start">
                                            <img class="rounded-circle img-fluid" width="50px"; src="${news.author.img}" alt="">
                                            <div class="ms-2 text-center">
                                                <p class="m-0">${news.author.name}</p>
                                                <p class="m-0">${news.author.published_date} </p>
                                            </div>
                                        </div>
                                        <div>
                                            <i class="fa fa-eye"></i>
                                            <span class="ms-2">${news.total_view}</span>
                                        </div>
                                        <div>
                                            <i class="fa-solid fa-star text-warning"></i>
                                            <span class="ms-2">${news.rating.number}</span>
                                        </div>
                                        <div>
                                            <a><img src="images/bi_arrow-right-short.png" alt=""></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
        `;
        newsContainer.appendChild(newsDiv);
    });
}


loadNewsCategories()
