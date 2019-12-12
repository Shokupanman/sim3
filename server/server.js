require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env
const authCtrl = require('./controllers/AuthController')
const ctrl = require('./controllers/Controller')

const app = express()

app.use(express.json())
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET
  })
)

app.get('/auth/getsession', authCtrl.getSession)
app.post('/auth/login', authCtrl.login)
app.post('/auth/register', authCtrl.register)
app.delete('/auth/logout', authCtrl.logOut)
app.post('/api/post', ctrl.addPost)
app.get('/api/posts', ctrl.allPosts)
app.get('/api/post/:id', ctrl.getPost)
app.put('/api/post', ctrl.editPost)
app.get('/api/posts/:id', ctrl.getNonUserPosts)
app.delete('/api/post/:id', ctrl.deletePost)

massive(CONNECTION_STRING).then(db => {
  app.set('db', db)
  app.listen(SERVER_PORT, console.log(`Self destruct in ${SERVER_PORT}`))
})
