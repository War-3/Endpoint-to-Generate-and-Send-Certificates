const user = require('../models/learnerModel')
const sendUserEmail = require("../controllers/emailSenderCntrls");


exports.add_userFxn =  async (req, res, next) => {

    try {
    const { name, email, address, phoneNumber } = req.body



    const alreadyexist = await user.findOne({ email })


    if (alreadyexist) {
        return res.status(400).json({
            message: "This user exist!"
        })
    }

    const newUser = new user({ name, email, address, phoneNumber })

    await newUser.save()
    return res.status(200).json({ message: `Welcome ${name}`, newUser })

    } catch (error) {
    return res.status(500).json({message: error.message})
    }
    next()
};


exports.generateCertFxn =  async (req, res, next) => {

    try {
    const { name, userEmail} = req.body

  
    const user_learner = await user.findOne({email: userEmail },{  returnOrignal: true} )
    
    if (user_learner) {
        await sendUserEmail(userEmail, name, res)
        return res.status(200).json({message: `Certificate sent Successful `})
    } else {
        return res.status(400).json({ message: 'User not found!' });
    }

    
} catch (error) {
    return res.status(500).json({message: error.message})
}
next()
}





