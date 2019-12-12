import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Link } from 'react-router-dom'
import search from '../assets/search_logo.png'
import Nav from './Nav'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      filteredPosts: [],
      search: '',
      usersPosts: true
    }
  }

  componentDidMount = () => {
    axios.get('/api/posts').then(res => {
      this.setState({ posts: res.data })
    })
    axios.get('/auth/getsession').then()
    axios
      .get(`/api/posts/${this.props.userId}`)
      .then(res => this.setState({ filteredPosts: res.data }))
  }
  showUserPosts = () => {
    this.setState({ usersPosts: !this.state.usersPosts })
  }

  clearSearch = () => {
    this.setState({
      search: ''
    })
  }
  howToFilter = () => {
    let allArr = []
    let nonUserArr = []
    console.log(new Boolean(this.state.search))
    if (this.state.search) {
      console.log('running search')
      allArr = this.state.posts.filter(post =>
        post.title.includes(this.state.search)
      )
      nonUserArr = this.state.filteredPosts.filter(post =>
        post.title.includes(this.state.search)
      )
    }
    if (this.state.usersPosts === true) {
      return !this.state.search ? this.state.filteredPosts : allArr
    } else if (this.state.usersPosts === false) {
      return !this.state.search ? this.state.posts : nonUserArr
    }
  }
  handlChange = trg => {
    this.setState({ [trg.name]: trg.value })
  }

  render() {
    console.log(this.state.usersPosts, this.props.userId, this.howToFilter())
    return (
      <div className="grey-back">
        <Nav />
        <div className="outer-search">
          <div className="search-cont">
            <input
              name="search"
              onChange={e => this.handlChange(e.target)}
              value={this.state.search}
              placeholder="Search by Title"
            />
            <button className="search">
              <img src={search} alt="search" />
            </button>
            <button className="reset" onClick={this.clearSearch}>
              Reset
            </button>
          </div>
          <div className="my-posts">
            <div>My Posts</div>
            <input type="checkbox" onChange={() => this.showUserPosts()} />
          </div>
        </div>
        <div className="outer-post">
          {this.howToFilter().map(post => {
            return (
              <Link to={`/post/${post.id}`}>
                <div id={post.id} className="post">
                  <h1>{post.title}</h1>
                  <div className="name-pic">
                    <div>{post.username}</div>
                    <div className="post-pic">
                      <img src={post.profile_pic} alt="" />
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  const { title, img, content } = state.post
  return {
    post: state.post,
    title: title,
    img: img,
    content: content,
    userId: state.id
  }
}

export default connect(mapStateToProps)(Dashboard)
