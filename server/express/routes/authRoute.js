const router = require('express').Router();
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../../database/models/user');
const template = require('../../emailTemplate/template');

dotenv.config();

//signin

router.post('/register', async (req, res) => {
    try {
        const existingUser = await User.findOne({ username: req.body.email });
        if (existingUser) {
            res.status(400).json("email already used");
        }
        const user = await User.create(req.body);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

//login

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json("Wrong credentials");
        }
        const validated = await user.matchPassword(req.body.password);
        console.log(validated)
        if (!validated) {
            return res.status(400).json("Wrong credentials p");
        }
        let accessToken = jwt.sign({ email: req.body.email }, process.env.SECRET_KEY, {
            expiresIn: '1h',
        })
        return res.status(200).send({user,token:accessToken});
    } catch (err) {
        res.status(500).json(err);
    }
});

//change password

router.put('/', async (req, res) => {
    try {
        console.log(req.body)
        const user = await User.findOne({ email: req.body.email });
        console.log(req.body.password)
        if (!user) {
            return res.status(400).json("User not found");
        }
        const validated = await user.matchPassword(req.body.password);
        if (!validated) {
            return res.status(400).json("Wrong credentials");
        }
        // const salt = await bcrypt.genSalt(10);
        // const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);
        const updatedUser = await User.findOneAndUpdate({email:user.email}, { password: req.body.newPassword });
        console.log(updatedUser)
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

//forgot password send email

router.put('/forgotPassword/', async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email });
        if (!user) {
            res.status(400).json("User not found");
        }


        let transporter = nodemailer.createTransport({
          service: process.env.EMAIL_SERVICE,
          host: process.env.EMAIL_HOST,
          port: process.env.EMAIL_PORT,
          secure: true,
          auth: {
            user: process.env.EMAIL_HOST_USER , // email
            pass: process.env.EMAIL_HOST_PASSWORD, //app password
          },
        });

        let password = Math.random().toString(36).slice(-8);
        let info = transporter.sendMail({
            from: process.env.EMAIL_HOST_USER, 
            to: user.email, 
            subject: "reinitializing password", 
            //text: `New password: ${password}`,
            html: template(password), 
        },async (error, info) => {
            if(error){
                console.log('Erroe Occured ' + error);
            }else {
                console.log("Email Sent Successfully to " + user.email);
                const updatedUser = await User.findByIdAndUpdate(user.id, { password });
                res.status(200).json(updatedUser);
            }
            return res.end();
        })
    } catch (err) {
        res.status(500).json(err);
    }
});

//get all users

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get one user by email

router.get('/email/:email', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get one user by id

router.get('/id/:id', async (req, res) => {
    try {
        const user = await User.find({ _id: req.params.id });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;