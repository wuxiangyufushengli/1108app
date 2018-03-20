var experss=require('express');
var md5=require('blueimp-md5');
var model=require('./model');
var Usermodel=model.getModule('user');
var Chatmodel=model.getModule('chat');
const router=experss.Router();
//过滤
const filter={'pwd':0};
router.post('/register',function (req,res) {
    const {name,pwd,type}=req.body;
    Usermodel.findOne({name},function (err,user) {
        if(user){
            res.send({code:1,msg:'用户已存在'})
        }else{
            new Usermodel({name,pwd:md5(pwd),type}).save(function (err,user) {
                res.cookie('userid',user._id)
                res.send({code:0,data:{_id:user._id,name,type,pwd}})
            })
        }
        
    })
});
router.post('/login',function (req,res) {
    const {name,pwd}=req.body;
    Usermodel.findOne({name,pwd:md5(pwd)},filter,function (err,user) {
        if(!user){
            res.send({code:1,msg:'用户名或密码错误'})
        }else{
            res.cookie('userid',user._id,{maxAge: 1000*60*60*24*7});
            res.send({code:0,data:user})
        }

    })

});
router.post('/updata',function (req,res) {
    const userid=req.cookies.userid;
    if(!userid){
        return res.send({code:1,msg:'请先去登录'})
    };
    Usermodel.findByIdAndUpdate({_id: userid},req.body,function (err,user) {
        if(!user){
            res.clearCookie('userid');
          return res.send({code:1,msg:'请先登录'})
        }else{
            const {_id,name,type}=user;
            const data=Object.assign(req.body,{_id,name,type})
            res.send({code:0,data})
        }
    })

});
router.get('/getUser',function (req,res) {
    var userid=req.cookies.userid;
    if(!userid){
        return res.send({code:1,msg:'请先去登录'})
    }
    Usermodel.findOne({_id: userid},filter,function (error,user) {
        if(!user){
            res.clearCookie('userid');
            return res.send({code:1,msg:'请先登录'})
        }else{
            return res.send({code:0,data:user})
        }


    })


});
router.get('/list',function (req,res) {
    var type=req.query.type;
    Usermodel.find({type},function (err,users) {
            res.send({code:0,data:users})

    })

});

/*
获取当前用户所有相关聊天信息列表
 */
router.get('/msglist', function (req, res) {
    // 获取cookie中的userid
    const userid = req.cookies.userid
    // 查询得到所有user文档数组
    Usermodel.find(function (err, userDocs) {
        // 用对象存储所有user信息: key为user的_id, val为name和avatar组件的user对象
        const users = {} // 对象容器
        userDocs.forEach(doc => {
            users[doc._id] = {name: doc.name, avatar: doc.avatar}
        })
        /*
        查询userid相关的所有聊天信息
         参数1: 查询条件
         参数2: 过滤条件
         参数3: 回调函数
        */
        Chatmodel.find({'$or': [{from: userid}, {to: userid}]}, filter, function (err, chatMsgs) {
            // 返回包含所有用户和当前用户相关的所有聊天消息的数据
            res.send({code: 0, data: {users, chatMsgs}})

        })
    })
})

/*
修改指定消息为已读
 */
router.post('/readmsg', function (req, res) {
    // 得到请求中的from和to
    const from = req.body.from
    const to = req.cookies.userid
    /*
    更新数据库中的chat数据
    参数1: 查询条件
    参数2: 更新为指定的数据对象
    参数3: 是否1次更新多条, 默认只更新一条
    参数4: 更新完成的回调函数
     */
    Chatmodel.update({from, to, read: false}, {read: true}, {multi: true}, function (err, doc) {
        console.log('/readmsg', doc)
        res.send({code: 0, data: doc.nModified})
    })
})


module.exports=router;


