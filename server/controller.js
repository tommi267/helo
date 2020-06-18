const bcrypt = require('bcrypt')

module.exports = {
    register: async (req, res) => {
        const {username, password} = req.body
        const db = req.app.get('db')

        const existingUser = await db.check_user(username)
        if(existingUser[0]){
            return res.status(409).send('User already exists')
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        const profilePic = `https://robohash.org/${username}`

        const newUser = await db.register_user([username, hash, profilePic])

        req.session.user = {
            userId: newUser[0].id,
            username: newUser[0].username,
            profilePic: newUser[0].profile_pic 
        }
        res.status(200).send(req.session.user)
     },
    login: async (req, res) => {
         const {username, password} = req.body
         const db = req.app.get('db')       

        const user = await db.check_user(username)

        if(!username[0]){
            return res.status(404).send('User does not exist')
        }
        const authenticated = bcrypt.compareSync(password, user[0].password)
        if (authenticated){
            req.session.user = {
                userId: user[0].id,
                username: user[0].username,
                profilePic: user[0].profile_pic
            }
            res.status(200).send(req.session.user)
        }else{
        res.status(403).send('Username or password incorrect')
        }
    },
    logout: (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    },
    getUser  : (req, res) => {
        if(req.session.user){
            res.status(200).send(req.session.user)
        } else {
            res.sendStatus(404)
        }
    }
}