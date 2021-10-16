$(() => {
    const DELETE_BTN_CLASS = '.delete-btn';
    const TEXTAREA_CLASS = '.sticker-item-input';

    const $stickerItemTemplate = $('#sticker-item-template').html();
    const $addStickerTicketBtn = $('.button-add');

    let arrayStickerList = [];
    let $stickerList = $('#sticker-list');

    $addStickerTicketBtn.on('click', onAddTicketBtnClick);
    $stickerList
        .on('click', DELETE_BTN_CLASS, onStickerListClick)
        .on('blur', TEXTAREA_CLASS, onTicketBlur);

    init();

    function onTicketBlur() {
        let $tiketId = $(this).parent().data('id');
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

    function onStickerListClick() {
        let $tiketId = $(this).parent().data('id');

        $(this).parent().remove();

        deleteTicket($tiketId);
    }

    function init() {
        getStickerList();
    }

    function deleteTicket(id) {
        StickerAPI.delete(id);
    }

    function addTicket() {
        const stickerItem = {
            description: '',
        };

        addTicketOnServer(stickerItem);
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
});