// import {createServer} from "http";
// import A from "./test01";
import SQL from "./sql";

// sql
const sql = new SQL();


// koa
const Koa = require('koa');
const app = new Koa();

interface ICTX{
    body:{
        msg: string;
        code: number;
        success: boolean;
        data: Object|boolean|string;
    };
    request:{
        url: string;
    }
}


function getRequest($url:string){
    const a = $url.split("?");
    let o = new Map();
    if(a[1]){
        const b = a[1].split("&");
        b.forEach(s=>{
            const c = s.split("=");
            o.set(c[0] , c[1])
        })
    }
    let name:string
    switch(a[0]){
        case "/name2age":
            name = decodeURI(o.get("name"));
            return sql.findAgeByName(name);
        case "/saveage":
            name = decodeURI(o.get("name"));
            const age = o.get("age")
            return sql.changeAge(name , age);
    }
    
    return null;
}


app.use(async (ctx:ICTX , next:Function) => {
    const url = ctx.request.url;
    const request = getRequest(url);

    ctx.body = {
        msg: 'ok',
        code: request? 200 : 401,
        success: true,
        data: request ,
    };;
    await next();
});

app.listen(3000);

console.log("服务启动，有一下两条服务器响应\n" ,
            "1. 根据名字查年龄：http://localhost:3000/name25age?name=张三 \n",
            "2. 修改年龄：http://localhost:3000/saveage?name=张三&age=21 \n",
            "注：数据库中只有  张三、 李四  两条数据");


// ts-node测试
// const a = new A();
// a.test();

/*
// 创建HttpServer
const server = createServer((req , res)=>{
    // 2.设置状态码
    res.statusCode = 200;
    // 3.设置响应头
    res.setHeader('Content-Type' , 'text/html');
    // 4. 返回内容
    res.end('<h1>hello world!</h1>');

});

server.listen(8080 , ()=>console.log("server started 8080"));
*/

// import Database from 'better-sqlite3';
// const db = new Database('foobar.db', { verbose: console.log });

// var sqlite3 = require('sqlite3').verbose();
// var db = new sqlite3.Database(':memory:'); // 内存模式，数据不会永久存储。
// 
// db.serialize(function(){
//   db.run('CREATE TABLE lorem (info TEXT)');
//   const stmt = db.prepare('INSERT INTO lorem VALUES (?)');
//   for(var i = 0; i < 10; i++){
//     stmt.run('Ipsum ' + i);
//   }
//   stmt.finalize();
//   db.each('SELECT rowid AS id, info FROM lorem', function(err:Error, row){
//     console.log(row.id + ': ' + row.info);
//   });     
// });
// 
// db.close();
