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
    return API.getAlbums().then((albumsList) => {
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

    return API.getPhotos(albumId)
        .then(renderPhotos)
        .finally(() => toggleLoading());
}

function onAlbumElClick(e) {
    if (e.target.classList.contains(CLASS.ALBUM_ITEM)) {
        getPhotosList(e.target.dataset.id);
    }
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
