var express=require('express');
var app=express();
var appRouter=require('./appRouter');
var bodyParser=require('body-parser');
var cooikeParsr=require('cookie-parser');

app.use(bodyParser.json());
app.use(cooikeParsr());
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/api',appRouter);
app.listen('5000',function () {
    console.log('ok')
})