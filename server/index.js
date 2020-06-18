require("dotenv").config();
const express = require('express'),
      session = require('express-session'),
      massive = require('massive'),
      ctrl = require('./controller'),
      {SERVER_PORT,SESSION_SECRET, CONNECTION_STRING} = process.env,
      app = express ()

app.use(express.json())
app.use(
    session({
        resave: false,
        saveUninitialized: true,
        secret: SESSION_SECRET,
        cookie: { maxAge: 1000 * 60 * 60 * 24 * 14},

    })
)

app.post('/auth/register', ctrl.register)
app.post('/auth/login', ctrl.login)
app.post('/auth/logout', ctrl.logout)
app.get('/auth/user', ctrl.getUser)

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(db => {
    app.set('db', db);
    console.log('db connected')
    app.listen(SERVER_PORT, () => console.log(`The server is running on port ${SERVER_PORT}`))
})
