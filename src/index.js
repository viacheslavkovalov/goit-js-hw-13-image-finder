import CardsApiService from './js/apiService';
import photoCardsTpl from './templates/photo-cards.hbs';
import { debounce } from 'lodash';
import LoadMoreBtn from './components/load-more-btn';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';


const refs = {
    searchForm: document.querySelector('.js-search-form'),
    input: document.querySelector('input'),
    cardsContainer: document.querySelector('.js-gallery-container'),
    loadMoreBtn: document.querySelector('.btn-load')
};

const cardsApiService = new CardsApiService();
const loadMoreBtn = new LoadMoreBtn({
    selector: '[data-action="load-more"]',
    hidden: true,
});

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', debounce(fetchCards, 500));

// loadMoreBtn.enable();

function onSearch(event) {
    event.preventDefault();
    cardsApiService.query = event.currentTarget.elements.query.value;    

    if (cardsApiService.query === '') {
        return alert('Запрос пустой');
    };
    
    loadMoreBtn.show();
    cardsApiService.resetPage();
    clearCardsContainer();
    fetchCards();
};

function fetchCards() {
    loadMoreBtn.disable();
    cardsApiService.fetchCardsFromApi()
        .then(hits => {
            if (!hits.length) {
                loadMoreBtn.hide()
                refs.input.value = '';
                return alert('Ничего не найдено, к сожалению!');
            }
            appendCardsMarkup(hits);
            loadMoreBtn.enable();
            
        });
}

function appendCardsMarkup(hits) {
    refs.cardsContainer.insertAdjacentHTML('beforeend', photoCardsTpl(hits));
    scrollInto()
};

function clearCardsContainer() {
    refs.cardsContainer.innerHTML = '';
}

function scrollInto() {
  refs.cardsContainer.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}

refs.cardsContainer.addEventListener('click', openLargeImage);

function openLargeImage(event) {
  if (!event.target.dataset.source) {
    return;
  }
  const instance = basicLightbox.create(`<img src="${event.target.dataset.source}" />`);
    instance.show();

}


// Cкролл по кнопке Вверх

document.addEventListener('DOMContentLoaded', () => {

    let toTopBtn = document.querySelector('.to-up');

    window.onscroll = function () {
        if (window.pageYOffset > 580) {
            toTopBtn.style.display = 'block'
        } else {
            toTopBtn.style.display = 'none'
        }
    }

    // плавный скролл наверх 
    toTopBtn.addEventListener('click', function () {
        window.scrollBy({
            top: -document.documentElement.scrollHeight,
            behavior: 'smooth'
        });
    });
});