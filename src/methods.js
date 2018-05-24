

// 解决微信、QQ、闪银等内置浏览器单页应用无法刷新title的问题
var setTitle = title => {
    var i = document.createElement('iframe');
    i.src = 'https://www.baidu.com/favicon.ico';
    i.style.display = 'none';
    i.onload = function() {
        setTimeout(function(){
            i.remove();
        }, 20)
    }
    document.title = title;
    document.body.appendChild(i);
}

// 稍后放到公共类库去
Date.prototype.format = function(fmt) {      
     var o = { 
        "M+" : this.getMonth()+1,                 //月份 
        "d+" : this.getDate(),                    //日 
        "h+" : this.getHours(),                   //小时 
        "m+" : this.getMinutes(),                 //分 
        "s+" : this.getSeconds(),                 //秒 
        "q+" : Math.floor((this.getMonth()+3)/3), //季度 
        "S"  : this.getMilliseconds()             //毫秒 
    }; 
    if(/(y+)/.test(fmt)) {
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
    }
    for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
         }
    }
    return fmt; 
}


const date2date = (time, style="yyyy/MM/dd") => {
    if (time) {
        time = time.replace(/\-/g, "/")
        var oldTime = (new Date(time)).getTime();
        var curTime = new Date(oldTime).format(style);
        return curTime
    } else {
        return ''
    }
}

function pad (target, n) {
    var zero = new Array(n).join('0');
    var str = zero + target;
    var result = str.substr(-n);
    return result;
}

function env (a = '', b = '') {
    return process.env.NODE_ENV === 'development' ? a : b
}

function upload(e,options){
    var options = options
    var file = e.target.value
    var fd = new FormData()
    var defaults = {
        fileType:['png','jpg','jpeg','pdf','mp4'],
        maxSize:'2M'
    }
    var maxSize = options.maxSize || defaults.maxSize
    if(!file){
        console.log('file is undefined')
        return ;
    }else{
        var vType = file.split('.').pop().toLocaleLowerCase();
        var fileType = options.fileType || defaults.fileType;
        //允许上传的文件类型
        if(fileType.indexOf(vType.toLocaleLowerCase()) == -1){
            console.log("暂不支持该类型的文件，请重新选择!");
            return;
        }
        for(var i=0, file; file= e.target.files[i++];){
            var maxKb = parseInt(maxSize) *1024*1024
            if(file.size > maxKb){
                console.log('请上传小于'+ maxSize +'的文件！')
                return;
            }
        }
        //文件上传前的处理 
        if(options.beforeSend && options.beforeSend instanceof Function){
            options.beforeSend(e.target.value)
        }
        //多文件上传
        if(options.multiple){
            for(var i=0, file; file=e.target.files[i++];){
                fd.append('file'+i, file);
            }
        }else{
            fd.append(options.key || 'file',e.target.files[0]);
        }
        //文件上传回调
        if(options.callback && options.callback instanceof Function){
            options.callback(fd)
        }
        
    }
    
}
export default {
    date2date,
    setTitle,
    pad,
    upload,
    env
}