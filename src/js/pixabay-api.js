
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '46194524-ed8204bc29acf0aaf22e3d7ea';

export function fetchImages(params) {
    const urlParams = new URLSearchParams({
        q: params.q,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 15
    });

    return fetch(`${BASE_URL}?key=${API_KEY}&${urlParams}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Something went wrong with the request');
            }
            return response.json();
        });
}