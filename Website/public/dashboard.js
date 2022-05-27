// const { isModuleNamespaceObject } from 'util/types';

const fs = require('fs');
const client = require('../../index.js');
const schema = require('../../dashboard/dashboard');
const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../../config.json');
const { Permissions } = require('discord.js');


module.exports = {
 name: "/dashboard",
run: async(req, res) => {
    delete require.cache[require.resolve('../html/dashboard.ejs')];
    if (!req.cookies.token)
        res.redirect('/login');
    let decoded;
    try {
        decoded = jwt.verify(req.cookies.token, jwt_secret);
    } catch (e) { };

    if (decoded) {
        let data = await schema.findOne({
            _id: decoded.uuid,
            userID: decoded.userID
        });

        let guildArray = await process.oauth.getUserGuilds(data.access_token);
        // console.log(guildArray)
        let mutualArray = [];
        guildArray.forEach(g => {
            if (client.guilds.cache.has(g.id)) {
                // console.log(g.name)
                let guildd = client.guilds.cache.get(g.id);
                // console.log(guildd.name)
                let icon = guildd.iconURL();
                if (icon === null) {
                    g.avatar = `https://ui-avatars.com/api/?background=494d54&uppercase=false&color=dbdcdd&size=128&font-size=0.33&name=${g.name}`;
                } else {
                    g.avatar = `https://cdn.discordapp.com/icons/${g.id}/${g.icon}.png`;
                }
                // console.log(data.userID)
                let user = guildd.members.cache.get(data.userID);
                // console.log(user.username)
                if (user.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
                    // console.log("user has perms")
                 mutualArray.push(g);
                //  console.log(mutualArray)
                }
            }
        });
// console.log(mutualArray)
        let args = {
            avatar: `https://cdn.discordapp.com/avatars/${data.userID}/${data.user.avatar}.png`,
            username: data.user.username,
            discriminator: data.user.discriminator,
            id: data.userID,
            loggedIN: true,
            adminGuilds: mutualArray,
        };
        let servers = {
            avatar: `https://cdn.discordapp.com/avatars/${data.userID}/${data.user.avatar}.png`,
            username: data.user.username,
            discriminator: data.user.discriminator,
            id: data.userID,
            loggedIN: true,
            adminGuilds:mutualArray
        }

        res.render("./Website/html/dashboard.ejs", args);
        // res.render("./Website/html/guild.ejs", servers);
    } else
        res.redirect("/login");
}
}
