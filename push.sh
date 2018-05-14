# 项目H5资源路径
PROJECT_PATH='C:\Users\admin\Desktop\project\鸿特金服微信服务号\wx\wx-ui\src\main\resources'

# 本地H5资源路径
H5_DIST_PATH='./dist'

# 任务一: 删除项目H5资源目录下static中所有的文件夹
rm -rf `find ${PROJECT_PATH}/static/* -type d`

# 任务二：复制本地H5资源路径下所有的文件夹到项目下static
cp -rf `find ${H5_DIST_PATH}/* -type d` ${PROJECT_PATH}/static

# 任务三: 获取H5资源路径下最后一行，其实这一行就是最新的资源了我只要把它拿出来即可
data=`grep "</body></html>" ${H5_DIST_PATH}/index.html`

# 任务四: 将获取到的内容，替换指定文本
sed -i "\$c $data" ${PROJECT_PATH}/templates/index.ftl

# 任务五：git提交
# 目前无法使用git push，一来是因为不知道push密码，二来是每次提交也需要pull，所以最后两步还是手动来吧。
cd $PROJECT_PATH && git add . && git commit -m autoPush

