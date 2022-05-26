const configurationGET = {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/vnd.github.v3+json",
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector('form#github-form');
    const order = document.querySelector('select#selectOrder');

    // 1. Form should search for users and list them
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // e.target[0].value is our username input
        // console.log(e.target[0].value);
        const username = e.target[0].value;

        fetch(`https://api.github.com/search/users?q=${username}`, configurationGET)
            .then((res) => res.json())
            .then((data) => {
                // 2. Populate Github User List
                const userList = document.querySelector('ul#user-list');
                const results = [...data.items];
                results.forEach(element => {
                    const li = document.createElement('li');
                    const div = document.createElement('div');
                    const avatar = document.createElement('img');
                    const username = document.createElement('span');
                    const repo = document.createElement('p');
                    const link = document.createElement('a');

                    div.id = element.id;
                    avatar.src = element.avatar_url;
                    avatar.width = "64"
                    username.innerText = `Username: ${element.login}`;
                    link.href = `${element.repos_url}`
                    link.innerText = `${element.repos_url}`
                    link.addEventListener('click', (e) => {
                        e.preventDefault();
                        renderRepo(`${element.login}`)
                    })
                    repo.innerText = 'Repos: '

                    repo.append(link);
                    div.append(avatar, username, repo);
                    li.append(div);
                    userList.append(li);
                })
            })
    });
});


function renderRepo(username) {
    fetch(`https://api.github.com/users/${username}/repos`, configurationGET)
            .then((res) => res.json())
            .then((data) => {
                const title = document.createAttribute('h1');
                const reposList = document.querySelector('ul#repos-list');
                // Clear Repos List
                ((list) => { 
                    while(list.firstChild) { 
                        list.removeChild(list.firstChild);
                    }
                })(reposList);
                const repos = [...data];
                repos.forEach(element => {
                    const li = document.createElement('li');
                    li.innerText = `${element.name}`;
                    reposList.append(li);
                })
            })
}
