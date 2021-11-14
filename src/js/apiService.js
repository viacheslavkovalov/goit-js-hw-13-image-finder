// https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=что_искать&page=номер_страницы&per_page=12&key=твой_ключ

export default class CardsApiService{
    constructor() {
    this.searchQuery = '';
    this.page = 1;
    }
    fetchCardsFromApi() {
        const BASE_URL = 'https://pixabay.com/api';
        const API_KEY = '24120702-c8c387165c949bc99fec4e736';
        const PER_PAGE = 12;
        const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=${PER_PAGE}&key=${API_KEY}`;

        return fetch(url)
            .then(response => response.json())
                .then(({hits}) => {
                    this.incrementPage();
                    return hits
            })
    }
    
    incrementPage() {
        this.page += 1;
    }
    resetPage() {
        this.page = 1;
    }
    
    get query() {
        return this.searchQuery
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
};

