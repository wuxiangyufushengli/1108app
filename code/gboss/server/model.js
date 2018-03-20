var mongoose=require('mongoose');
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

//聊天的model
const chatModel = mongoose.Schema({
    from: {type: String, required: true}, // 发送用户的id
    to: {type: String, required: true}, // 接收用户的id
    chat_id: {type: String, required: true}, // from_to组成字符串
    content: {type: String, required: true}, // 内容
    read: {type:Boolean, default: false}, // 标识是否已读
    create_time: {type: Number} // 创建时间
})
mongoose.model('chat', chatModel)

module.exports={
    getModule(name){
        return mongoose.model(name)
    }
}