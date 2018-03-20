var experss=require('express');
var md5=require('blueimp-md5');
var model=require('./model');
var Usermodel=model.getModule('user');
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
                res.send({code:0,data:{_id:user._id,name,type}})
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

})
module.exports=router;


