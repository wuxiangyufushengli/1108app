var express=require('express');
var app=express();
var cros=require('cors')
var appRouter=require('./appRouter');
var bodyParser=require('body-parser');
var cooikeParsr=require('cookie-parser');
const ChatModel=require('./model').getModule('chat')



// 得到服务器对象
const server = require('http').Server(app)
// 得到IO对象
const io = require('socket.io')(server);
const sockects={};

io.on('connection', function(socket) {
    console.log('soketio connected')
    const userid=socket.handshake.query.userid;
    if(!userid){
        return null
    }
    const saveSocket=sockects[userid];
    if(saveSocket){
        delete sockects[userid];
        saveSocket.disconnect();
    }
    sockects[userid]=socket;
    // 绑定sendMsg监听, 接收客户端发送的消息
    socket.on('sendMsg', function({from,to,content}) {
        console.log('服务器接收到浏览器的消息', {from,to,content})
      //保存到数据库
        const chat_id=[from,to].sort().join('_');
        const create_time=Date.now();
       const chatModel=new ChatModel({from,to,content,chat_id,create_time})
        chatModel.save(function (err,chatMsg) {
            sockects[from]&&sockects[from].emit('receiveMsg',chatMsg);
            sockects[to]&&sockects[to].emit('receiveMsg',chatMsg);
            console.log('服务器向浏览器发送消息',from,to,chatMsg)
        })
        

    })
})







app.use(cros());
app.use(bodyParser.json());
app.use(cooikeParsr());
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/api',appRouter);
/*app.listen('5000',function () {
    console.log('ok')
});*/

// 启动服务器监听
server.listen(5000, () => {
    console.log('服务器启动成功 port: 4000')
})
