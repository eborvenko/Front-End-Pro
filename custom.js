const searchBtn = document.querySelector('#searchBtn');
const userInput = document.querySelector('#userInput');
const container = document.querySelector('#container');
const template = document.querySelector('#userTemplate').innerHTML;
const errorTempl = document.querySelector('#errorTemplate').innerHTML;

const ERROR_TEXT = 'Fill in the input field';

searchBtn.addEventListener('click', onSearchButtonClick);

function onSearchButtonClick() {
    resetContainer();
    getUser();
}

function resetContainer() {
    container.innerHTML = '';
}

function getUser() {
    const accountName   = getUserLogin();

    if (accountName   === false) {
        return false;
    }

    fetch(`https://api.github.com/users/${accountName  }`)
        .then((response) => {
            if (!response.ok) {
                if (response.status == 404) {
                    return Promise.reject('User Not found: ');
                }

                const error = response.message || response.statusText;

                return Promise.reject(error);
            }

            return response.json().then((user) => renderUser(user));
        })
        .catch((err) => {
            errorText(err);
        });
}

function getUserLogin() {
    const login = userInput.value;

    if (!login) {
        userInput.classList.add('error');

        errorText(ERROR_TEXT);

        return false;
    }

    resetUserInput();

    return login;
}

function errorText(error) {
    const errorUser = errorTempl.replace('{{error}}', error);

    container.insertAdjacentHTML('beforeend', errorUser);
}

function renderUser(user) {
    const content = getUserHTML(user);

    container.insertAdjacentHTML('beforeend', content);
}

function getUserHTML(user) {
    return template
        .replace('{{login}}', user.login)
        .replace('{{image}}', user.avatar_url)
        .replace('{{user}}', user)
        .replace('{{public}}', user.public_repos)
        .replace('{{followers}}', user.followers)
        .replace('{{following}}', user.following);
}

function resetUserInput() {
    userInput.value = '';

    userInput.classList.remove('error');
}
