const SELECTOR = Object.freeze({
    ALBUMS_TEMPLATE: '#albumsTemplate',
    PHOTOS_TEMPLATE: '#photosTemplate',
    ALBUM: '#albums-list',
    PHOTO: '#photos-box',
    LOADING: '#loading',
});

const CLASS = Object.freeze({
    ALBUM_ITEM: 'album-item',
    HIDE: 'hide',
});

const ALBUMS_URL = 'https://jsonplaceholder.typicode.com/albums';
const PHOTOS_URL = 'https://jsonplaceholder.typicode.com/photos?albumId={{id}}';

const albumItemTempHTML = document.querySelector(
    SELECTOR.ALBUMS_TEMPLATE
).innerHTML;
const photoItemTempHTML = document.querySelector(
    SELECTOR.PHOTOS_TEMPLATE
).innerHTML;
const albumList = document.querySelector(SELECTOR.ALBUM);
const photoEl = document.querySelector(SELECTOR.PHOTO);
const loading = document.querySelector(SELECTOR.LOADING);

albumList.addEventListener('click', onAlbumElClick);

init();

function init() {
    toggleLoading();

    getAlbumsList()
        .then(getFirstPhotos)
        .finally(() => toggleLoading());
}

function getAlbumsList() {
    return fetch(ALBUMS_URL)
        .then((res) => res.json())
        .then((albumsList) => {
            renderAlbums(albumsList);

            return albumsList;
        });
}

function renderAlbums(data) {
    albumList.innerHTML = data.map((album) => createAlbumList(album)).join('');
}

function createAlbumList(album) {
    return albumItemTempHTML
        .replace('{{id}}', album.id)
        .replace('{{title_album}}', album.title);
}

function getFirstPhotos(list) {
    if (list.length) {
        getPhotosList(list[0].id);
    }
}

function getPhotosList(albumId) {
    toggleLoading();

    return fetch(getPhotoUrl(albumId))
        .then((resp) => resp.json())
        .then(renderPhotos)
        .finally(() => toggleLoading());
}

function onAlbumElClick(e) {
    if (e.target.classList.contains(CLASS.ALBUM_ITEM)) {
        getPhotosList(e.target.dataset.id);
    }
}

function getPhotoUrl(albumId) {
    return PHOTOS_URL.replace('{{id}}', albumId);
}

function renderPhotos(data) {
    photoEl.innerHTML = data.map((photo) => createPhotoElement(photo)).join('');
}

function createPhotoElement(photoEl) {
    return photoItemTempHTML
        .replace('{{url}}', photoEl.url)
        .replace('{{title_photo}}', photoEl.title);
}

function toggleLoading() {
    loading.classList.toggle(CLASS.HIDE);
}
