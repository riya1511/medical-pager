const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.js');

const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 5000;

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = require('twilio')(accountSid, authToken); 

app.use(cors({origin: true, credentials: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req,res) => {
    res.send("Hello!")
});

app.post('/', (req,res) => {
    const { message, user: sender, type, members } = req.body;

    if(type === 'message.new'){
        members
            .filter((member) => member.user_id !== sender.id)
            .forEach(({ user }) => {
                if(!user.online){
                    twilioClient.messages.create({
                        body: `You have a new message from ${message.user.fullName} - ${message.text}`,
                        messagingServiceSid: messagingServiceSid,
                        to: user.phoneNo
                    })
                        .then(() => console.log("message sent!"))
                        .catch((err) => console.log(err))
                }
            })

            return res.status(200).send("Message sent!");
    }

    return res.status(200).send("Not a new message");
})

app.use('/auth', authRoutes);

app.listen(PORT , () => {
    console.log(`App running on route ${PORT}`);
})