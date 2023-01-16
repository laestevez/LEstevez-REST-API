const express = require('express');
const app = express();
const port = 5000;

app.use(express.json());

app.get('/users', (req, res) => { //get users
    res.send(users);
});

app.get('/users', (req, res) => { //get users by name
    const name = req.query.name;
    if (name != undefined){
        let result = findUserByName(name);
        result = {users_list: result};
        res.send(result);
    }
    else{
        res.send(users);
    }
});

app.get('/users/:id', (req, res) => { //get users by id
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        result = {users_list: result};
        res.send(result);
    }
});

app.post('/users', (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    res.status(200).end();
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

app.delete('/users/:id', (req, res) => { //delete users by id
    const id = req.params['id'];
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');

    if(userDeleteById(id))
        res.status(204).send('Resource Deleted.');
});

function addUser(user){
    users['users_list'].push(user);
}

function userDeleteById(id) {
    const idx = users['users_list'].findIndex( (user) => user['id'] === id);
    if(idx == -1)
        return false;
    delete users.users_list.splice(idx,1);
    return true;
}

function findUserById(id) {
    return users['users_list'].find( (user) => user['id'] === id); // or line below
    //return users['users_list'].filter( (user) => user['id'] === id);
}

const findUserByName = (name) => { 
    return users['users_list'].filter( (user) => user['name'] === name); 
}

const users = {
    users_list:
        [
            {
                id: 'xyz789',
                name: 'Charlie',
                job: 'Janitor',
            },
            {
                id: 'abc123',
                name: 'Mac',
                job: 'Bouncer',
            },
            {
                id: 'ppp222',
                name: 'Mac',
                job: 'Professor',
            },
            {
                id: 'yat999',
                name: 'Dee',
                job: 'Aspring actress',
            },
            {
                id: 'zap555',
                name: 'Dennis',
                job: 'Bartender',
            }
        ]
}