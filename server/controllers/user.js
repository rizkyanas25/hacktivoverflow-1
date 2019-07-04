const User = require('../models/user')
const { compare } = require('../helpers/bcrypt')
const { sign } = require('../helpers/jwt')

class UserController {

    static getUserData (req, res, next) {
        User
            .findById(req.loggedUser._id)
            .then(user => {
                res.status(200).json({
                    name: user.name,
                    email: user.email,
                    profilePic: user.profilePic,
                    watchedTags: user.watchedTags
                })
            })
            .catch(next)
    }

    static findAllUsers (req, res, next) {
        User
            .find()
            .then(users => {
                res.status(200).json(users)
            })
            .catch(next)
    }

    static updateTag (req, res, next) {
        User
        .findByIdAndUpdate(req.loggedUser._id, {
            watchedTags: req.body.tags
        })
        .then(user => {
            res.status(200).json(user)
        })
        .catch(next)
    }

    static register (req, res, next) {
        let user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            profilePic: 'https://storage.googleapis.com/kantong-ajaib/foxThumb.jpg',
            watchTags: []
        })
        user.save()
            .then(value => {
                res.status(201).json(value)
            })
            .catch(next)
    }

    static login (req, res, next) {
        User
            .findOne({ email: req.body.email })
            .then(user => {

                if (user) {
                    if (compare(req.body.password, user.password)) {
                        let payload = {
                            _id: user._id
                        }
                        let token = sign(payload)
                        res.status(200).json({
                            token
                        })
                    } else {
                        throw { code: 404, resource: `Password` }
                    }
                } else {
                    throw { code: 404, resource: `Email` }
                }
            })
            .catch(next)
    }

}

module.exports = UserController