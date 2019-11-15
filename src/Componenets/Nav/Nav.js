import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
function Nav(props) {
  if (props.location.pathname !== '/') {
    return (
      <div>
        <Link to="/dashboard">
          <button>HOME</button>
        </Link>
        <Link to="/post/:postid">
          <button>NEW POSTIES</button>
        </Link>
        <Link to="/">
          <button>LOGOUTIEZ</button>
        </Link>

        <div>
          <div
            className="nav_profile_pic"
            style={{ backgroundImage: `url('${props.profile_img}')` }}
          ></div>
          <p>{props.name}</p>
        </div>
      </div>
    )
  } else {
    return null
  }
}

function mapStateToProps(state) {
  return state
}
export default withRouter(connect(mapStateToProps)(Nav))
