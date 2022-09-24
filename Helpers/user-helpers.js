var db = require('../config/connection')
var collection = require('../config/collections')
const brypt = require('bcrypt')
const { resolve, reject } = require('promise')
const { response } = require('express')

//npm install brypt   ---------to encrypt passwords............///////

module.exports = {
    doSignup: (userData) => { //promis method
        return new Promise(async(resolve, reject) => {

            userData.Password = await brypt.hash(userData.Password, 10)
            db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((data) => {
                resolve(data.insertedId)

            })



        })


    },
    doLogin: (userData) => {

        return new Promise(async(resolve, reject) => {
            let loginStatus = false
            let response = {}

            let user = await db.get().collection(collection.USER_COLLECTION).findOne({ Email: userData.Email })
            if (user) {
                brypt.compare(userData.Password, user.Password).then((status) => {
                    if (status) {
                        console.log('login success')
                        response.user = user
                        response.status = true
                        resolve(response)
                    } else {
                        console.log('login failed')
                        resolve({ status: false })
                    }

                })
            } else {

                console.log('login failed')
                resolve({ status: false })
            }
        })
    }

}