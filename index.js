const express = require('express');
const app = express();

// Discord & Bot
const Discord = require('discord.js');
const client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
        Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
        Discord.Intents.FLAGS.GUILD_PRESENCES,
    ]
});
client.login("OTUxMTU4NDUyNzI0NTk2Nzg3.GIgjPQ.jQBUQDXFZ8vr7mKHc45SoBbJZ0BHYOhwapzCzU");

//  Packages
const urlencodedParser = require('body-parser').urlencoded({ extended:false });
const os = require('os');
const fs = require('fs');
const cookieParser = require('cookie-parser');

const DiscordOauth2 = require('discord-oauth2');
module.exports = client
require('./mongo');

process.oauth = new DiscordOauth2({
    clientId: "951158452724596787",
    clientSecret: "lqFEO7P3RqPcAt72v__p10gKTQKgjmkU",
    redirectUri: "http://localhost:80/callback"
});

// css
app.use(express.static(__dirname + "/Website"))
app.use(express.json());

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://abdoo3:kooop1234kooop@cluster0.u988x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

// const {MongoClient} = require('mongodb');
// connect();

// async function connect() {
//     try {  
//         const mclient = new MongoClient(url);
//   await mclient.connect();
// app.post('/getUserGuilds/:id', async (req,res) => {
//     const { data } = req.body;
//     if (data === undefined) return;
//     // console.log(data.guild)
// // console.log(data.roles + `  type:  ` + typeof(data.roles))
//     if (!data.roles) {
//         return res.status(400).send({status: "failed"})
//     }
//     res.status(200).send({status: "received"})

    // let g = message.guild;
    // let rolesArr = [];
    // let addedRoles = message.content.substring(5)


    // rolesArr.push()
// let splitted = addedRoles.split(" ");

    //              splitted.forEach(e => {
    // rolesArr.push(e)
    // console.log("Role added to array")
    //              });
  
  
//     const myDB = mclient.db("myFirstDatabase");
// await myDB.collection("rubby").findOne({
// guildId: g.id},
// async (error, data) => {
// if (error) console.log(`error - ` + error)
//     if (data === null) {
//         await dbb.collection("rubby").insertOne({
//             "guildId": `${g.id}`,

//             "roles": [{
//               rolesArr
//                       }]
//         });
//         message.channel.send(`تم اضافة ${rolesArr} الى الداتابيس`)
//     } else {
//         await dbb.collection("rubby").updateOne({
//           "guildId": `${g.id}`},
//                                              {"$set":{  "roles": rolesArr
//                       }
//                                              }
//         );
//         message.channel.send(`تم تعديل ${rolesArr} في الداتابيس`)
//     }
// })

// })
//     } catch(error) {
//         console.log(error)
//     }
// }

app.post('/getUserGuilds/:id', async (req,res) => {
    console.log("trying")
MongoClient.connect(url, async function(err, db) {
    const { data } = req.body;
    if (data === undefined) return;
    // console.log(`alo running`)
    let guildId = data.guild;
    // console.log(typeof(rolesArr))
    let roles = data.roles;
    let rolesArr = [];
    rolesArr.push(roles)
    const rubbySchema = db.db("mydb").collection("cmd-rubbies");
    let rubbyData = await rubbySchema.findOne({
        "guildId": `${guildId}`
    });
    if (!rubbyData) {
        rubbySchema.insertOne({ guildId: guildId,
            roles: rolesArr
        })
       console.log(`Schema addeds, data ( ${rolesArr} )`)
     } else {
         rubbySchema.updateOne({
                      "guildId": `${guildId}`},
                    {"$set":{  "roles": rolesArr }
        });
       console.log(`Schema updated, data ( ${rolesArr} )`)
    } 
});
});

app.listen(80, () => console.log(`App listening on port 80`));


// app.use(express.static(__dirname + "/Website/html"))

app.use(urlencodedParser);
app.use(cookieParser());
app.enable("trust proxy")
app.set("etag", false)
app.set("views", __dirname)
app.set("view engine", "ejs")

client.on("ready", () => {
    console.log(`${client.user.username}: Ready`)
});
// import { fileURLToPath } from 'node:url';

// const __filename = fileURLToPath(import.meta.url);
// import { createRequire } from 'module';
// const require = createRequire(__filename); 
// Request Handler

let files = fs.readdirSync("./Website/public").filter(f => f.endsWith(".js"))
files.forEach(f => {
     const file = require(`./Website/public/${f}`);
    if (file && file.name) {
        app.get(file.name, file.run)
        console.log(`Loaded ${file.name}`)

        if (file.run2) app.post(file.name, file.run2);
    }
});

app.get("/getUs", async (req,res) => {
    console.log(req.body.automobiles)
})

// let files2 = fs.readdirSync("./Website/js").filter(f => f.endsWith(".js"))
// files2.forEach(f => {
//     const file = require(`./Website/js/${f}`)
//     if (file && file.name) {
//         app.get(file.name, file.run)
//         console.log(`hello Loaded ${file.name}`)

//         if (file.run2) app.post(file.name, file.run2);
//     }
// });


