/*
后台应用的路由器模块
1. 引入express
2. 得到路由器
3. 注册n个路由
4. 向外暴露路由器
5. 通过 app使用上路由器
 */
// 1. 引入express
const express = require('express')
const md5 = require('blueimp-md5')
const models = require('./models')
const UserModel = models.getModel('user')
const ChatModel = models.getModel('chat')
// 2. 得到路由器
const router = express.Router()
const _filter = {'pwd': 0, '__v': 0} // 查询时过滤掉

// 3. 注册n个路由
  // 用户注册的路由
  /*
  路由回调函数的3步
  1. 获取请求参数
  2. 处理(操作数据库数据)
  3. 返回响应
   */
router.post('/register', function (req, res) {
  // 1. 获取请求参数
  const {name, pwd, type} = req.body // 包含所有请求参数的对象

  // 2. 处理(操作数据库数据)
  // 2.1. 根据name查询是否已经存在,
  UserModel.findOne({name}, function (err, user) {
    // 3.1. 如果已经存在, 返回一个错误的提示
    if(user) {
      return res.send({code: 1, msg: '用户名已存在!'}) // code: 数据的标识 1: 错误 0: 正确
    }
    // 2.2. 如果不存在, 保存到数据库,
    const userModel = new UserModel({name, pwd: md5(pwd), type})
    userModel.save(function (err, user) {
      // 向浏览器端返回cookie(key=value)
      res.cookie('userid', user._id, {maxAge: 1000*60*60*24*7})
      // 3.2. 返回数据(新的user)
      res.send({code: 0, data: {_id: user._id, name, pwd, type}})
    })
  })
})

  // 用户登陆的路由
router.post('/login', function (req, res) {
  // 1. 获取请求参数
  const {name, pwd} = req.body
  // 2. 根据name和pwd查询对应的user
  UserModel.findOne({name, pwd: md5(pwd)}, _filter, function (err, user) {
    // 3.1. 存在, 返回user数据
    if(user) {
      // 向浏览器端返回cookie(key=value)
      res.cookie('userid', user._id)
      res.json({code: 0, data: user})
    } else {
      // 3.2. 不存在, 返回错误信息
      res.json({code: 1, msg: '用户名或密码错误!'})
    }
  })

})

  // 更新用户信息的路由
router.post('/update', function (req, res) {
  // 检查用户是否登陆, 如果没有, 返回错误提示信息
  const userid = req.cookies.userid //取出请求中cookie包含的userid
  if(!userid) {
    return res.send({code: 1, msg: '请先登陆'})
  }
  // 更新对应的user
  UserModel.findByIdAndUpdate({_id: userid}, req.body, function (err, user) {// user不包含新添加的数据
    if(!user) { // 更新失败, 需要重新登陆
      // 告诉浏览器清除保存的userid cookie
      res.clearCookie('userid')

      res.send({code: 1, msg: '请先登陆'})
    } else { // 成功了
      const {_id, name, type} = user
      // ...在node端不能使用, 需要使用assign来合并对象
      user = Object.assign({}, req.body, {_id, name, type})

      res.send({code: 0, data: user})
    }
  })
})

// 根据cookie中的userid, 查询对应的user
router.get('/userinfo', function (req, res) {
  // 取出userid
  const userid = req.cookies.userid
  // 查询
  UserModel.findOne({_id: userid}, _filter, function (err, user) {
    // 如果没有, 返回错误提示
    if(!user) {
      // 清除浏览器保存的userid的cookie
      res.clearCookie('userid')

      res.send({code: 1, msg: '请先登陆'})
    } else {
      // 如果有, 返回user
      res.send({code: 0, data: user})
    }

  })

})


/*
查看用户列表
 */
router.get('/list',function(req, res){
  const { type } = req.query  // get请求
  // 根据type查询对应的所有用户列表
  UserModel.find({type},function(err,users){
    return res.json({code:0, data: users})
  })
})

/*
获取所有交流信息列表
 */
router.get('/getmsgs', function(req, res) {
  // 当前登陆用户的id
  const userid = req.cookies.userid

  UserModel.find(function (err, userdocs) {
    /*const users = {}  // {id1: user1, id2: user2}
    userdocs.forEach(user => {
      users[user._id] = {name: user.name, avatar: user.avatar}
    })*/
    // 根据user数组成功一个多个user的对象
    const users = userdocs.reduce((users, user) => {
      users[user._id] = user
      return users
    }, {})

    ChatModel.find(
      {'$or':[{from:userid}, {to: userid}]},
      function(err, chatMsgs) {
        return res.json({code: 0, data: {chatMsgs, users}})  // 需要用对象将2个数据包起来
      }
    )
  })
})


/*
修改指定消息为已读
*/
router.post('/readmsg', function (req, res) {
  const to = req.cookies.userid
  const from = req.body.from
  /*
  参数1: 查询条件
  参数2: 更新为指定的数据对象
  参数3: 是否1次更新多条, 默认只更新一条
  参数4: 更新完成的回调函数
   */
  ChatModel.update({from, to, read: false},
    {read: true}, {multi: true}, function (err, doc) { // multi: true更新所有匹配的, 默认只更新匹配的第一条
      console.log('readmsg()', doc)
      res.send({code: 0, data: doc.nModified}) // nModified代表更新的数量
    })

})

// 4. 向外暴露路由器
module.exports = router
