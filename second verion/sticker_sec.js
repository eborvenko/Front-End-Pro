$(() => {    
    const STICKER_LIST = '#sticker-list';
    const STICKER_TEMPLATE = '#sticker-item-template';
    const STICKER_ITEM = '.sticker-item-input';
    const DELETE_BTN_CLASS = '.delete-btn';
    const ITEM_LI_SELECTOR = 'li';    
    const ATTR_DATA_ID = 'data-id';

    const $stickerTemplate = $(STICKER_TEMPLATE).html();
    const $stickerList = $(STICKER_LIST);
    const $addTicket = $('#add-ticket-btn');

    let stickersArr = [];

    $addTicket.on('click', onAddStickerClick);

    $stickerList
        .on('click', DELETE_BTN_CLASS, function () {
            let itemId = $(this).parent(ITEM_LI_SELECTOR).attr(ATTR_DATA_ID);

            deleteSticker(itemId);
        })
        .on('focusout', STICKER_ITEM, function () {
            let itemId = $(this).parent(ITEM_LI_SELECTOR).attr(ATTR_DATA_ID);
            let description = $(this).val();
            let sticker = { id: itemId, description: description };

            saveSticker(sticker);
        });

    function deleteSticker(id) {
        StickerAPI.delete(id).then(() => {
            stickersArr = stickersArr.filter((item) => item.id !== id);
            renderList(stickersArr);
        });
    }

    function onAddStickerClick(event) {
        event.preventDefault();

        submitForm();
    }

    init();

    function init() {
        fetchSticker();
    }

    function fetchSticker() {
        StickerAPI.getList()
            .then(setStickers)
            .then(renderList);
    }

    function setStickers(data) {
        return (stickersArr = data);
    }

    function renderList(list) {
        $stickerList.html(list.map(getItemHtml).join(''));
    }

    function getItemHtml({ description, id }) {
        return $stickerTemplate
            .replace('{{inner}}', description)
            .replace('{{id}}', id);
    }

    function submitForm() {
        const newSticker = getFormData();

        createSticker(newSticker);
    }

    function getFormData() {
        return { description: '' };
    }

    function createSticker(newSticker) {
        StickerAPI.create(newSticker)
            .then(addSticker)
            .then(fetchSticker);
    }

    function addSticker(sticker) {
        stickersArr.push(sticker);

        renderList(stickersArr);
    }

    function saveSticker(sticker) {
        StickerAPI.update(sticker.id, sticker)
            .then((resp) => resp.json);
    }
});