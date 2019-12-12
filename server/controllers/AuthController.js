module.exports = {
  login: async (req, res) => {
    const db = req.app.get('db')
    const { username, password } = req.body
    let client = await db.find_user(username)
    if (client.length === 0) {
      return res
        .status(404)
        .send({ message: 'Username not found, please register.' })
    } else if (client[0].password !== password) {
      return res.status(403).send({ message: 'Incorrect Password' })
    } else if (client[0].password === password) {
      client = client[0]
      const { username, id, profile_pic } = client
      req.session.user = { username, id, profile_pic }
      res.status(200).send({ message: 'Logged in.', user: req.session.user })
    }
  },
  register: async (req, res) => {
    const db = req.app.get('db')
    const { username, password } = req.body
    const found = await db.find_user(username)
    if (found.length === 1) {
      return res.status(409).send({ message: 'Username aready taken.' })
    }
    let user = await db.add_user({
      username,
      password,
      profile_pic: `https://robohash.org/${username}`
    })
    user_id = user[0].id
    req.session.user = {
      username: username,
      user_id: user_id,
      profile_pic: `https://robohash.org/${username}`
    }
    res.status(201).send({ message: 'Registered', user: req.session.user })
  },
  logOut: (req, res) => {
    req.session.destroy()
    res.status(200).send({ message: 'Logged out.' })
  },
  getSession: (req, res) => {
    if (req.session.user) {
      res.status(302).send(req.session.user)
    }
  }
}
