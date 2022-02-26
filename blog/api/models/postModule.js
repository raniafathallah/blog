const mongoose = require("mongoose");
const schema=mongoose.Schema({
    'title':'String',
    'title':'String'
},{timestampes:true})
const post =mongoose.model('post',schema);
module.exports=post;