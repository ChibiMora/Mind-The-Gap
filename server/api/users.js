const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.put('/', async (req, res, next) => {
  try {
    const user = await User.findOne({where: {id: req.user.id}})
    const points = user.pointsSpent + req.body.points
    const updatedUser = await user.update({
      pointsSpent: points
    })
    res.json(updatedUser)
  } catch (err) {
    next(err)
  }
})
