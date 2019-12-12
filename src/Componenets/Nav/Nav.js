import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import axios from 'axios'
import { setUser } from '../ducks/reducer'

const Nav = props => {
  console.log(props)

  const logOut = () => {
    axios.delete('/auth/logout').then(() => {
      props.setUser({ username: '', profile_pic: '', id: 0 })
      props.history.push('/')
    })
  }

  return props.username ? (
    <nav>
      <div className="profile-img">
        <img className="profile-pic" src={props.img} alt="" />
      </div>
      <div className="prof-name">{props.username}</div>
      <Link to="/dashboard">dashboard</Link>
      <Link to="/new">New</Link>
      quit
    </nav>
  ) : null
}

function mapStateToProps(state) {
  return {
    username: state.username,
    img: state.profile_pic
  }
}

export default withRouter(connect(mapStateToProps, { setUser })(Nav))
