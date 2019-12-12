import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

class Post extends Component {
  constructor(props) {
    super(props)
    this.state = {
      post: {},
      hidden: true
    }
  }

  componentDidUpdate = () => {
    console.log('Component Updated')
  }

  componentDidMount = () => {
    axios.get(`/api/post/${this.props.match.params.postid}`).then(res => {
      this.setState({ post: res.data })
    })
    axios.get('/auth/getsession').then(res => console.log(res))
  }
  editToggle = () => {
    this.setState({ hidden: false })
  }
  handleChange = trg => {
    this.setState({ post: { ...this.state.post, [trg.name]: trg.value } })
  }

  updatePost = () => {
    axios
      .put('/api/post', this.state.post)
      .then(() => this.props.history.push('/dashboard'))
  }
  deletePost = () => {
    axios
      .delete(`/api/post/${this.props.match.params.postid}`)
      .then(() => this.props.history.push('/dashboard'))
  }

  render() {
    const { title, img, content, author_id } = this.state.post
    return (
      <div>
        <h1>{title}</h1>
        <input
          name="title"
          type="text"
          hidden={this.state.hidden}
          value={title}
          onChange={e => this.handleChange(e.target)}
        />
        <img className="pic" src={img} alt="" />
        <input
          name="img"
          type="text"
          hidden={this.state.hidden}
          value={img}
          onChange={e => this.handleChange(e.target)}
        />
        <p>{content}</p>
        <input
          name="content"
          type="text"
          hidden={this.state.hidden}
          value={content}
          onChange={e => this.handleChange(e.target)}
        />
        {author_id === this.props.userId ? (
          <>
            <button onClick={() => this.deletePost(this.state.post.id)}>
              Delete
            </button>
            <button hidden={!this.state.hidden} onClick={this.editToggle}>
              Edit
            </button>
            <button
              hidden={this.state.hidden}
              onClick={() => this.updatePost()}
            >
              Save
            </button>
          </>
        ) : null}
      </div>
    )
  }
}
function mapStateToProps(state) {
  const { id } = state
  return {
    userId: id
  }
}

export default connect(mapStateToProps)(Post)
