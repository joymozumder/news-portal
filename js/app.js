const toggleSpinner = isLoading =>{
    const spinnerSection = document.getElementById('spinner');
    if(isLoading){
        spinnerSection.classList.remove('d-none')
    }
    else{
        spinnerSection.classList.add("d-none");
    }
}

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
    if(newsCategories.length>0){
        loadAllNews(newsCategoriesContainer.firstElementChild.firstElementChild, newsCategories[0].category_id, newsCategories[0].category_name);
    }
}

const loadAllNews = (element, categoryId, categoryName) => {
    toggleSpinner(true);
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

    allNews.sort((a, b) => b.total_view - a.total_view);

    allNews.forEach(news => {
        console.log(news._id);
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('col-12');
        newsDiv.innerHTML = `
                    <div class="card mb-3 border p-3">
                        <div class="row g-0">
                            <div class="col-md-2">
                                <img src="${news.thumbnail_url}" class="img-fluid rounded-start h-100 w-100" alt="...">
                            </div>
                            <div class="col-md-10">
                                <div class="card-body">
                                    <h5 class="card-title fw-bold">${news.title}</h5>
                                    <p class="card-text">${news.details.length > 450 ? news.details.slice(0, 450)+'...' : news.details}</p>
                                    <div class="d-flex justify-content-between align-items-center flex-wrap">
                                        <div class="d-flex justify-content-md-start">
                                            <img class="rounded-circle img-fluid" width="50px"; src="${news.author.img}" alt="">
                                            <div class="ms-2 text-center">
                                                <p class="m-0">${news.author.name ? news.author.name : 'No data found'}</p>
                                                <p class="m-0">${news.author.published_date ? news.author.published_date.split(" ")[0] : 'No data found'} </p>
                                            </div>
                                        </div>
                                        <div>
                                            <i class="fa fa-eye"></i>
                                            <span class="ms-2">${news.total_view != null ? news.total_view : 'No data found'}</span>
                                        </div>
                                        <div>
                                            <i class="fa-solid fa-star text-warning"></i>
                                            <span class="ms-2">${news.rating.number != null ? news.rating.number : 'No data found'}</span>
                                        </div>
                                        <div>
                                            <a class="cursor-pointer btn btn-primary" onclick="loadNewsDetails('${news._id}')" data-bs-toggle="modal" data-bs-target="#newsDetailsModal">Details <i class="fa fa-arrow-right"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
        `;
        newsContainer.appendChild(newsDiv);
    });
    toggleSpinner(false);
}

const loadNewsDetails = newsId => {
    const url = `https://openapi.programming-hero.com/api/news/${newsId}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayNewsDetails(data.data[0]))
    .catch(error => alert(error));
}

const displayNewsDetails = newsDetails => {
    console.log(newsDetails);
    const newsDetailsContainer = document.getElementById('news-details-container');
    newsDetailsContainer.innerHTML = `
                        <div class="modal-header">
                            <h5 class="modal-title" id="newsDetailsModalLabel">${newsDetails.title}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <img src="${newsDetails.image_url}" class="img-fluid w-100" alt="...">
                            <div class="mt-2">
                                <p>${newsDetails.details}</p>
                            </div>
                            <div class="d-flex justify-content-between align-items-center flex-wrap mt-2">
                                <div class="d-flex justify-content-md-start">
                                    <img class="rounded-circle img-fluid" width="50px"; src="${newsDetails.author.img}" alt="">
                                    <div class="ms-2 ">
                                    <p class="m-0"><strong>Author Name&nbsp;&nbsp;&nbsp;&nbsp;: </strong> ${newsDetails.author.name ? newsDetails.author.name : 'No data found'}</p>
                                    <p class="m-0"><strong>Published Date&nbsp;: </strong> ${newsDetails.author.published_date ? newsDetails.author.published_date.split(" ")[0] : 'No data found'} </p>
                                </div>
                                </div>
                                <div>
                                    <i class="fa fa-eye"></i>
                                    <span class="ms-2">${newsDetails.total_view != null ? newsDetails.total_view : 'No data found'}</span>
                                </div>
                                <div>
                                    <i class="fa-solid fa-star text-warning"></i>
                                    <span class="ms-2">${newsDetails.rating.number != null ? newsDetails.rating.number : 'No data found'}</span>
                                </div>
                                
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
    `;
}


loadNewsCategories()
