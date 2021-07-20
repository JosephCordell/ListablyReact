const router = require('express').Router();
const { Media, User } = require('../models');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const { authorization } = require('../config/authorization');

router.post('/add', authorization, async (req, res) => {
    try {
        let userObj;

        let user = await User.findOne({ where: { id: req.id } });
        if (!user.todo) {
            userObj = [{ id: req.body.id, todo: req.body.todo }];
        } else {
            userObj = JSON.parse(user.todo);

            let found = false;

            if (req.body.todo === 6) {
                userObj.filter((media) => media.id !== req.body.id);
            } else {
                userObj.forEach((e, index) => {
                    if (e.id === req.body.id) {
                        found = true;
                        if (e.todo === req.body.todo) {
                            return;
                        } else {
                            userObj[index].todo = req.body.todo;
                        }
                    }
                });
                if (!found) {
                    userObj.push({ id: req.body.id, todo: req.body.todo });
                }
            }
        }
        const stringUserObj = JSON.stringify(userObj);
        user.todo = stringUserObj;
        user = await user.save();
        const newMedia = await Media.create({
            ...req.body,
        });
        
        console.log(`stringUserObj: `, stringUserObj);
        res.status(200).json({ todo: stringUserObj });
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
        let userObj;
        userObj = req.body;
        for (const e of userObj) {
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

    let userObj;
    userObj = await JSON.parse(user.todo);
    let found = false;

    for (let i = 0; i < userObj.length; i++) {
        if (userObj[i][0] === req.body.id) {
            found = true;
            let index = i;
            if (index > -1) {
                userObj.splice(index, 1);
            }
        }
    }

    const stringUserObj = JSON.stringify(userObj);

    user.todo = stringUserObj;

    user = await user.save();
});

module.exports = router;
