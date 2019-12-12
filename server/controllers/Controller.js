module.exports = {
  addPost: (req, res) => {
    const { id } = req.session.user
    const { title, img, content } = req.body
    const db = req.app.get('db')
    db.add_post([title, img, content, id])
      .then(result => {
        res.status(201).send({ message: 'Post Submitted', result: result })
      })
      .catch(err => res.status(417).send({ message: 'Something went wrong' }))
  },

  allPosts: (req, res) => {
    const db = req.app.get('db')
    db.all_posts().then(result => res.status(200).send(result))
  },

  getPost: (req, res) => {
    const db = req.app.get('db')
    db.get_post(req.params.id).then(result => {
      let data = result[0]
      res.status(200).send(data)
    })
  },

  editPost: (req, res) => {
    const { content, id, img, title } = req.body
    const db = req.app.get('db')
    db.edit_post([content, img, title, id])
      .then(result =>
        res.status(200).send({ post: result, message: 'Post Updated' })
      )
      .catch(err =>
        res.status(417).send({ err: err, message: 'Something went wrong' })
      )
  },

  getNonUserPosts: (req, res) => {
    const db = req.app.get('db')
    db.get_posts(req.params.id).then(result => {
      res.status(200).send(result)
    })
  },

  deletePost: (req, res) => {
    const db = req.app.get('db')
    db.delete_post(req.params.id)
      .then(result => {
        res.status(200).send(result)
      })
      .catch(() => res.status(417).send({ message: 'Could not delete' }))
  }
}
