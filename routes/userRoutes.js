const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization;
        console.log(token.slice(7));
        var decoded = jwt.verify(token.slice(7), process.env.JWTSECRET);

        if (decoded.exp > Date.now() / 1000) {
            const userData = await User.findOne({ where: { id: decoded.data } });
            if (Object.keys(userData).length > 1) {
                res.status(200).json({ todo: userData.todo, ratings: userData.ratings, logged_in: true });
                return;
            }
        }
        res.status(401);
        return;
    }

    try {
        console.log(req.headers);

        const userData = await User.findOne({ where: { email: req.body.email } });

        if (!userData) {
            res.status(400).json();
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json();
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            req.session.token = jwt.sign({ data: userData.id }, process.env.JWTSECRET, { expiresIn: '365d' });

            res.status(200).json({ todo: userData.todo, ratings: userData.ratings, logged_in: true, token: req.session.token });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/logout', (req, res) => {
    console.log('logging out');
    if (req.session.logged_in) {
        req.session.logged_in = false;
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(204).end();
    }
});

// Creates User
router.post('/signup', async (req, res) => {
    console.log('signing up');
    try {
        const userData = await User.create(req.body);
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            req.session.token = jwt.sign({ data: userData.id }, process.env.JWTSECRET, { expiresIn: '365d' });
            //console.log(req.session.token);
            res.status(200).json({ token: req.session.token });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;
