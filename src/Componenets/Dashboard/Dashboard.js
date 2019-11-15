import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Dashboard extends Component {
  state = {
    search: '',
    myPosts: true,
    posts: [],
    loading: true
  }

  componentDidMount = () => {
    this.grabPosts()
  }

  render() {
    let posts = this.state.posts.map(el => {
      return <Link to={`/post/${el.post_id}`} key={el.post_id} />
    })
    return (
      <div>
        <div className="searchBar">
          <input type="text" />
          <button>SEARCH</button>
        </div>
        <button>RESET</button>

        <div>
          <p>MY POSTS</p>
          <input
            checked={this.state.myPosts}
            onChange={_ =>
              this.setState({ myPosts: !this.state.myPosts }, this.grabPosts)
            }
            type="checkbox"
          />
        </div>
      </div>
    )
  }
}
