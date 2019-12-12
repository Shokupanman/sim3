import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { updateUserInfo } from '../../ducks/reducer'

class Auth extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
    this.userLogin = this.userLogin.bind(this)
    this.userRegister = this.userRegister.bind(this)
  }

  handleChange = trg => {
    const { name, value } = trg
    this.setState({ [name]: value })
  }

  userLogin = function() {
    axios
      .post('/auth/login', this.state)
      .then(res => {
        this.props.setUser(res.data.user)
        alert(res.data.message)
        this.setState({ username: '', password: '' })
        this.props.history.push('/dashboard')
      })
      .catch(err => {
        alert(err.response.data.message)
      })
  }

  userRegister = function() {
    axios
      .post('/auth/register', this.state)
      .then(res => {
        this.props.setUser(res.data.user)
        alert(res.data.message)
        this.setState({ username: '', password: '' })
      })
      .catch(err => alert(err.response.data.message))
  }

  render() {
    return (
      <div>
        <div>
          <h1>AAAAAAAAAAAAAAAAAH</h1>
          <input />
          <button onClick={this.login}>ログイン *Login*:</button>
        </div>
        <input />
        <button onClick={this.register}>登録 *Register*:</button>
        <div></div>
      </div>
    )
  }
}

export default connect(null, { updateUserInfo })(Auth)
