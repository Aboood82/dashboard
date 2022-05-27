const schema = require('../../dashboard/dashboard');
const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../../config.json');

module.exports = {
     name :"/login",
 run: async(req, res) => {
    const url = process.oauth.generateAuthUrl({
        scope: ["identify", "guilds"],
        state: require('crypto').randomBytes(16).toString("hex"),
    });
    if (req.cookies.token && req.cookies.token.length > 0) {
        let decoded;
        try {
            decoded = jwt.verify(req.cookies.token, jwt_secret);
        } catch (e) {
            return res.redirect('/login');
        }
        if (!decoded)
            return res.redirect(url);
        let data = await schema.findOne({
            _id: decoded.uuid,
            userID: decoded.userID
        });
        if (!data)
            res.redirect(url);
        else {
            if ((Date.now() - data.lastUpdated) > data.expires_in * 1000) {
                const oauthData = process.oauth.tokenRequest({
                    refreshToken: data.refresh_token,
                    grantType: "refresh_token",
                    scopes: ["identify", "guilds"]
                });
                data.access_token = oauthData.access_token;
                data.refresh_token = oauthData.refresh_token,
                    data.expires_in = oauthData.expires_in;
            }
            await data.save();
            res.redirect('/dashboard');
        }
    } else
        res.redirect(url);
}
}