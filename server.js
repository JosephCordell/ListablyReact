const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();
const session = require('express-session');
const compression = require('compression')

const sequelize = require('./config/connections');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

app.use(compression({}));

app.use([express.urlencoded({ extended: true }), express.json()]);

app.use(
    session({
        secret: 'Super secret secret',
        resave: true,
        saveUninitialized: true,
    })
);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

// Link API Routes here

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/build/index.html'));
});

sequelize.sync({ force: false }).then(() => {
  console.log(`Connected to Database`);
    app.listen(PORT, () => {
        console.log('🚀  Server server now on port', PORT, '👻 React App on Port 3000');
    });
});
