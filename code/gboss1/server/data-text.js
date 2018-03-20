var moogoose=require('mongoose');
moogoose.connect('mongodb://localhost:27017/goboss');
const con=moogoose.connection;
con.on('connected',function () {
    console.log('数据库连接成功');
});
var userSchema=moogoose.Schema({
    'name': {type: String, 'required': true},
    'pwd': {type: String, 'required': true},
    'type': {'type': String, 'required': true},
    'avatar': {'type': String},
    'desc': {'type': String},
    'title': {'type': String},
    'company': {'type': String},
    'money': {'type': String}
});
var Usermodel=moogoose.model('user',userSchema);
function testSave() {
    const userModel = new Usermodel({
        name: 'Jack',
        pwd: '123',
        type: 'genius',
        avatar: 'boy'
    })
    userModel.save(userModel, function (err, user) {
        console.log('save()', err, user)
    })

}
//testSave();
function testFind() {
    Usermodel.find(function (err, users) {
        console.log('find()', err, users)
    })

    Usermodel.findOne({_id: '5a69d23dcbe9821448e5f799'}, function (err, user) { // 如果没有匹配的, 返回null
        console.log('findOne()', err, user)
    })
}

//testFind()
function testUpdate() {
    Usermodel.findByIdAndUpdate({_id: '5a69d23dcbe9821448e5f799'}, {name: 'BB'}, function (err, user) {
        console.log('findByIdAndUpdate()', err, user)
    })
}

// testUpdate()

function testRemove() {
    Usermodel.remove({_id: '5aa7c62314588a15a00df340'}, function (err, result) {
        console.log('remove()', err, result) // { ok: 1, n: 1 }
    })
}
testRemove()



