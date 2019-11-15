module.exports = {
  register: async (req, res) => {
    const db = req.app.get('db')
    const { email, password, name } = req.body
    const found = await db.find_user([email])
    if (+found[0].count !== 0) {
      return res
        .status(409)
        .send({ message: 'There is already a user with that email' })
    }
  },

  login: async (req, res) => {
    const db = req.app.get('db')
    const { email, password } = req.body
    const found = await db.find_user([email])
    if (+found[0].count === 0) {
      return res
        .status(401)
        .send({ message: 'An account with that email does not exist' })
    }
  }
}
