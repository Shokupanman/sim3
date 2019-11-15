import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { updateUserInfo } from '../../ducks/reducer'

class Auth extends Component {
  state = {
    user_name: '',
    password: ''
  }

  handleChange = (key, value) => {
    this.setState({ [key]: value })
  }

  register = () => {
    const { user_name, password } = this.state
    axios
      .post('/auth/register', { user_name, password })
      .then(res => {
        console.log(res.data)
        this.props.updateUserInfo(res.data.user)
      })
      .catch(err => {
        console.log(err.response.data.message)
      })
  }

  login = () => {
    const { user_name, password } = this.state
    axios.post('/auth/login', { user_name, password }).then(res => {
      this.props.updateUserInfo(res.data.user)
      this.props.history.push('/dashboard')
    })
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
