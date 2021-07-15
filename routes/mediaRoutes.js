const router = require('express').Router();
const { Media, User } = require('../models')
const jwt = require('jsonwebtoken');

router.post('/add', async (req, res) => {
    try {
        console.log(req.headers);
        let userObj;
        if (!req.headers.authorization) {
            console.log('made it! 111');
            res.status(401).end();
            return;
        }
        
        console.log('made it! 222');
        const token = req.headers.authorization;

        console.log(`token: ${token}`);

        var decoded = jwt.verify(token.slice(7), process.env.JWTSECRET);

        console.log(`decoded:`, decoded);

        let user = await User.findOne({ where: { id: decoded.data } });
        if (!user.todo) {
            userObj = [{id: req.body.id, todo: req.body.todo}];
        } else {
            userObj = JSON.parse(user.todo);

            let found = false;

            userObj.forEach((e, index) => {
                if (e.id === req.body.id) {
                    found = true;
                    if (e.todo === req.body.todo) {
                        return
                    } else {
                        userObj[index].todo = req.body.todo;
                    }
                }
            });

            if (!found) {
                userObj.push({id: req.body.id, todo: req.body.todo});
            }
        }

        console.log(`userObj: ${userObj}`)

        const stringUserObj = JSON.stringify(userObj);
        
        console.log(`userObj: ${stringUserObj}`)

        user.todo = stringUserObj;

        user = await user.save();

        const newMedia = await Media.create({
            ...req.body,
        });

        res.status(200).json({ todo: stringUserObj});
    } catch (err) { console.log(err)
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
