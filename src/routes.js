import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Auth from './Componenets/Auth/Auth'
import Dashboard from './Componenets/Dashboard/Dashboard'
import Post from './Componenets/Post/Post'
import Form from './Componenets/Form/Form'

export default (
  <Switch>
    <Route exact path="/" component={Auth}></Route>
    <Route path="/dashboard" component={Dashboard}></Route>
    <Route path="/post/:postid" component={Post}></Route>
    <Route path="/new" component={Form}></Route>
  </Switch>
)
