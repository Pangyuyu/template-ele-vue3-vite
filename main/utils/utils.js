const _title_base="802Li OTA"
const { stat } = require("fs");
const { NewError, NewOK } = require("./error");
var Utils=function(){
    this.LocalUrl="http://localhost:3000";
    this.getTitle=function(title){
        if(title&&title.length>0){
            return _title_base+" "+title
        }
        return _title_base
    },
    this.isEmpty=function(str) {
        return !this.isNotEmpty(str);
    },
    this.isNotEmpty=function(str) {
        return str != null && (str + '').trim().length > 0;
    }
    this.fileExist=function(filePath){
        return new Promise((resolve,_)=>{
            stat(filePath,(err,stats)=>{
                if(err){
                    resolve(NewError("文件或目录不存在!"))
                    return
                }
                resolve(NewOK())
            })
        })
    }
}
module.exports=new Utils()