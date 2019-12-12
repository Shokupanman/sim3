import React from 'react'
import { updatePost } from '../ducks/reducer'
import axios from 'axios'
import { connect } from 'react-redux'

const Form = props => {
  const submitPost = () => {
    axios
      .post('/api/post', props.post)
      .then(res => {
        alert(res.data.message)
        props.history.push('/dashboard')
      })
      .catch(err => alert(err.response.data.message))
  }

  return (
    <div className="form">
      <h2>New Post</h2>
      <div className="new-post">
        <form>
          <h4>Title:</h4>
          <input
            onChange={e => props.updatePost(e.target)}
            name="title"
            type="text"
          />
          <img className="pic-prev" name="img-prev" src={props.img} alt="" />
          <h4>Image URL:</h4>
          <input
            value={props.img}
            onChange={e => props.updatePost(e.target)}
            name="img"
            type="text"
          />
          <h4>Content:</h4>
          <textarea onChange={e => props.updatePost(e.target)} name="content" />
          <button onClick={() => submitPost()}>Post</button>
        </form>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  const { title, img, content } = state.post
  return {
    post: state.post,
    title: title,
    img: img,
    content: content
  }
}
export default connect(mapStateToProps, { updatePost })(Form)
