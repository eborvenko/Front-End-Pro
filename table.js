const SELECTOR = Object.freeze({
    INPUT_TITLE: '.public-title',
    INPUT_BODY: '.public-body',
    ROW: '.public-row',
    LIST: '.publicsList',
    ROW_TEMPLATE: '#publicsTemplate',    
    BTN_ADD: '#button-add',
    BTN_SAVE: '#button-save',
    LOADING: '#loading',
    ERROR: '#error',
});

const CLASS = Object.freeze({
    BTN_DELETE: 'btn-delete',
    BTN_EDIT: 'btn-edit',
    BTN_ADD: 'btn-add',
    BTN_SAVE: 'btn-save',
    HIDE: 'hide',
});

const tableField = document.querySelector(SELECTOR.LIST);
const titleCell = document.querySelector(SELECTOR.INPUT_TITLE);
const bodyCell = document.querySelector(SELECTOR.INPUT_BODY);
const error = document.querySelector(SELECTOR.ERROR);
const loading = document.querySelector(SELECTOR.LOADING);
const btnAdd = document.querySelector(SELECTOR.BTN_ADD);
const btnSave = document.querySelector(SELECTOR.BTN_SAVE);
const templateHTML = document.querySelector(SELECTOR.ROW_TEMPLATE).innerHTML;

const updateInfo = {};

btnAdd.addEventListener('click', onPostAddClick);
btnSave.addEventListener('click', onPostSaveClick);
tableField.addEventListener('click', onPostsListClick);

init();

function init() {
    toggleLoading();

    PublicAPI.getList()
        .then(addTableList)
        .catch(handleError)
        .finally(toggleLoading);
}

function addTableList(list) {
    const html = list.map((postItem) => getTableHTML(postItem)).join('');

    tableField.innerHTML = html;
}

function getTableHTML(postItem) {
    return templateHTML
        .replace('{{publicRowID}}', postItem.id)
        .replace('{{public_ID}}', postItem.id)
        .replace('{{publicTitle}}', postItem.title)
        .replace('{{publicBody}}', postItem.body);
}

function onPostAddClick(e) {
    e.preventDefault();

    const posts = getPost();

    if (!isVerification(posts)) {
        alert('Поля пустые или заполнены неверно!');

        return false;
    }

    addPost(posts);
    clearForm();
}

function getPost() {
    return {
        title: titleCell.value,
        body: bodyCell.value,
    };
}

function onPostsListClick(e) {
    const postEl = getPostElement(e.target);
    const classList = e.target.classList;

    if (classList.contains(CLASS.BTN_DELETE)) {
        return removePost(postEl);
    }

    if (classList.contains(CLASS.BTN_EDIT)) {
        btnAdd.classList.add(CLASS.HIDE);
        btnSave.classList.remove(CLASS.HIDE);

        PublicAPI.getOne(+postEl.dataset.id).then((postList) => {
            return getUpdateEl(postList);
        });
    }
}

function getUpdateEl(postList) {
    titleCell.value = postList.title;
    bodyCell.value = postList.body;

    Object.assign(
        updateInfo,
        { id: postList.id },
        { title: titleCell.value },
        { body: bodyCell.value }
    );
}

function updatePost() {
    return {
        title: titleCell.value,
        body: bodyCell.value,
    };
}

function onPostSaveClick() {
    Object.assign(updateInfo, updatePost());

    title = updateInfo.title;
    body = updateInfo.body;

    if (!isVerification(updateInfo)) {
        alert('Поля пустые или заполнены неверно!');

        return false;
    }

    PublicAPI.update(updateInfo.id, { title, body })
        .then((data) => data.id)
        .then(() => PublicAPI.getList())
        .then(addTableList)
        .catch(handleError);
}

function removePost(item) {
    item.remove();

    PublicAPI.delete(+item.dataset.id).catch(handleError);
}

function getPostElement(target) {
    return target.closest(SELECTOR.ROW);
}

function addPost(post) {
    PublicAPI.create(post)
        .then((data) => data.id)
        .then(() => PublicAPI.getList())
        .then(addTableList)
        .catch(handleError);
}

function isVerification(post) {
    return !isEmpty(post.title) && !isEmpty(post.body);
}

function clearForm() {
    titleCell.value = '';
    bodyCell.value = '';
}

function isEmpty(value) {
    return value === '';
}

function handleError(err) {
    error.textContent = err.message;
    setTimeout(() => (error.textContent = ''), 5000);
}

function toggleLoading() {
    loading.classList.toggle(CLASS.HIDE);
}
