const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/accounts', (req, res) => {
    db('Accounts')
        .then(accounts => res.status(200).json(accounts))
        .catch(err => {
            console.log(err);
            res.json(err);
        });
});

server.get('/accounts/:id', (req, res) => {
    const { id } = req.params;
    db('Accounts')
        .where({id: id})
        .then(account => res.status(200).json(account))
        .catch(err => {
            console.log(err);
            res.json(err);
        });
});

server.post('/accounts', (req, res) => {
    db('Accounts')
        .insert(req.body)
        .then(([totalUsers]) => res.status(201).json(totalUsers))
        .catch(err => {
            console.log(err);
            res.json(err);
        });
});

server.put('/accounts/:id', (req, res) => {
    const { id } = req.params;
    db('Accounts')
        .where({ id: id})
        .update(req.body)
        .then(updated => res.status(201).json(updated))
})

server.delete('/accounts/:id', (req, res) => {
    const { id } = req.params;
    db('accounts')
        .where({ id: id }).del()
        .then(deleted => {
            res.status(200).json(deleted);
            console.log(deleted);
        })
        .catch(err => {
            console.log(err);
            res.json(err);
        });
});

module.exports = server;