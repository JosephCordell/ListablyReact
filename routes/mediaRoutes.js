const router = require('express').Router();
const { Media, User } = require('../models');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const { authorization } = require('../config/authorization');
require('dotenv').config();
const axios = require('axios')

const key = process.env.REACT_APP_MOVIE_DB_API_KEY;
const trendingMoviesApi = `https://api.themoviedb.org/3/trending/movie/day?api_key=${key}`;
const trendingTVApi = `https://api.themoviedb.org/3/trending/tv/day?api_key=${key}`;

router.post('/add', authorization, async (req, res) => {
    try {
        let todoArr;

        let user = await User.findOne({ where: { id: req.id } });
        if (!user.todo) {
            todoArr = [{ id: req.body.id, todo: req.body.todo }];
        } else {
            todoArr = JSON.parse(user.todo);

            let found = false;

            if (req.body.todo === 6) {
                todoArr.filter((media) => media.id !== req.body.id);
            } else {
                todoArr.forEach((e, index) => {
                    if (e.id === req.body.id) {
                        found = true;
                        if (e.todo === req.body.todo) {
                            return;
                        } else {
                            todoArr[index].todo = req.body.todo;
                        }
                    }
                });
                if (!found) {
                    todoArr.push({ id: req.body.id, todo: req.body.todo });
                }
            }
        }
        const stringUserObj = JSON.stringify(todoArr);
        user.todo = stringUserObj;
        user = await user.save();
        Media.findByPk(req.body.id).then((result) => {
            if (!result) {
                Media.create({
                    ...req.body,
                });
            }
        });

        res.status(200).json({ todo: stringUserObj });
    } catch (err) {
        console.log(err);
        if (err.errors) {
            for (let i = 0; i < err.errors.length; i++) {
                if (err.errors[i].validatorKey === 'not_unique') {
                    res.status(200).json('Success!');
                    return;
                }
            }
        }
        res.status(400).json(err);
    }
});

router.post('/get', async (req, res) => {
    try {
        let media = await Media.findAll({ where: { id: { [Op.in]: req.body.map((e) => e.id) } } });

        res.status(200).json(media);
    } catch (err) {
        if (err.errors) {
            for (let i = 0; i < err.errors.length; i++) {
                if (err.errors[i].validatorKey === 'not_unique') {
                    res.status(200).json('Success!');
                    return;
                }
            }
        }
        res.status(400).json(err);
    }
});

router.put('/update', authorization, async (req, res) => {
    await User.update({ todo: req.body }, { where: { id: req.id } });

    res.status(200);
});

router.post('/delete', async (req, res) => {
    let mediaArr = [];
    try {
        let todoArr;
        todoArr = req.body;
        for (const e of todoArr) {
            todoArr = e.id;
            todoNum = e.todo;
            let almost = await Media.findOne({ where: { id: todoArr } });
            mediaArr.push({
                mediatype: almost.mediatype,
                poster_path: almost.poster_path,
                title: almost.title,
                id: almost.id,
            });
        }

        const mediaUserObj = mediaArr;
        res.status(200).json({ media: mediaUserObj });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/delete', async (req, res) => {
    let user = await User.findByPk(req.session.user_id);

    let todoArr;
    todoArr = await JSON.parse(user.todo);
    let found = false;

    for (let i = 0; i < todoArr.length; i++) {
        if (todoArr[i][0] === req.body.id) {
            found = true;
            let index = i;
            if (index > -1) {
                todoArr.splice(index, 1);
            }
        }
    }

    const stringUserObj = JSON.stringify(todoArr);

    user.todo = stringUserObj;

    user = await user.save();
});

router.get('/top20/:id', async (req, res) => {
    if (req.params.id === 'movie') {
        await axios(trendingMoviesApi)
        .then((response) => { 
            console.log(`movies!`);
            res.send(response.data)
        })
    } 
    if ( req.params.id === 'tv') {
        //res.send(`movies works`)

        await axios.get(trendingTVApi)
        .then((response) => {
            res.send(response.data.results)
        })
    }
});

module.exports = router;
