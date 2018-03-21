const path = require('path');
const fs = require('fs');
const readline = require("readline");
const exec = require('child_process').execSync

// 项目H5资源路径
const PROJECT_PATH = 'C:/Users/lizhaohong/Desktop/gitlat/wx/wx-ui/src/main/resources/';

// 本地H5资源路径
const H5_DIST_PATH = 'G:/新html/wx_h5/dist';

// 删除文件夹
function deleteall(path) {  
    var files = [];  
    if(fs.existsSync(path)) {  
        files = fs.readdirSync(path);  
        files.forEach(function(file, index) {  
            var curPath = path + "/" + file;  
            if(fs.statSync(curPath).isDirectory()) {
                deleteall(curPath);  
            } else {  
                fs.unlinkSync(curPath);  
            }  
        });  
        fs.rmdirSync(path);  
    }  
};  


// 任务一
// 删除指定目录的static
deleteall(path.join(PROJECT_PATH, 'static'));

// 任务二
// 将资源目录下的static目录全部移到项目H5资源路径中
exec(`cp -rf ${path.join(H5_DIST_PATH, 'static')} ${path.join(PROJECT_PATH)}`);

// 任务三
// 获取H5资源路径下最后一行，其实这一行就是最新的资源了我只要把它拿出来即可
var last = exec(`grep "</body></html>" ${path.join(H5_DIST_PATH, 'index.html')}`);
last = last && JSON.stringify(last.toString().trim());

// 任务四
// 将获取到的内容，替换指定文本,并且保存为index2.ftl
exec(`sed '$c ${last}' ${path.join(PROJECT_PATH, 'templates/index.ftl')} > ${path.join(PROJECT_PATH, 'templates/index2.ftl')} && mv -f ${path.join(PROJECT_PATH, 'templates/index2.ftl')} ${path.join(PROJECT_PATH, 'templates/index.ftl')}`)
