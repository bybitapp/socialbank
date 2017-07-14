const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const crypto = require('crypto')

const states = ['pending', 'active', 'deleted']

const userSchema = new mongoose.Schema({
  email: { type: String, index: true },
  phone: String,
  access: String,
  emailVerified: { type: Boolean, default: false },
  phoneVerified: { type: Boolean, default: false },

  password: String,
  passwordResetToken: String,
  passwordResetExpires: Date,

  status: { type: String, enum: states, default: 'active' },

  tokens: Array,

  profile: {
    name: { type: String, default: '' },
    gender: String,
    location: String,
    website: String,
    picture: String
  }
}, { timestamps: true })

/**
 * Password hash middleware.
 */
userSchema.pre('save', function save (next) {
  const user = this

  if (!user.isModified('password')) { next() }

  bcrypt.genSalt(10)
    .then(salt => bcrypt.hash(user.password, salt))
    .then((hash) => {
      user.password = hash
      next()
    })
    .catch(e => next(e))
})

/**
 * Helper method for validating user's password.
 */
userSchema.methods.comparePassword = function comparePassword (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

/**
 * Helper method for getting user's gravatar.
 */
userSchema.methods.gravatar = function gravatar (size) {
  if (!size) {
    size = 200
  }
  if (!this.email) {
    return `https://gravatar.com/avatar/?s=${size}&d=retro`
  }
  const md5 = crypto.createHash('md5').update(this.email).digest('hex')
  return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`
}

const User = mongoose.model('User', userSchema)

module.exports = User
