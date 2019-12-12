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
    this.register = this.register.bind(this)
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

  register = function() {
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
      <div className="login-back">
        <div className="login-box">
          <img src={logo} />
          <h1>Helo</h1>
          <div className="input-cont">
            <p>Username:</p>
            <input
              name="username"
              type="text"
              onChange={e => this.handleChange(e.target)}
            />
          </div>
          <div className="input-cont">
            <p>Password:</p>
            <input
              name="password"
              type="text"
              onChange={e => this.handleChange(e.target)}
            />
          </div>
          <div className="log-reg">
            <button onClick={this.userLogin}>ログイン</button>
            <button onClick={this.register}>登録</button>
          </div>
        </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return state
}
export default connect(mapStateToProps, { setUser })(Auth)
