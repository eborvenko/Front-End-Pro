const SELECTOR = Object.freeze({
    INPUT_TITLE: '.public-title',
    INPUT_BODY: '.public-body',
    ROW: '.public-row',
    LIST: '.publicsList',
    ROW_TEMPLATE: '#publicsTemplate',
    ERROR: '#error',
    BTN_ADD: '#button-add',
    BTN_SAVE: '#button-save',
    LOADING: '#loading',
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

btnAdd.addEventListener('click', onPublicAddClick);
btnSave.addEventListener('click', onPublicSaveClick);
tableField.addEventListener('click', onPublicsListClick);

init();

function init() {
    toggleLoading();

    TableAPI.getList()
        .then(addTableList)
        .catch(handleError)
        .finally(toggleLoading);
}

function addTableList(list) {
    const html = list.map((tableItem) => getTableHTML(tableItem)).join('');

    tableField.innerHTML = html;
}

function getTableHTML(tableItem) {
    return templateHTML
        .replace('{{publicID}}', tableItem.id)
        .replace('{{public_ID}}', tableItem.id)
        .replace('{{publicTitle}}', tableItem.title)
        .replace('{{publicBody}}', tableItem.body);
}

function onPublicAddClick(e) {
    e.preventDefault();

    const publics = getPublic();

    if (!isVerification(publics)) {
        alert('Поля пустые или заполнены неверно!');

        return false;
    }

    addPublic(publics);
    clearForm();
}

function getPublic() {
    return {
        title: titleCell.value,
        body: bodyCell.value,
    };
}

function onPublicsListClick(e) {
    const publicEl = getPublicElement(e.target);
    const classList = e.target.classList;

    if (classList.contains(CLASS.BTN_DELETE)) {
        return removePublic(publicEl);
    }

    if (classList.contains(CLASS.BTN_EDIT)) {
        btnAdd.classList.add(CLASS.HIDE);
        btnSave.classList.remove(CLASS.HIDE);

        TableAPI.getOne(+publicEl.dataset.id).then((tableList) => {
            return getUpdateEl(tableList);
        });
    }
}

function getUpdateEl(tableList) {
    titleCell.value = tableList.title;
    bodyCell.value = tableList.body;

    Object.assign(
        updateInfo,
        { id: tableList.id },
        { title: titleCell.value },
        { body: bodyCell.value }
    );
}

function updatePublic() {
    return {
        title: titleCell.value,
        body: bodyCell.value,
    };
}

function onPublicSaveClick() {
    Object.assign(updateInfo, updatePublic());

    title = updateInfo.title;
    body = updateInfo.body;

    if (!isVerification(updateInfo)) {
        alert('Поля пустые или заполнены неверно!');

        return false;
    }

    TableAPI.update(updateInfo.id, { title, body })
        .then((data) => data.id)
        .then(() => TableAPI.getList())
        .then(addTableList)
        .catch(handleError);
}

function removePublic(item) {
    item.remove();

    TableAPI.delete(+item.dataset.id).catch(handleError);
}

function getPublicElement(target) {
    return target.closest(SELECTOR.ROW);
}

function addPublic(public) {
    TableAPI.create(public)
        .then((data) => data.id)
        .then(() => TableAPI.getList())
        .then(addTableList)
        .catch(handleError);
}

function isVerification(public) {
    return !isEmpty(public.title) && !isEmpty(public.body);
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
