const ALBUMS_URL = 'https://jsonplaceholder.typicode.com/albums';
const PHOTOS_URL = 'https://jsonplaceholder.typicode.com/photos?_limit=50&albumId=';

const API = {
    getAlbums: () => {
        return fetch(ALBUMS_URL).then((res) => res.json());
    },

    getPhotos: (id) => {
        return fetch(PHOTOS_URL + id).then((res) => res.json());
    },
};