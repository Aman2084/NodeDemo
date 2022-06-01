import Sqlite from "better-sqlite3"


class SQL {

    db: Sqlite.Database

    constructor(){
        this.db =  Sqlite('SQLite/test.db');
    }

    test(){
        // const insert = this.db.prepare('INSERT INTO Info (name, age) VALUES (@name, @age)');
        // // const select_stmt=this.db.prepare('SELECT * FROM Info')
        // const select_stmt = this.db.prepare("SELECT * FROM Info WHERE name = '张三'");
        // const cols = select_stmt.all();
        // console.log(cols);
        // console.log("test===========" , ++this.index);

        // let age = this.findAgeByName("张三");
        // console.log(age);
        // this.changeAge("张三" , 31);
        // age = this.findAgeByName("张三");
        // console.log(age);
    }

    findAgeByName($name:string){
        const s = "SELECT * FROM Info WHERE name = '" + $name + "'";
        const select_stmt = this.db.prepare(s);
        
        const a = select_stmt.all();
        if(a && a.length){
            this.trace("查找年龄成功！");
            return a[0].age;
        }
        this.trace("查找年龄失败！");
        return -1;
    }
    
    changeAge($name:string , $age:number){
        if(this.hasName($name)){
            const str = 'UPDATE Info SET age=@age WHERE name=@name';
            const updata_stmt = this.db.prepare(str);
            updata_stmt.run({name:$name,age:$age});
            this.trace("修改年龄成功");
            return true;
        }
        this.trace("修改年龄失败");
        return false;
    }

    private hasName($name:string){
        const s = "SELECT * FROM Info WHERE name = '" + $name + "'";
        const select_stmt = this.db.prepare(s);
        
        const a = select_stmt.all();
        return a && a.length;
    }

    private trace($msg:Object){
        console.log("SQL============" , $msg);
    }
    
}

export default SQL


