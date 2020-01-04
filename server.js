const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const {OAuth2Client} = require('google-auth-library');

mongoose.connect('db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection
db.on('error', error => console.log(error));
db.once('open', _ => console.log('Connected to database'));

app.post(async (req, res) => {
    const client = new OAuth2Client(CLIENT_ID);
    async function verify() {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    // If request specified a G Suite domain:
    //const domain = payload['hd'];
    }
    verify().catch(console.error);
});

https://oauth2.googleapis.com/tokeninfo?id_token={id_token}


app.use(express.static('public'));

app.listen(1000);