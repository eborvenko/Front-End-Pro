const form = document.querySelector('#contactsForm')
const list = document.querySelector('#contactsList');
const fields = document.querySelectorAll('.field');
const template = document.querySelector('#contactsTemplate').innerHTML;
const IS_NUMBER = /^\d+$/;

form.addEventListener('submit', onContactsForm);
list.addEventListener('click', onContactsListClick);

function onContactsForm(e) {
    e.preventDefault();  

    const contacts = getContact();
    
    if (!isVerification(contacts)) {
        alert('Поля пустые или заполнены неверно!');
        return false;
    }

    addContact(contacts);
    clearForm();
}

function onContactsListClick(e) {
    if (e.target.classList.contains('btn-delete')) {
        e.target.closest('.contact-row').remove();
    }
}

function getContact() {
    const contacts = {};

    for (let field of fields) {
        contacts[field.name] = field.value;
    }

    return contacts;
}

function clearForm() {
    for (let field of fields) {
        field.value = '';
    }
}

function addContact(contacts) {
    const contactsHTML = template
        .replace('{{nameFirts}}', contacts.nameFirts)
        .replace('{{nameLast}}', contacts.nameLast)
        .replace('{{phone}}', contacts.phone);

    list.insertAdjacentHTML('beforeend', contactsHTML);
}

function isVerification(contacts) {
    return !isEmpty(contacts.nameFirts) 
        && !isEmpty(contacts.nameLast)
        && isPhone(contacts.phone);
}

function isEmpty(value) {
    return value === '';
}

function isPhone(value) {
    return !isEmpty(value) && IS_NUMBER.test(value);
}
