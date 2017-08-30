查看状态
> git status  

加入文件
> git add {xxx}

全部加入
>   `git add .`

提交
> git commit

创建新分支
1. `git branch xxx` 创建名为xxx的分支；
2. `git checkout xxx` 切换到分支 xxx;
3. `git merge xxx` 合并“其他分支”到当前分支;


### 远程克隆到本地
1. `git clone "https://github.com/Clayder-ran/test.git"`

### 关联远程仓库
1. `git remote add origin 你的远程库地址`关联到远程库

### 上传
1. `git add xxx` 先保存(缓存);
2. `git commit -m "说明文字"`给本次上传添加说明;
3. `git push origin master` 把内容传到远程仓库;
3. `git push -u origin master`把本地库的内容推送到远程;

### 下载
1. `git pull --rebase origin master`获取远程库与本地同步合并（如果远程库不为空必须做这一步，否则后面的提交会失败）
