require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env
const ctrl = require('./controller')

const app = express()

app.use(express.json())
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET
  })
)

app.post('/auth/register', ctrl.register)
app.post('/auth/login', ctrl.login)

massive(CONNECTION_STRING).then(db => {
  app.set('db', db)
  console.log('Hey you wanna rock fact?')
  app.listen(SERVER_PORT, () => {
    console.log(
      `there is a ${SERVER_PORT}% chance that you will break this project`
    )
  })
})
