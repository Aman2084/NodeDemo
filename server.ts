import {createServer} from "http";
import A from "./test01";

// ts-node测试
const a = new A();
a.test();


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