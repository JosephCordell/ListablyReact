const router = require('express').Router();
const { Media, User } = require('../models');

router.post('/', async (req, res) => {
    try {
        res.send('peanut butter jelly time')
        let userObj;
        if (!req.session.user_id) {
            res.status(401).end();
            return;
        }
        let user = await User.findByPk(req.session.user_id);
        if (!user.todo) {
            userObj = [[req.body.id, req.body.todo]];
        } else {
            userObj = JSON.parse(user.todo);

            let found = false;

            for (let i = 0; i < userObj.length; i++) {
                if (userObj[i][0] === req.body.id) {
                    found = true;
                    if (userObj[i][1] === req.body.todo) {
                        break;
                    } else {
                        userObj[i][1] = req.body.todo;
                    }
                }
            }
            if (!found) {
                userObj.push([req.body.id, req.body.todo]);
            }
        }

        const stringUserObj = JSON.stringify(userObj);

        user.todo = stringUserObj;

        user = await user.save();

        const newMedia = await Media.create({
            ...req.body,
        });

        res.status(200).json(newMedia);
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

router.delete('/', async (req, res) => {
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
