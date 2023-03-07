**利用python selenium打开南师大校园网登录网页，启动nodejs定时任务监控网络情况**


*环境：本机环境 python3.9 node14.17.3*
- selenium采用edge driver，自行选择相应与浏览器适配的版本，或更换为chrome driver
- forever守护进程


**服务启动**
```
index.js所在文件夹下
forever start index.js
```