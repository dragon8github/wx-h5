const path = require('path');
const fs = require('fs');
const readline = require("readline");
const exec = require('child_process').execSync

// 怀疑不可以使用代码块的概念

// 项目H5资源路径
const PROJECT_PATH = 'C:/Users/lizhaohong/Desktop/gitlat/wx/wx-ui/src/main/resources/';

// 本地H5资源路径
const H5_DIST_PATH = 'G:/新html/wx_h5/dist';

// 任务一: 删除指定目录的static
exec(`rm -rf ${path.join(H5_DIST_PATH, 'static')}`);

// 任务二: 将资源目录下的static目录全部移到项目H5资源路径中
// exec(`cp -rf ${path.join(H5_DIST_PATH, 'static')} ${path.join(PROJECT_PATH)}`);
// exec(`cp -rf \`find ./dist/* -type d\` ${path.join(PROJECT_PATH)}`);
exec(`cp -rf \$(find ./dist/* -type d) ${path.join(PROJECT_PATH, 'static')}`)

// 任务三: 获取H5资源路径下最后一行，其实这一行就是最新的资源了我只要把它拿出来即可
var last = exec(`grep "</body></html>" ${path.join(H5_DIST_PATH, 'index.html')}`);
last = last && JSON.stringify(last.toString().trim()).slice(1, -1)


// 任务四: 将获取到的内容，替换指定文本,并且保存为index2.ftl
// 先把最后一行删除，再插入内容即可？
// exec(`data=${last} && sed -i "\$c $data" ${path.join(PROJECT_PATH, 'templates/index.ftl')}`)
