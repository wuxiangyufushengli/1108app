const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/goboss1');
const con=mongoose.connection;
con.on('connected',function () {
    console.log('数据库连接成功')
});
var userSchema=mongoose.Schema({
    'name': {type: String, 'required': true},
    'pwd': {type: String, 'required': true},
    'type': {'type': String, 'required': true},
    'avatar': {'type': String},
    'desc': {'type': String},
    'title': {'type': String},
    'company': {'type': String},
    'money': {'type': String}
});
mongoose.model('user',userSchema);
module.exports={
    getModule(name){
        return mongoose.model(name)
    }
}