const { request, response } = require('express');


const userGet = (req = request, res = response) => {
    const { nameUser, ageUser } = req.body;
    res.json({
        msg: 'This is a GET request',
        nameUser,
        ageUser

    })
}
const userPost = (req = request, res = response) => {
    const { q = '', page = 1, limit = 1, nameUser = 'No Name', ageUser = 0 } = req.params;
    res.status(201).json({
        msg: 'This is a POST request',
        q,
        page,
        limit,
        nameUser,
        ageUser,

    })
}
const userPut = (req = request, res = response) => {
    const id = req.params.id;
    res.status(202).json({
        msg: 'This is a PUT request',
        id: id
    })
}
const userDelete = (req = request, res = response) => {
    res.json({
        msg: 'This is a DELETE request'
    })
}
const userPatch = (req = request, res = response) => {
    res.json({
        msg: 'This is a PATCH request'
    })
}

module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete,
    userPatch,
}