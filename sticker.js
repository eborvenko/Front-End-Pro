$(() => {
    const DELETE_BTN_CLASS = '.delete-btn';
    const TEXTAREA_CLASS = '.sticker-item-input';
    const ETMPY_ITEM = { description: '' };
    const STICKER_ITEM = '.sticker-item';

    const $stickerItemTemplate = $('#sticker-item-template').html();
    const $addStickerTicketBtn = $('.button-add');

    let arrayStickerList = [];
    let $stickerList = $('#sticker-list');

    $addStickerTicketBtn.on('click', onAddTicketBtnClick);
    $stickerList
        .on('click', DELETE_BTN_CLASS, onStickerDelClick)
        .on('focusout', TEXTAREA_CLASS, onTicketFocus);

    init();

    function onTicketFocus() {
        let $tiketId = $(this).closest(STICKER_ITEM).data('id');
        let $newDescription = $(this).val();

        updateTicket($tiketId, $newDescription);
    }

    function updateTicket(id, description) {
        let stickerItem = findStickerItem(id);

        stickerItem.description = description;

        updateTicketOnServer(stickerItem);
    }

    function updateTicketOnServer(stickerItem) {
        StickerAPI.update(stickerItem.id, stickerItem);
    }

    function findStickerItem(id) {
        return arrayStickerList.find((stickerItem) => stickerItem.id == id);
    }

    function onAddTicketBtnClick() {
        addTicket();
    }

    function addTicket() {
        addTicketOnServer(ETMPY_ITEM); ///
    }

    function addTicketOnServer(stickerItem) {
        return StickerAPI.create(stickerItem).then(getStickerList);
    }

    function getStickerList() {
        $stickerList.empty();

        return StickerAPI.getList()
            .then((data) => (arrayStickerList = data))
            .then(renderStickerList);
    }

    function renderStickerList() {
        arrayStickerList.forEach((stickerItem) =>
            renderStickerItem(stickerItem)
        );
    }

    function renderStickerItem(stickerItem) {
        const html = $stickerItemTemplate
            .replace('{{id}}', stickerItem.id)
            .replace('{{inner}}', stickerItem.description);

        $(html).appendTo($stickerList);
    }

    function onStickerDelClick() {
        let $tiketId = $(this).closest(STICKER_ITEM).data('id');

        $(this).closest(STICKER_ITEM).remove();

        deleteTicket($tiketId);
    }

    function init() {
        getStickerList();
    }

    function deleteTicket(id) {
        StickerAPI.delete(id);
    }
});
