const fs = require('fs');
const client = require('../../index.js');

module.exports = {
     name :"/",
run:async (req, res) => {
    delete require.cache[require.resolve('../html/home.ejs')];
    let args = {
        users: client.users.cache.size,
        guilds: client.guilds.cache.size
    };
    res.render("./Website/html/home.ejs", args);
}
}