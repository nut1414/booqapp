const bcrypt = require('bcrypt')
const saltround = 10

export default async function hashing(req, res){
    bcrypt.genSalt(saltround, function(err, salt) {
        bcrypt.hash(req.body, salt, function(err, hash) {
            return res.status(200).json({message:hash});
        });
    });
}