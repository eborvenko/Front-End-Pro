const SELECTOR = Object.freeze({
    ROW: '.public-row',
    LIST: '.publicsList',
    ROW_TEMPLATE: '#publicsTemplate',
    BTN_ADD: '#button-add',
    ERROR: '#error',
    MODAL_FORM: '#modal-form',
    BTN_DELETE: '.btn-delete',
    BTN_EDIT: '.btn-edit',
    TITLE: '.table-title',
    BODY: '.table-body',
});

let postsList = [];

const POST_DATA = {
    id: '',
    title: '',
    body: '',
};

const error = $(SELECTOR.ERROR);
const templateHTML = $(SELECTOR.ROW_TEMPLATE).html();

const $postListEl = $(SELECTOR.LIST)
    .on('click', SELECTOR.BTN_DELETE, onDeleteClick)
    .on('click', SELECTOR.BTN_EDIT, onEditButtonClick);

$(SELECTOR.BTN_ADD).on('click', onPostAddClick);

const $form = $(`${SELECTOR.MODAL_FORM} form`)[0];
const $modal = $(SELECTOR.MODAL_FORM).dialog({
    autoOpen: false,
    height: 400,
    width: 350,
    modal: true,
    buttons: {
        Save: () => {
            savePost();
        },
        Cancel: closeModal,
    },
    close: closeModal,
});

init();

function init() {
    getList();
}

function onPostAddClick(e) {
    e.preventDefault();

    openModal(POST_DATA);
}

function savePost() {
    const post = getModalPost();

    if (!isVerification(post)) {
        alert('Поля пустые!');

        return false;
    }

    if (post.id) {
        updatePost(post.id, post);
    } else {
        addPost(post);
    }
    closeModal();
}

function getList() {
    PublicAPI.getList().then(setData).then(renderList).catch(handleError);
}

function setData(data) {
    return (postsList = data);
}

function renderList(postsList) {
    postsList.forEach(renderPost);
}

function renderPost(post) {
    const $postElement = $(getTableHTML(post));

    $postListEl.append($postElement);
}

function getTableHTML(post) {
    return templateHTML
        .replace('{{publicRowID}}', post.id)
        .replace('{{public_ID}}', post.id)
        .replace('{{publicTitle}}', post.title)
        .replace('{{publicBody}}', post.body);
}

function openModal(post) {
    setModalPost(post);
    $modal.dialog('open');
}

function setModalPost(post) {
    $form.postId.value = post.id;
    $form.title.value = post.title;
    $form.body.value = post.body;
}

function addPost(post) {
    PublicAPI.create(post)
        .then((post) => {
            postsList.push(post);
            renderPost(post);
        })
        .catch(handleError);
}

function closeModal() {
    $modal.dialog('close');
    $form.reset();
}

function getModalPost() {
    return {
        id: $form.postId.value,
        title: $form.title.value,
        body: $form.body.value,
    };
}

function onEditButtonClick(e) {
    const $input = $(this);
    const id = getElementIndex($input);
    const post = postsList.find((item) => +item.id === id);

    openModal(post);
}

function updatePost(id, changes) {
    const post = postsList.find((el) => el.id == id);

    Object.keys(changes).forEach((key) => (post[key] = changes[key]));

    PublicAPI.update(id, post).catch(handleError);

    updateOnUi(post);
}

function updateOnUi(post) {
    const $item = getPostElementById(post.id);

    $item.find(SELECTOR.TITLE)[0].textContent = post.title;
    $item.find(SELECTOR.BODY)[0].textContent = post.body;
}

function onDeleteClick(e) {
    const $element = $(e.target);

    deletePost(getElementIndex($element));
}

function deletePost(id) {
    postsList = postsList.filter((el) => el.id != id);

    deletePostElement(id);
    PublicAPI.delete(id).catch(handleError);
}

function deletePostElement(id) {
    const $element = getPostElementById(id);

    $element && $element.remove();
}

function getPostElementById(id) {
    return $postListEl.find(`[data-id="${id}"]`);
}

function getElementIndex($el) {
    const $post = getPostElementByChild($el);

    return $post && $post.data('id');
}

function getPostElementByChild($child) {
    return $child.closest(SELECTOR.ROW);
}

function isVerification() {
    return !isEmpty($form.title.value) && !isEmpty($form.body.value);
}

function isEmpty(value) {
    return value === '';
}

function handleError(err) {
    error.textContent = err.message;
    setTimeout(() => (error.textContent = ''), 5000);
}
