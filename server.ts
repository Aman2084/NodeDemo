import {createServer} from "http";
import A from "./test01";
import SQL from "./sql";

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

// sql
const sql = new SQL();


// koa
const Koa = require('koa');
const app = new Koa();

app.use(async (ctx:{body:string}) => {
    console.log('Start====================' , ctx);
    sql.test()
    ctx.body = 'Hello World!';
    console.log('====================End0');
});

app.listen(3000);

interface ISTML{
    run(val:string):void;
    finalize():void;
}





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
