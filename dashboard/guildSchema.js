const mongoose = require('mongoose');

const schema = mongoose.Schema({
    guildId: {
        type: String,
        required: true
    },

    BLW: {
type: Array,
default: []
    },

   prefix: {
       type: String
   }
});

module.exports = mongoose.model('guild-config', schema);
