import { fetchImages } from './js/pixabay-api';
import { renderGallery } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';


const formEl = document.querySelector('form');
const loaderEl = document.querySelector('.loader');
const galleryEl = document.querySelector('.gallery');


formEl.addEventListener('submit', event => {
    event.preventDefault();
    const query = event.target.elements.q.value.trim();

    if (!query) {
        iziToast.error({
            message: 'Please enter a search query.',
            title: '',
            backgroundColor: 'rgba(239, 64, 64, 1)',
            icon: 'my-custom-icon',
            iconColor: 'rgba(255, 255, 255, 1)',
            messageSize: '16px',
            titleLineHeight: '1.5',
            position: "topRight",
            messageColor: 'rgba(255, 255, 255, 1)',
            // theme: 'light',
            // close: true,
            maxWidth: '432px'
        });
        
        return;
    }
    
    loaderEl.style.display = 'block';   

    fetchImages({ q: query })
        .then(data => {
            loaderEl.style.display = 'none';
            const { hits } = data;

            if (hits.length === 0) {
                galleryEl.innerHTML = '';
                iziToast.error({
                    title: '',
                    backgroundColor: 'rgba(239, 64, 64, 1)',
                    message: 'Sorry, there are no images matching <br>your search query. Please try again!',
                    icon: 'my-custom-icon',
                    iconColor: 'rgba(255, 255, 255, 1)',
                    messageSize: '16px',
                    titleLineHeight: '1.5',
                    position: "topRight",
                    messageColor: 'rgba(255, 255, 255, 1)',
                    // theme: 'light',
                    // close: true,
                    maxWidth: '432px'

                });
            return;
            }

            renderGallery(hits);

        })
        .catch(error => {
           
            loaderEl.style.display = 'none';
            iziToast.error({
                title: 'Error',
                message: error.message,
            });
        });
});