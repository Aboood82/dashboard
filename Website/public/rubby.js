// module.exports = {
//     name:"/getUserGuilds"
// }


// // const { Permissions } = require('discord.js');
// // const client = require('../../index.js');
// // const schema = require('../../dashboard/dashboard');
// // const jwt = require('jsonwebtoken');
// // const { jwt_secret } = require('../../config.json');
// // const GuildSchema = require('../../dashboard/guildSchema.js');
// // // const express = require('express');
// // // const app = express();
// // // app.use(express.static(__dirname + "/Website/public/rubby"))
// // module.exports = {
// //     name:"/getUserGuilds/:id/rubby",
// //     run: async(req,res) => {
// //         delete require.cache[require.resolve('../html/rubby.ejs')];
// //         console.log("new visit here")
// //         let gId = req.params.id;
// //         // if (gId === "main.css") return;
// //         if (!req.cookies.token) res.redirect('/login');
// //         let decoded;
// //         try { 
// //             decoded = jwt.verify(req.cookies.token, jwt_secret);
// //         } catch(e) {
// //             console.log("1313")
// //         }
        
// //         if (decoded) {
// //             let data = await schema.findOne({
// //                 _id: decoded.uuid,
// //                 userID: decoded.userID
// //             });
// //                         // if (!member.permissions.has("MANAGE_GUILD") && !member.permissions.has("ADMINISTRATOR") && client.guilds.cache.get(guild.id).ownerId == data.userID) res.redirect('/getUserGuilds');
// //                         console.log(`gID   ` + gId)
// //                         let guild = await client.guilds.fetch(gId).catch(err => console.log(err))
// //                         console.log(`G name  ` + guild.name)
// //                         if (!client.prefix) client.prefix = [];
// //            if (!client.prefix[guild.id]) {
// //                let guildData = await GuildSchema.findOne({
// //                    guildId: guild.id
// //                });
            
// //                if (!guildData) guildData = {};
        
              
// //                client.prefix[guild.id] = guildData.prefix || "$";
// //            }
// //            guild.prefix = client.prefix[guild.id];
        
// //                 let args = {
// //                     avatar: `https://cdn.discordapp.com/avatars/${data.userID}/${data.user.avatar}.png`,
// //                     username: data.user.username,
// //                     discriminator: data.user.discriminator,
// //                     id: data.user.userID,
// //                     guild: guild,
// //                     updatedPrefix: false,
// //                     error: false,
        
// //                 }

// //         res.render("./Website/html/rubby.ejs", args);
// //     }
// // }
// // }
const { Permissions } = require('discord.js');
const client = require('../../index.js');
const schema = require('../../dashboard/dashboard');
const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../../config.json');
const guildSchema = require('../../dashboard/guildSchema.js');

module.exports = {
name :"/servers/:id-rubby",
 run:async(req, res) => {
    //  let { guild,member,data } = await verify(req,res)
     let gId = req.params.id;
    //  console.log(gId)
    //  if (gId)
    if (!req.cookies.token) res.redirect('/login')
    let decoded;
    try {
        decoded = jwt.verify(req.cookies.token, jwt_secret);
    } catch (e) {};
    if (!decoded) res.redirect('/login');
    if (decoded) {
        let data = await schema.findOne({
            _id: decoded.uuid,
            userID: decoded.userID
        });
        // if (!member.permissions.has("MANAGE_GUILD") && !member.permissions.has("ADMINISTRATOR") && client.guilds.cache.get(guild.id).ownerId == data.userID) res.redirect('/getUserGuilds');
        if (client.guilds.cache.has(gId)) {
        let guild = await client.guilds.fetch(gId)
        // if (!prefix)
        //     prefix = [];
        // if (!prefix[guild.id]) {
        //     let guildData = await guildSchema.findOne({
        //         guildId: guild.id
        //     });

        //     if (!guildData)
        //         guildData = {};


        //     prefix[guild.id] = guildData.prefix || "$";
        // }
        // guild.prefix = prefix[guild.id];

        let args = {
            avatar: `https://cdn.discordapp.com/avatars/${data.userID}/${data.user.avatar}.png`,
            username: data.user.username,
            discriminator: data.user.discriminator,
            id: data.user.userID,
            guild: guild,
            updatedPrefix: false,
            error: false,
        };


        res.render("./Website/html/commands.ejs", args);

    }
}
}
}