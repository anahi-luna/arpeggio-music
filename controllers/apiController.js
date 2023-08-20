const db = require('../database/models');
const { Op } = require('sequelize');
require('dotenv').config();
const envs = process.env;


let getTowns = (req, res) => {
    db.Town.findAll({
        where: { id_province: req.params.id },
        attributes: ['id', 'name']
    }).then( (towns) => res.json(towns)
)}

const checkEmail = (req, res) => {
    db.User.findOne({
        where: { email: req.params.email },
        attributes: ['email']
    }).then( (email) => res.json(email)
)}

const addDetailForUser = (userList) => {
    const url = envs.APP_URL + ':' + envs.APP_PORT;
    return (userList.map( (user) => {
            user.dataValues.detail = url + '/user/' + user.userName;
            return user
        })
    );
}

const userList = async (req, res) => {
    const limit = 3;
    let page = parseInt(req.query.page) || 1;
    page > 0 ? page-- : '';
    const offset = page * limit;
    let usersList = await db.User.findAll({
        limit,
        offset,
        attributes: ['userName', 'email'],
    });

    const usersCount = await db.User.count();
    const pageLimit = Math.ceil(usersCount / 3);
    const usersData = {
        users: addDetailForUser(usersList),
        count: usersCount,
        currentPage: page + 1,
        totalPages: pageLimit,
    }
    return res.json(usersData);
}

const userDetail = async (req, res) => {
    let user = await db.User.findOne({});
    const urlBase = envs.APP_URL + ':' + envs.APP_PORT;
    user.dataValues.imageURL = urlBase + '/images/userProfile/' + user.image;
    delete(user.dataValues.id);
    delete(user.dataValues.password);
    return res.json(user);
}


const apiController = {
    getTowns: getTowns,
    checkEmail: checkEmail,
    userList: userList,
    userDetail:userDetail,
}

module.exports = apiController;