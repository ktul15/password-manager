const router = require('express').Router(),
  bcrypt = require('bcrypt'),
  mongo_utils = require('../mongo_utils'),
  userCollection = mongo_utils.getCollection(),
  jwtGenerator = require('../utils/jwtGenerate')

router.post('/register', async (req, res, next) => {

  // 1. destructure name, email, profilePassword and profileImageUrl from req.body
  const {
    user_name,
    user_email,
    user_profilePassword,
    user_profileImageUrl
  } = req.body
  try {
    // 2. check if the user already exists
    const foundUser = await userCollection.findOne({ email: user_email })
    if (foundUser) {
      return res.status(401).json('User with this email already exists.')
    }

    // 3. encrypt the password
    const hashedPassword = await bcrypt.hash(user_profilePassword, 10)


    // 3. add new user to the database
    const newUserBody = {
      name: user_name,
      email: user_email,
      password: hashedPassword,
      profileImgUrl: user_profileImageUrl
    }
    const newUser = await userCollection.insertOne(newUserBody)

    // // 4. Generate token
    const { id, name, email, profileImgUrl } = newUser.ops[0]
    const token = jwtGenerator(id, name, profileImgUrl)

    return res.status(200).json({
      id, name, email, token, profileImgUrl
    })
  } catch (err) {
    if (err.code === 11000) {
      err.message = 'Username/Email already taken'
    }
    return next({
      status: 400,
      message: err.message
    })
  }
})

module.exports = router