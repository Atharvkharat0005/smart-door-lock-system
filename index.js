const express = require('express');
require("dotenv").config();
const app = express();
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.SID;
const authToken = process.env.TOKEN;
const client = twilio(accountSid, authToken);

async function createMessage(data) {
  const message = await client.messages.create({
    body: data,
    from: "+12183221315",
    to: "+918767918092",
  });

  console.log(message.body);
}


app.get("/sendmessage",(req,res)=>{
    // createMessage();

    let name = req.query.name;
    let date = new Date(Date.now());

    createMessage(`
        ${date.toDateString()}
            ${name} has entered to the room on the date ${date.toDateString()}

        `)

    res.send("pass");
})

app.get("/",(req,res)=>{
    res.send("Welcome to smart door lock")
})

app.listen(process.env.PORT || 3000, () => console.log('Server running on http://localhost:'+ (process.env.PORT || 3000)));
